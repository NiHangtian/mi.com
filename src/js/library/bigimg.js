import $ from './jquery.js'

function bigimg() {
    let minimg = $('.hy-box ')

    minimg.hover(function() {
        let elm = {}

        elm.src = $(this).children('img').attr('src')

        elm.bigimg = `<div class="big_img" ><img src="${elm.src}" alt=""></div>`
        elm.movbox = `<div class="movbox"></div>`
        $(this).append(elm.bigimg).append(elm.movbox)
        let movebox = $('.movbox');
        let bigpicture = $('.big_img img');
        let small = $(this);
        let big = $('.big_img');

        movebox.css({
            width: (small.width() * big.width() / bigpicture.width()) + 'px',
            height: (small.height() * big.height() / bigpicture.height()) + 'px'
        })
        $(this).on('mousemove', function(ev) {

            let top = ev.pageY - small.offset().top - movebox.height() / 2;
            let left = ev.pageX - small.offset().left - movebox.width() / 2;
            let ratio = bigpicture.width() / small.width(); // 比
            if (top <= 0) {
                top = 0;
            } else if (top >= small.height() - movebox.height()) {
                top = small.height() - movebox.height();
            }

            if (left <= 0) {
                left = 0;
            } else if (left >= small.width() - movebox.width()) {
                left = small.width() - movebox.width();
            }

            movebox.css({
                top: top + 'px',
                left: left + 'px'
            });

            bigpicture.css({
                top: ratio * -top + 'px',
                left: ratio * -left + 'px'
            });
        })

    }, function() {
        $(this).children('.big_img').remove()
        $(this).children('.movbox').remove()
    })


}
export default bigimg;