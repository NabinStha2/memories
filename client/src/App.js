import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import HomeScreen from "./Screens/HomeScreen";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Route
          path={[
            "/",
            "/creators/:name",
            "/page/:pageNumber",
            "/memories/:memories/page/:pageNumber",
            "/tags/:tags/page/:pageNumber",
            "/memories/:memories",
            "/tags/:tags",
            "/memories/:memories/tags/:tags/page/:pageNumber",
          ]}
          component={HomeScreen}
          exact
        />
        {/* <Route path="/" component={HomeScreen} exact /> */}
        {/* <Route
          path="/memories/:memories/page/:pageNumber"
          component={HomeScreen}
          exact
        />
        <Route
          path="/tags/:tags/page/:pageNumber"
          component={HomeScreen}
          exact
        />
        <Route path="/memories/:memories" component={HomeScreen} exact />
        <Route path="/tags/:tags" component={HomeScreen} exact />{" "}
        <Route
          path="/memories/:memories/tags/:tags/page/:pageNumber"
          component={HomeScreen}
          exact
        /> */}
        <Route path="/posts/:id" component={PostDetails} exact />
        <Route
          path="/auth"
          component={() => (!user ? <Auth /> : <Redirect to="/" />)}
          exact
        />
        <Redirect to="/" />
      </Container>
    </Router>
  );
};

export default App;
