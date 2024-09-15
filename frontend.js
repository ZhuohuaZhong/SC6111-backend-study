$(document).ready(function () {
  var baseUrl = "http://127.0.0.1:8080";

  $("#loginButton").click(function () {
    console.log("----------[Login]----------");

    var username = $("#loginNameInput").val();
    var password = $("#loginPasswordInput").val();
    var isRemember = $("#loginRememberCheck").is(":checked");

    console.log("[Login] username: " + username);
    console.log("[Login] password: " + password);
    console.log("[Login] remember: " + isRemember);

    $.ajax({
      url: baseUrl + "/login",
      contentType: "application/json",
      type: "POST",
      data: JSON.stringify({
        username: username,
        password: password,
        isRember: isRemember,
      }),
      success: function (response) {
        console.log("[Login] Response status: ", response.status);
        console.log("[Login] Response msg: ", response.msg);
        alert(response.status + ": " + response.msg);
      },
      error: function (error) {
        console.error("[Login] Frontend error: ", error);
        alert("Frontend error:", error);
      },
    });
  });

  $("#signUpButton").click(function () {
    console.log("----------[Sign up]----------");

    var username = $("#signUpNameInput").val();
    var password = $("#signUpPasswordInput").val();
    var confirmPassword = $("#signUpConfirmPasswordInput").val();

    console.log("[Sign up] username: " + username);
    console.log("[Sign up] password: " + password);
    console.log("[Sign up] confirm password: " + confirmPassword);

    if (password == confirmPassword) {
      $.ajax({
        url: baseUrl + "/sign_up",
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify({
          username: username,
          password: password,
        }),
        // request success
        success: function (response) {
          console.log("[Sign up] Response status: ", response.status);
          console.log("[Sign up] Response msg: ", response.msg);
          alert(response.status + ": " + response.msg);

          // if sign up success, redirect to login page and clear input in sign up page
          if (response.status == "Success") {
            changeLayoutToLogin();
            clearSignUpInput();
          }
        },
        // request fail
        error: function (error) {
          console.error("[Sign up] Frontend error: ", error);
          alert("Frontend error:", error);
        },
      });
    } else {
      console.log(
        "[Sign up] The confirmation password does not match the original."
      );
      alert("The confirmation password does not match the original.");
    }
  });

  $("#changeLayoutToSignUp").click(function () {
    changeLayoutToSignUp();
    clearLoginInput();
  });

  $("#changeLayoutToLogin").click(function () {
    changeLayoutToLogin();
    clearSignUpInput();
  });

  function changeLayoutToSignUp() {
    $("#loginPage").hide();
    $("#signUpPage").show();
  }

  function changeLayoutToLogin() {
    $("#loginPage").show();
    $("#signUpPage").hide();
  }

  function clearSignUpInput() {
    $("#signUpNameInput").val("");
    $("#signUpPasswordInput").val("");
    $("#signUpConfirmPasswordInput").val("");
  }

  function clearLoginInput() {
    $("#loginNameInput").val("");
    $("#loginPasswordInput").val("");
    $("#loginRememberCheck").prop("checked", false);
  }
});
