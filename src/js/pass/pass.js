import $ from '../library/jquery.js';
import { cookie } from '../library/cookie.js'


import '../library/jquery-md5.js'
import '../library/sidebar.js'

$(function() {
    let reg = {
        "username": /^[A-z]\w{5,15}$/,
        "password": /^.{6,16}$/,
        "email": /^\w{6,16}@[A-z0-9_-]{2,}\.[A-z]{2,7}\.?[A-z]*$/,
        "phone": /^1[3-9]\d{9}$/
    };

    $('input:not([type="button"])').each(function(index, elm) {
        $(elm).on('input', function() {
            if ($(elm).attr('id') == 'checkpass') return;
            if (reg[$(elm).attr('id')].test($(elm).val())) {
                $('p[class="' + $(elm).attr('id') + '"]').html('通过验证');
                $('p[class="' + $(elm).attr('id') + '"]').css({
                    "color": "green"
                })

            } else {
                $('p[class="' + $(elm).attr('id') + '"]').html('未通过验证');
                $('p[class="' + $(elm).attr('id') + '"]').css({
                    "color": "red"
                })

            }

        });
    });

    $('#btn').on('click', function() {
        console.log(132);
        let phone = $('#phone').val();
        let password = $.md5($('#password').val());
        console.log(phone, password);
        $.ajax({
            type: "get",
            url: "../../interface/login.php",
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
                    location.href = "./index.html";
                } else {
                    cookie.set("isLogined", 'false');
                    alert('账号或密码错误');
                    location.href = "./pass.html";
                }
            }
        });
    })



})