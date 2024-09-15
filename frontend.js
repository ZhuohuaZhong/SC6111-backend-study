$(document).ready(function () {
  $("#loginButton").click(function () {
    var name = $("#loginNameInput").val();
    var password = $("#loginPasswordInput").val();

    console.log("Name: " + name);
    console.log("Password: " + password);

    $.ajax({
      url: "http://127.0.0.1:8080/login",
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
