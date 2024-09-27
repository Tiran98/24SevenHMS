import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Radio,
  RadioGroup,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
  Button,
  Grid,
  Typography,
} from "@material-ui/core/";
import { useForm, Controller } from "react-hook-form";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import FacebookLogin from "react-facebook-login";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import useStyles from "./styles";
import logo from "../../assets/logoFull.png";

const FacebookLoginButton = ({ appId, onLoginSuccess, onLoginFailure }) => {
  useEffect(() => {
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: appId,
          cookie: true,
          xfbml: true,
          version: "v16.0",
        });
        // Set a flag or call a function to indicate SDK is ready
        window.isFacebookSDKLoaded = true;
      };

      // Load the SDK asynchronously
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    };

    loadFacebookSDK();
  }, [appId]);

  const handleLogin = () => {
    if (!window.isFacebookSDKLoaded) {
      console.error(
        "Facebook SDK is still loading. Please wait and try again."
      );
      return;
    }

    window.FB.login(
      (response) => {
        console.log("fb button click", response);

        if (response.authResponse) {
          // Login successful
          onLoginSuccess(response);
        } else {
          // Login failed
          onLoginFailure(response);
        }
      },
      { scope: "public_profile,email" },
      (error) => {
        console.log("Facebook login error:", error);
      }
    );
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        backgroundColor: "#002048",
        color: "white",
        width: "100%",
        fontWeight: "600",
        borderRadius: "4px",
        border: 0,
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "16px",
        paddingBottom: "16px",
        cursor: "pointer",
        fontSize: "13px",
        textTransform: "uppercase",
      }}
    >
      Login with Facebook
    </button>
  );
};

const EmployeeLogin = ({ setPathName, setDrawerState }) => {
  const classes = useStyles();
  const location = useLocation();
  const { control, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [formData, setFormData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const isFirstRender = useRef(true);
  const history = useHistory();

  const CssTextField = withStyles({
    root: {
      "& .MuiInputLabel-root": {
        color: "#cccccc",
      },
      "& .MuiTextField-root": {
        color: "#ffffff",
      },
      "& .MuiFormHelperText-root": {
        color: "#6e6e6e",
      },
      "& label.Mui-focused": {
        color: "#cccccc",
      },
      "& .MuiInputBase-input": {
        color: "#ffffff",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#6e6e6e",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#cccccc",
        },
        "&:hover fieldset": {
          borderColor: "#0077B6",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#0077B6",
        },
      },
    },
    input: {
      color: "#1a1a1a",
    },
  })(TextField);

  useEffect(() => {
    handleDrawerClose();
  }, []);

  const handleDrawerClose = () => {
    setPathName(location.pathname);
    setDrawerState(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      const { accessToken, refreshToken, employee } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("employeeProfile", JSON.stringify(employee));

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      history.push("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setErrorMsg(
        err.response?.data?.message || "An error occurred during login"
      );
      setError(true);
    }
  };

  const handleLoginSuccess = async (data) => {
    console.log("Login success:", data);
    try {
      const response = await axios.post(
        "https://graph.facebook.com/v2.8/me?fields=email,name",
        {},
        {
          headers: {
            Authorization: `Bearer ${data?.authResponse?.accessToken}`,
          },
        }
      );
      console.log("response", response.data);
      if (response.data) {
        localStorage.setItem("accessToken", data?.authResponse?.accessToken);
        localStorage.setItem(
          "employeeProfile",
          JSON.stringify({
            id: response.data.id,
            firstName: response.data.name,
            lastName: "",
            email: response.data.email,
            position: "Employee",
          })
        );
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
    }

    history.push("/");
  };

  const handleLoginFailure = (response) => {
    console.log("Login failed:", response);
    // Handle login failure
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Paper className={classes.paper}>
          <img src={logo} className={classes.logo} />
          <Typography variant="h5" className={classes.pageTitle} gutterBottom>
            Employee Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CssTextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      color="primary"
                      {...field}
                      error={error}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CssTextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      variant="outlined"
                      color="primary"
                      error={error}
                      {...field}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              className={classes.visibilityBtn}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Typography variant="caption" className={classes.errorMsg}>
                {errorMsg}
              </Typography>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submitbtn}
            >
              Submit
            </Button>
          </form>
          <FacebookLoginButton
            appId="900913175217838"
            onLoginSuccess={handleLoginSuccess}
            onLoginFailure={handleLoginFailure}
          />
        </Paper>
      </Grid>
    </div>
  );
};

export default EmployeeLogin;
