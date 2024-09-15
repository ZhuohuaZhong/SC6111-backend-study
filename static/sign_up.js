$(document).ready(function () {
  var baseUrl = "http://127.0.0.1:8080/api";

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
            window.location.href = "/login";
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
});
