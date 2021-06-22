import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../actions/postsAction";
import Posts from "../components/posts/Posts";
import Forms from "../components/forms/Forms";
import ChipInput from "material-ui-chip-input";
import {
  Container,
  Grid,
  Grow,
  makeStyles,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import Paginate from "../components/paginate/Paginate";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "flex",
    justifyContent: "center",
  },
  [theme.breakpoints.down("xs")]: {
    gridContainer: {
      display: "flex",
      flexDirection: "column-reverse",
    },
  },
  paperSearch: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "10px",
  },
  paperPaginate: {
    margin: "10px 0",
    borderRadius: "10px",
  },
}));

const HomeScreen = () => {
  const params = useParams();
  const pageNumber = params.pageNumber || 1;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const [searchMemories, setSearchMemories] = useState("");
  const [searchTags, setSearchTags] = useState([]);
  const editRef = useRef();

  const searchPosts = () => {
    const searchQuery = {
      memories: searchMemories,
      tags: searchTags.join(","),
    };
    // console.log(pageNumber);
    if (searchMemories.trim() !== "" && searchTags.length !== 0) {
      dispatch(getPosts(searchQuery, pageNumber));
      history.push(
        `/memories/${searchQuery.memories}/tags/${searchQuery.tags}/page/${pageNumber}`
      );
    } else if (searchTags.length !== 0) {
      dispatch(getPosts(searchQuery, pageNumber));
      history.push(`/tags/${searchQuery.tags}`);
    } else if (searchMemories.trim() !== "") {
      dispatch(getPosts(searchQuery, pageNumber));
      history.push(`/memories/${searchQuery.memories}`);
    } else {
      history.push("/");
    }
  };

  const handleAddChip = (tag) => {
    setSearchTags([...searchTags, tag]);
  };

  const handleDeleteChip = (tagToDelete) => {
    // console.log(tagToDelete);
    setSearchTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Grow in>
      <Container maxWidth="lg">
        <Grid
          container
          className={classes.gridContainer}
          spacing={4}
          align="center"
          justify="center"
        >
          <Grid className={classes.gridPost} item xs={12} sm={7} md={9}>
            <Posts
              editRef={editRef}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Paper className={classes.paperSearch}>
              <TextField
                type="search"
                variant="outlined"
                name="keywordMemories"
                label="Search Memories"
                value={searchMemories}
                fullWidth
                onChange={(e) => setSearchMemories(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0", width: "100%" }}
                value={searchTags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                fullWidth
                onClick={searchPosts}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </Paper>
            <Forms
              editRef={editRef}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
            <Paper className={classes.paperPaginate}>
              <Paginate pageNumber={pageNumber} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default HomeScreen;
