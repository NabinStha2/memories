import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  Card,
  IconButton,
  CardMedia,
  CardActions,
  Typography,
  CardContent,
  Popover,
  Button,
  ButtonBase,
} from "@material-ui/core";
import { MoreVertRounded, Delete, ThumbUpAlt } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { deletePost, getPosts, likePost } from "../../actions/postsAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  message: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "15rem",
    textOverflow: "ellipsis",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    margin: "6px",
    position: "relative",
    height: "100%",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  div1: {
    position: "absolute",
    top: "10px",
    display: "flex",
    color: "white",
    left: "10px",
    flexDirection: "column",
    alignItems: "start",
  },
  div2: {
    position: "absolute",
    top: "0px",
    display: "flex",
    color: "white",
    right: "0px",
    flexDirection: "column",
    alignItems: "start",
  },
  tag: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px",
    padding: "5px",
  },
  title: {
    padding: "0 10px 10px 10px",
    textAlign: "justify",
    wordBreak: "break-word",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "grey",
    backgroundBlendMode: "darken",
  },
  cardContent: {
    padding: "0 10px",
    textAlign: "start",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  cardActions: {
    padding: "10px 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  buttonBase: {
    display: "contents",
  },
}));

const Post = ({ editRef, post, currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [liked, setLiked] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));

  // console.log(posts);
  useEffect(() => {
    let postLike;
    if (post?.likes.length > 0) {
      postLike = post.likes.find(
        (like) =>
          like === (user?.userProfile?.googleId || user?.userProfile?._id)
      );
    }
    if (postLike) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    // console.log(liked);
  }, [liked, user, post]);

  useEffect(() => {
    if (currentId !== 0) {
      editRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentId, editRef]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card raised elevation={6} className={classes.card}>
      <ButtonBase className={classes.buttonBase} onClick={openPost}>
        <CardMedia
          className={classes.media}
          title={post.title}
          image={post.selectedFile}
        />
        <div className={classes.div1}>
          <Typography variant="body1" component="p">
            {post.name}
          </Typography>
          <Typography variant="body2" component="p">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.div2}>
          {(user?.userProfile?._id === post?.creator ||
            user?.userProfile?.googleId === post?.creator) && (
            <IconButton
              color="inherit"
              aria-label="options"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(e);
              }}
            >
              <MoreVertRounded fontSize="small" />
            </IconButton>
          )}
        </div>
        <div>
          <Popover
            style={{ top: "-13px", left: "0px" }}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Button
              size="small"
              variant="text"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
                setAnchorEl(null);
              }}
            >
              Edit
            </Button>
          </Popover>
        </div>
        <div className={classes.tag}>
          <Typography variant="body2" color="textSecondary" component="p">
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" component="p">
          {post.title}
        </Typography>
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.message}
            variant="body2"
            color="textSecondary"
          >
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <IconButton
          style={{ padding: "12px 0", color: `${liked ? "blue" : "grey"}` }}
          disabled={!user?.userProfile}
          aria-label="Like"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <ThumbUpAlt fontSize="small" />
          <Typography variant="body2" color="primary">
            {post.likes.length}
          </Typography>
        </IconButton>
        {(user?.userProfile?._id === post?.creator ||
          user?.userProfile?.googleId === post?.creator) && (
          <IconButton
            style={{ padding: "12px 0", color: "red" }}
            aria-label="delete"
            onClick={() => {
              dispatch(deletePost(post._id));
              dispatch(getPosts());
            }}
          >
            <Delete fontSize="small" />
            <Typography variant="body2" color="secondary">
              Delete
            </Typography>
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
