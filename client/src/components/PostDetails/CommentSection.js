import React, { useState, useRef } from "react";
import {
  Typography,
  TextField,
  CircularProgress,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../actions/postsAction";

const useStyles = makeStyles((theme) => ({
  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  commentsInnerContainer: {
    height: "200px",
    overflowY: "auto",
    marginRight: "10px",
  },
}));

const CommentSection = ({ postOne }) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const { isLoadingComment } = useSelector((state) => state.post);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(postOne?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user?.userProfile?.name}: ${comment}`, postOne._id)
    );

    setComment("");
    setComments(newComments);

    commentsRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((comment, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{comment.split(":")[0]}</strong>: {comment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: "100%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={
              (!user?.userProfile?._id && !user?.userProfile?.googleId) ||
              !comment.length
            }
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            {isLoadingComment ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Comment"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
