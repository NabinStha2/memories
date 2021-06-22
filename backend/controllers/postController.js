import PostModel from "../models/postModel.js";

const getPosts = async (req, res) => {
  const { memories, tags, page, noPage } = req.query;

  // console.log(`${memories} ---- ${tags} --- ${page} ---- ${noPage}`);
  const perPage = 9;
  const pageNumber = Number(page) || 1;
  const search =
    memories || tags
      ? {
          $or: [
            {
              title: {
                $regex: memories,
                $options: "i", // i means caseSensitive
              },
            },
            { tags: { $in: tags.split(",") } },
          ],
        }
      : {};
  // console.log(pageNumber);
  try {
    if (noPage === "false") {
      const count = await PostModel.countDocuments({ ...search });
      const posts = await PostModel.find({ ...search })
        .sort({ _id: -1 })
        .limit(perPage)
        .skip(perPage * (pageNumber - 1));
      res.status(200).json({ posts, page, pages: Math.ceil(count / perPage) });
    } else {
      const posts = await PostModel.find({ ...search });
      // console.log(posts);
      res.status(200).json({ posts });
    }
  } catch (err) {
    // console.error(err);
    res.status(400).json({ code: err.code, message: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await PostModel.findOne({ _id: req.params.id });

    // console.log(post);
    res.status(200).json(post);
  } catch (err) {
    // console.error(err);
    res.status(400).json({ code: err.code, message: err.message });
  }
};

const getPostsByCreator = async (req, res) => {
  try {
    const name = req.params.name.split("%20").join(" ");
    // console.log(name);
    const posts = await PostModel.find({ name: name });

    // console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    // console.error(err);
    res.status(400).json({ code: err.code, message: err.message });
  }
};

const createPost = async (req, res) => {
  const { title, name, tags, message, selectedFile } = req.body;
  try {
    if (!title || !name || !selectedFile || !message)
      return res.json({ errMessage: "Fill the form completely" });

    const post = await PostModel.create({
      title,
      name,
      message,
      selectedFile,
      tags,
      creator: req.userId,
      createdAt: Date.now(),
    });
    // console.log(post);
    res.status(201).json(post);
  } catch (err) {
    // console.error(err.message);
    res.status(409).json({ code: err.code, message: err.message });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const post = req.body;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate({ _id: id }, post, {
      new: true,
    });
    // console.log(updatedPost);
    res.status(201).json(updatedPost);
  } catch (err) {
    // console.error(err.message);
    res.status(201).json({ code: err.code, message: err.message });
  }
};

const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  try {
    const post = await PostModel.findById(id);

    post.comments.push(value);

    const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(201).json(updatedPost);
  } catch (err) {
    // console.error(err.message);
    res.status(201).json({ code: err.code, message: err.message });
  }
};

const likePost = async (req, res) => {
  if (!req.userId) return res.json({ errMessage: "Unauthenticated!" });
  // console.log(user);

  const { id: _id } = req.params;

  try {
    const post = await PostModel.findById(_id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostModel.findByIdAndUpdate({ _id: _id }, post, {
      new: true,
    });
    // console.log(updatedPost);
    res.status(201).json(updatedPost);
  } catch (err) {
    // console.error(err.message);
    res.status(400).json({ code: err.code, message: err.message });
  }
};

const deletePost = async (req, res) => {
  // const id = req.params.id;
  try {
    const deletedPost = await PostModel.findByIdAndDelete(req.params.id);
    // console.log(deletedPost);
    res.status(201).json({ message: "Post deleted successfully!!!" });
  } catch (err) {
    // console.error(err.message);
    res.status(201).json({ code: err.code, message: err.message });
  }
};

export {
  getPosts,
  getPostById,
  getPostsByCreator,
  createPost,
  commentPost,
  updatePost,
  deletePost,
  likePost,
};
