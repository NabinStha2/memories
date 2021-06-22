import React from "react";
import { makeStyles } from "@material-ui/styles";

import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post";

const useStyles = makeStyles((styles) => ({
  gridItem: {
    padding: "10px !important",
    margin: "0 0 10px 0",
  },
  grid: {
    display: "flex",
  },
}));

const Posts = ({ editRef, currentId, setCurrentId }) => {
  const classes = useStyles();
  const post = useSelector((state) => state.post);
  const { posts, isLoading } = post;

  return isLoading ? (
    <CircularProgress />
  ) : !posts.length ? (
    <h2>No Post</h2>
  ) : (
    <Grid className={classes.grid} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid
          className={classes.gridItem}
          key={post._id}
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
        >
          <Post
            editRef={editRef}
            post={post}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
