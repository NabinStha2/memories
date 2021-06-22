import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory, Link } from "react-router-dom";
import { getPostById, getPosts } from "../../actions/postsAction";
import CommentSection from "./CommentSection";

const useStyles = makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "500px",
  },
  card: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      // flexWrap: "wrap",
      flexDirection: "column",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 0.9,
  },
  imageSection: {
    marginLeft: "20px",
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: "flex",
    overflowX: "scroll",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  message: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "15rem",
    textOverflow: "ellipsis",
    [theme.breakpoints.down("xs")]: {
      width: "auto",
    },
  },
}));

const PostDetails = () => {
  const { postOne, posts, isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (postOne?._id === id) {
      // console.log("HEY");
      dispatch(
        getPosts({ memories: "", tags: postOne?.tags.join(",") }, "", "true")
      );
    }
  }, [dispatch, postOne, id]);

  if (!postOne) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  const recommendedPosts = posts.filter(({ _id }) => _id !== postOne._id);

  return isLoading ? (
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="5em" />
    </Paper>
  ) : (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {postOne.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {postOne.tags.map((tag) => (
              <Link
                to={`/tags/${tag}`}
                style={{ textDecoration: "none", color: "#3f51b5" }}
              >
                {` #${tag} `}
              </Link>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {postOne.message}
          </Typography>
          <Typography variant="h6">
            Created by:
            <Link
              to={`/creators/${postOne.name}`}
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              {` ${postOne.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">
            {moment(postOne.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection postOne={postOne} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              postOne.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={postOne.title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section} style={{ flex: 1 }}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {`Creator: ${name}`}
                  </Typography>
                  <Typography
                    className={classes.message}
                    gutterBottom
                    variant="subtitle2"
                  >
                    {`Description: ${message}`}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} alt={title} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
