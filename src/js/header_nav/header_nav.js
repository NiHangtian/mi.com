import $ from '../library/jquery.js';
(function() {
    $(function() {
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
})($);