import $ from '../library/jquery.js'
import { cookie } from '../library/cookie.js'
import '../library/jquery-md5.js'




$(function() {
    let reg = {

        "password": /^.{6,16}$/,

        "phone": /^1[3-9]\d{9}$/
    };

    $('input:not([type="button"])').each(function(index, elm) {
        console.log(elm);
        $(elm).on('input', function() {
            console.log(1);
            if ($(elm).attr('id') == 'checkpass') return;
            if (reg[$(elm).attr('id')].test($(elm).val())) {
                $('p[class="' + $(elm).attr('id') + '"]').text('通过验证');
                // console.log($(`p.${$(elm).attr('id')}`));
                $('p[class="' + $(elm).attr('id') + '"]').css({
                    "color": "green"
                })
                $(this).attr('data-pass', true);
                console.log(3);
            } else {
                $('p[class="' + $(elm).attr('id') + '"]').text('未通过验证');
                $(this).attr('data-pass', false);
                $('p[class="' + $(elm).attr('id') + '"]').css({
                    "color": "red"
                })
                console.log(2);
            }
            check();
        });
    });
    $('#checkpass').on('input', function() {
        if ($(this).val() === $('#password').val()) {
            $('.checkpass').text('通过验证');
            $(this).attr('data-pass', true);
        } else {
            $('.checkpass').html('两次输入的密码不同,请确认');
            $(this).attr('data-pass', false);
        }
        check();
    });
    $('.sib').on('click', function() {
        console.log(132);
        let phone = $('#phone').val();
        let password = $.md5($('#password').val());
        console.log(phone, password);
        $.ajax({
            type: "get",
            url: "../../interface/namereg.php",
            data: {
                phone: phone,
                password: password
            },
            dataType: "json",
            success: function(res) {
                console.log(res);
                if (res) {
                    cookie.set("isLogined", 'true');
                    cookie.set("phone", phone);
                    location.href = "./pass.html";
                } else {
                    cookie.set("isLogined", 'false');
                    alert('电话号码已注册');
                    location.href = "./login.html";
                }
            }
        });
    });

    function check() {
        if ($('[data-pass=true]').length == 5) {
            $('#btn').removeAttr('disabled');
        } else {
            $('#btn').attr('disabled', 'disabled');
        }
    }
})