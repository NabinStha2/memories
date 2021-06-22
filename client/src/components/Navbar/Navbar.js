import React, { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  makeStyles,
  Avatar,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import memories from "../../images/memories.png";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: "30px 0",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  link: {
    display: "flex",
    justifyContent: "center",
    textDecoration: "none",
    flex: 1,
    padding: "0 0 0 24px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 0 0",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "95%",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      justifyContent: "center",
    },
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
  image: {
    marginLeft: "15px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-around",
    width: "20rem",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      paddingBottom: "4px",
    },
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "11rem",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { userData } = auth;
  // console.log(userData);

  useEffect(() => {
    setUser(userData ?? null);
    // console.log(user);
  }, [userData, user]);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT_AUTH" });
    history.push("/auth");
    setUser(null);
  }, [dispatch, history]);

  useEffect(() => {
    const token = userData?.userToken;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 2000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("userData")));
  }, [userData, logout]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link className={classes.link} to="/">
        <Typography className={classes.heading} variant="h3" align="center">
          Memories
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            style={{ height: 50 }}
          />
        </Typography>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.userProfile ? (
          <div className={classes.profile}>
            <div className={classes.info}>
              <Avatar
                // className={classes.avatar}
                alt={user?.userProfile.name}
                src={user?.userProfile.imageUrl}
              >
                {user?.userProfile.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.userProfile.name}
              </Typography>
            </div>
            <Button
              variant="outlined"
              // className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="outlined"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
