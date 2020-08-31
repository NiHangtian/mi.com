import $ from '../library/jquery.js';

import '../library/jquery.lazyload.js'
import '../library/sidebar.js'

$(function() {
    $(document).scroll(function() {
        var scroH = $(document).scrollTop(); //滚动高度
        var viewH = $(window).height(); //可见高度
        var contentH = $(document).height(); //内容高度

        if ((scroH - viewH) > 0) {
            $('.last-sidebar').addClass('disblock')
        } else {
            $('.last-sidebar').removeClass('disblock')
        }

    })

    $('.last-sidebar').on('click', function() {
        $(document).scrollTop(0)
    })

    ////////////////////
    let elm = {}
    elm.nav_ul = $('.nav_li_hov>div').children();
    let k = $('.nav_list').children()
    for (let i = 0; i <= k.length - 2; i++) {
        $(k[i]).hover(function() {
            elm.nav_ul.removeClass('disblock')
            $(elm.nav_ul[i]).addClass('disblock')
        })
    }
})