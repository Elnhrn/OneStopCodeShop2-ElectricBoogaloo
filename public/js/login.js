$(function() {
  $("#login").on("click", function() {
    var user_name = req.body.user_name;
    var password = req.body.password;
    var newUser = {
      user_name: user_name,
      password: password
    };
    $.ajax("/api/user_name", {
      type: "POST",
      data: newUser
    });
  });
});