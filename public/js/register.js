
// 生成验证码
$(document).ready(function () {
    var code;//声明一个变量用于储存生成的验证码

    function changeImg() {
        var arrays = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z'
        ]
        // 重新初始化验证码
        code = '';
        // 随机从数组中获取四个元素组成的验证码
        for (var i = 0; i < 4; i++) {
            // 随机获取一个数组的下标
            var r = parseInt(Math.random() * arrays.length);
            code += arrays[r];
        }
        document.getElementById('getcaptcha').innerHTML = code;//将验证码写入指定区域
    }

    document.getElementById("getcaptcha").onclick = changeImg;

    $('#register').click(function () {
        var phone = $('#phone').val();//电话号码
        var nickname = $('#nickname').val();//用户名
        var password = $('#password').val();//密码
        var password2 = $('#password2').val();//确认密码
        var captcha = $('#captcha').val();//输入的验证码
        // 电话格式判断
        var phoneReg = /^1[3456789]\d{9}$/;
        // 用户名2-10位
        var nicknameReg = /^[ \u4e00-\u9fa5a-zA-Z0-9_]{2,10}$/;
        // 密码不少于6为
        var pswReg = /^(\w){6,}$/;

        if (!phoneReg.test(phone)) {
            alert("请输入正确的电话号码");
            return false;
        } else if (!nicknameReg.test(nickname)) {
            alert("用户名长度为2-10位");
            return false;
        } else if (!pswReg.test(password)) {
            alert("密码长度不少于6位");
            return false;
        } else if (password2 !== password) {
            alert("两次密码不一致");
            return false;
        } else if (captcha !== code) {
            alert("验证码不正确");
            return false;
        } else {
            window.location.assign("./register");
        }
    });
});
