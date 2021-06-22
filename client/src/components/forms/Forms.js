import React, { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/postsAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles(() => ({
  root: {
    margin: 5,
  },
  paper: {
    padding: "10px",
    borderRadius: "15px",
  },
  typography: { width: "100%" },
  form: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  div: {
    display: "flex",
    justifyContent: "start",
    width: "100%",
    marginBottom: "10px",
  },
  button: { marginBottom: 10 },
}));

const Forms = ({ editRef, currentId, setCurrentId }) => {
  const classes = useStyles();
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [errorForm, setErrorForm] = useState("");

  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId !== 0
      ? state.post.posts.find((post) => post._id === currentId)
      : null
  );
  const posts = useSelector((state) => state.post);
  const { errMessage } = posts;

  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postData.title || !postData.selectedFile || !postData.message) {
      setErrorForm("Fill the form completely");
    } else {
      setErrorForm("");
      if (currentId === 0) {
        dispatch(
          createPost({ ...postData, name: user?.userProfile?.name }, history)
        );
        // clear(e);
      } else {
        dispatch(
          updatePost({ ...postData, name: user?.userProfile?.name }, currentId)
        );
      }
      clear(e);
    }
    setTimeout(() => setErrorForm(""), 3000);
  };

  const clear = (e) => {
    // e.preventDefault();
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.userProfile) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={5}>
      <form
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {errMessage ? (
          <Typography
            className={classes.typography}
            color="secondary"
            variant="body2"
          >
            {errMessage}
          </Typography>
        ) : (
          errorForm && (
            <Typography
              className={classes.typography}
              color="secondary"
              variant="body2"
            >
              {errorForm}
            </Typography>
          )
        )}
        <Typography className={classes.typography} variant="h6">
          {currentId ? "Editing a Memory" : "Creating a Memory"}
        </Typography>
        <div ref={editRef} />
        <TextField
          name="title"
          label="title"
          margin="normal"
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          label="message"
          variant="outlined"
          fullWidth
          margin="normal"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          label="tags"
          variant="outlined"
          fullWidth
          margin="normal"
          helperText="Don't use hash and must be separate with commas"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.div}>
          <FileBase64
            type="file"
            multiple={false}
            margin="normal"
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.button}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          size="large"
        >
          {currentId ? "Update" : "Create"}
        </Button>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          size="large"
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Forms;
