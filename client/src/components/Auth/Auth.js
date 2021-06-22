import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
  Grow,
  makeStyles,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LockIcon from "@material-ui/icons/Lock";
import { pink } from "@material-ui/core/colors";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import { FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../actions/authActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 15,
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  form: {
    padding: "10px 0",
  },
  submit: {
    margin: "10px 0",
  },
}));

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const { errMessage, isLoading } = auth;
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, open: false });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setForm(initialState);
    setShowPassword(false);
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const googleSuccess = async (res) => {
    const userProfile = res?.profileObj;
    const userToken = res?.tokenId;

    // console.log(userProfile);
    // console.log(userToken);
    try {
      dispatch({ type: "AUTH", payload: { userProfile, userToken } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (errMessage) {
      setState({ vertical: "top", horizontal: "center", open: true });
    }
  }, [errMessage]);

  const googleFailure = () =>
    alert("Google Sign In was unsuccessful. Try again later");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(register(form, history));
    } else {
      dispatch(login(form, history));
    }
    if (errMessage) {
      setState({ ...state, open: true });
    } else {
      setState({ ...state, open: false });
    }
  };

  return (
    <Grow in>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.pink}>
            <LockIcon />
          </Avatar>
          <Typography variant="h4" color="initial">
            Sign in
          </Typography>
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {errMessage && (
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="error">
                  {errMessage}
                </Alert>
              </Snackbar>
            )}
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isLoading ? (
                <CircularProgress style={{ color: "white" }} />
              ) : isSignup ? (
                "Sign Up"
              ) : (
                "Sign In"
              )}
            </Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_ID}
              render={(renderProps) => (
                <Button
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<FaGoogle />}
                  variant="contained"
                >
                  Google
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justify="center">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Grow>
  );
};

export default Auth;
