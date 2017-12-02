function fblogin() {
  FB.login(function (response) {
    console.log(response);
    axios.post('http://localhost:3000/api/users/signinfb', {
      accessToken: response.authResponse.accessToken,
      userID: response.authResponse.userID
    })
      .then((response) => {
        console.log(response)

      })
    // .catch((error) => {
    //   console.log(error);
    // });
  }, { scope: "email" });
}

function statusChangeCallback(response) {
  if (response.status === "connected") {
  } else {
  }
}

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

// First Initialize
window.fbAsyncInit = function () {
  FB.init({
    appId: '302040460283594',
    cookie: true,  // enable cookies to allow the server to access 
    // the session
    xfbml: true,  // parse social plugins on this page
    version: 'v2.8' //
  });
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
};


(function (doc, tag, id) {
  var js, fjs = doc.getElementsByTagName(tag)[0];
  if (doc.getElementById(id)) return;
  js = doc.createElement(tag); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, "script", "facebook-jssdk"));