$(document).ready(function(){
    $('#login').click(function(){
      var username = $("#phone").val(); // Fetching phone number
      var password = $("#password").val(); // Fetching password
      
      if (username === '') {
        alert('电话不能为空，请重新输入');
        return false;
      }
      
      if (password === '') {
        alert('密码不能为空，请重新输入');
        return false;
      }
    });
  });
  