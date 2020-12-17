define([], function() {
    return {
        init: function() {
            //1.表单验证。
            let $form = $('.form-frm'); //form表单。
            let $password = $('#password'); //密码
            let $tel = $('#loginname'); //手机号码
            let $p = $('.form-frm p'); //两个p
            // 定义检测标记
            $passflag = true;
            $telflag = true;
            //手机
            $tel.on('focus', function() {
                $p.eq(0).html('请输入11位正确的手机号码').css('color', '#333');
            });
            $tel.on('blur', function() {
                let $value = $(this).val(); //当前表单的值
                if ($value !== '') {
                    let $reg = /^1[3|5|8]\d{9}$/;
                    if ($reg.test($value)) {
                        $p.eq(0).html('√').css('color', 'green');
                        $telflag = true;
                        $.ajax({ //检测号码是否重复
                            type: 'post',
                            url: 'http://10.31.161.51/dashboard/peojectname/php/reg.php',
                            data: {
                                tel: $tel.val(),
                                // pass: $password.val()
                            }
                        }).done(function(data) {
                            if (!data) { //不存在
                                $p.eq(0).html('√').css('color', 'green');
                            } else { //存在
                                $p.eq(0).html('该手机号已被注册').css('color', 'red');
                                $telflag = false;
                            }
                        });
                    } else {
                        $p.eq(0).html('手机号码格式有误').css('color', 'red');
                        $telflag = false;
                    }
                } else {
                    $p.eq(0).html('手机号码不能为空').css('color', 'red');
                    $telflag = false;
                }
            });



            $password.on('focus', function() {
                $p.eq(1).html('请输入密码,长度为8-14个字符').css('color', '#333');
            })
            $password.on('blur', function() {
                let $value = $(this).val();
                if ($value !== '') {
                    if ($value.length >= 8 && $value.length <= 14) { //满足长度
                        let regnum = /\d+/;
                        let reguppercase = /[A-Z]+/;
                        let reglowercase = /[a-z]+/;
                        let other = /[\W_]+/; //特殊字符%&^$#@!*
                        let count = 0; //字符种类的统计结果。
                        if (regnum.test($value)) { //值存在数字
                            count++;
                        }
                        if (reguppercase.test($value)) {
                            count++;
                        }
                        if (reglowercase.test($value)) {
                            count++;
                        }
                        if (other.test($value)) {
                            count++;
                        }

                        //根据统计的种类输出弱中强
                        switch (count) {
                            case 1:
                                $p.eq(1).html('弱').css('color', 'red');
                                $passflag = false;
                                break;
                            case 2:
                            case 3:
                                $p.eq(1).html('中').css('color', 'red');
                                $passflag = true;
                                break;
                            case 4:
                                $p.eq(1).html('强').css('color', 'red');
                                $passflag = true;
                                break;
                        }

                    } else {
                        $p.eq(1).html('密码长度有误').css('color', 'red');
                        $passflag = false;
                    }
                } else {
                    $p.eq(1).html('密码不能为空').css('color', 'red');
                }
            })


            $form.on('submit', function() {
                if ($tel.val() === '') {
                    $p.eq(0).html('手机号码不能为空').css('color', 'red');
                    $telflag = false;
                }
                if ($password.val() === '') {
                    $p.eq(1).html('密码不能为空').css('color', 'red');
                    $passflag = false;
                }
                if (!$telflag || !$passflag) {
                    return false;
                }
            });

        }
    }
});