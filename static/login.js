$(document).ready(function () {
  var baseUrl = "http://127.0.0.1:8080/api";

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
});
