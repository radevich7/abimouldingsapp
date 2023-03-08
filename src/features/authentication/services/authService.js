import auth0 from "auth0-js";

const webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  scope: process.env.REACT_APP_AUTH0_SCOPE,
  redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
  responseType: process.env.REACT_APP_AUTH0_LOGIN_RESPONSE_TYPE,
});
export const changePasswordService = (
  enteredEmail,
  setPasswordResetStatus,
  setEmail
) => {
  webAuth.changePassword(
    {
      connection: "Username-Password-Authentication",
      email: enteredEmail,
    },
    function (err, resp) {
      if (err) {
        setPasswordResetStatus({
          isSuccess: false,
          isError: true,
          message: err,
        });
        setEmail("");
      } else {
        setPasswordResetStatus({
          isSuccess: true,
          isError: false,
          message: resp,
        });
        setEmail("");
      }
    }
  );
};

export const loginService = (values, setloginStatus) => {
  webAuth.login(
    {
      username: values.email,
      password: values.password,
      realm: process.env.REACT_APP_AUTH0_REALM,
      redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
      responseType: process.env.REACT_APP_AUTH0_LOGIN_RESPONSE_TYPE,
    },
    function (err) {
      setloginStatus({
        isError: true,
        message: err.description,
      });
    }
  );
};

export const processHash = (hashToken) => {
  webAuth.parseHash({ hash: hashToken }, function (err, authResult) {
    console.log("parseHash");
    if (err) {
      console.log(err);
    } else {
      console.log(authResult);
      setHttpOnlyCookie(authResult);
      return;
    }
  });
};

const setHttpOnlyCookie = (authResult) => {
  // const expiresAt = JSON.stringify(
  //   authResult.expiresIn * 1000 + new Date().getTime()
  // );
  // console.log("cookie added");
  // document.cookie = `access_token=${authResult.accessToken}; HttpOnly`;
  // document.cookie = `id_token=${authResult.idToken}; HttpOnly`;
  console.log("local storage added");
  localStorage.setItem("access_token", authResult.accessToken);
  localStorage.setItem("id_token", authResult.idToken);
};
