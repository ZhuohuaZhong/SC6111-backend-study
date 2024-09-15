$(document).ready(function () {
  var baseUrl = "http://127.0.0.1:8080";

  $("#loginButton").click(function () {
    var username = $("#loginNameInput").val();
    var password = $("#loginPasswordInput").val();
    var isRemember = $("#loginRememberCheck").is(":checked");

    console.log("[Login] username: " + username);
    console.log("[Login] password: " + password);
    console.log("[Login] remember: " + isRemember);

    if (password == confirmPassword) {
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
          console.error("[Login] Error: ", error);
          alert("Error:", error);
        },
      });
    } else {
      console.log(
        "[Sign up] The confirmation password does not match the original."
      );
      alert("The confirmation password does not match the original.");
    }
  });

  $("#signUpButton").click(function () {
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
        success: function (response) {
          console.log("[Sign up] Response status: ", response.status);
          console.log("[Sign up] Response msg: ", response.msg);
          alert(response.status + ": " + response.msg);
        },
        error: function (error) {
          console.error("[Sign up] Error: ", error);
          alert("Error:", error);
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
    $("#loginPage").hide();
    $("#signUpPage").show();
  });

  $("#changeLayoutToLogin").click(function () {
    $("#loginPage").show();
    $("#signUpPage").hide();
  });
  //   $("#signUpChangeLayout").click(function (){

  //   });
});
