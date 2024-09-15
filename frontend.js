$(document).ready(function () {
  var baseUrl = "http://127.0.0.1:8080";

  $("#loginButton").click(function () {
    var name = $("#loginNameInput").val();
    var password = $("#loginPasswordInput").val();

    console.log("Name: " + name);
    console.log("Password: " + password);

    $.ajax({
      url: baseUrl + "/login",
      contentType: "application/json",
      type: "POST",
      data: JSON.stringify({
        name: name,
        password: password,
      }),
      success: function (response) {
        alert("Response: " + response.status);
        console.log("Response: ", response.status);
      },
      error: function (xhr, status, error) {
        alert("Error:", error);
        console.error("Error: ", error);
      },
    });
  });

  $("#signUpButton").click(function () {
    var username = $("#signUpNameInput").val();
    var password = $("#signUpPasswordInput").val();
    var confirmPassword = $("#signUpConfirmPasswordInput").val();

    console.log("[Sign up] username: " + username);
    console.log("[Sign up] Password: " + password);
    console.log("[Sign up] Confirm Password: " + confirmPassword);

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
