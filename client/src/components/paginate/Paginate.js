import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostsByCreator } from "../../actions/postsAction";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles(() => ({
  paginate: {
    "& .MuiPagination-ul": {
      padding: 4,
    },
  },
  paginationItem: {},
}));

const Paginate = ({ pageNumber = 1 }) => {
  const params = useParams();
  const memories = params.memories || "";
  const tags = params.tags || "";
  const name = params.name || "";
  // console.log(`${memories} ---- ${tags} ---- ${pageNumber} ---- ${name}`);

  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const { pages } = post;
  const classes = useStyles();

  const page = Number(pageNumber);

  useEffect(() => {
    const searchQuery = {
      memories: memories,
      tags: tags,
    };

    if (name.trim() !== "") {
      // console.log(name.split(" ").join(""));
      dispatch(getPostsByCreator(name));
    } else {
      dispatch(getPosts(searchQuery, pageNumber));
    }
  }, [dispatch, memories, tags, name, pageNumber]);

  return (
    <Pagination
      className={classes.paginate}
      color="primary"
      variant="outlined"
      count={pages}
      defaultPage={1}
      page={page}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={
            memories && tags
              ? `/memories/${memories}/tags/${tags}/page/${item.page}`
              : memories
              ? `/memories/${memories}/page/${item.page}`
              : tags
              ? `/tags/${tags}/page/${item.page}`
              : `/page/${item.page}`
          }
        />
      )}
    />
  );
};

export default Paginate;
