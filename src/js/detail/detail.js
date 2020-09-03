import $ from '../library/jquery.js';
import { cookie } from '../library/cookie.js';
import '../library/jquery.lazyload.js'
import '../library/sidebar.js'
import '../library/cookie.js'
import '../library/HappyImage.min.js'





$(function() {
    var id = location.search.split('=')[1]
        // console.log(id);

    $.ajax({
        type: 'get',
        url: '../../interface/getitem.php',
        data: {
            id: id
        },
        dataType: 'json',
        success: function(res) {
            // console.log(res);
            let picture = JSON.parse(res.picture)
            $('.header_sopin>.warpper>span').html(res.title);
            $('.product-con>h2').html(res.title);
            $('.product-con>.sale-desc').html(res.synopsis);
            $('.product-con>.price').html(res.price + '元');
            if (res.num > 100) {
                $('.desc').html('有现货')
            } else if (res.num <= 100 && res.num > 0) {
                $('.desc').html('货物紧缺')
            } else {
                $('.desc').html('没有现货')
            }

            let str = ''

            res.type = JSON.parse(res.type);
            for (let i in res.type) {
                str += `<li class=""><a href="javascript:;">${res.type[i]}</a></li>`
                    // console.log(i);
            }
            $('.option-box ul').html(str)
            $('.selected-list').html(
                `<ul>
                <li>${res.title} <span>${res.price}元</span></li>
            </ul>
            <div class="total-price">总计：${res.price}元</div>`
            )

            $('main').append(res.details)
            $('.option-box ul li').on('click', function() {
                $(this).addClass('active');
                $('.selected-list ul').html(`<li>${$('.header_sopin>.warpper>span').html()} ${$(this).text()} <span>${res.price}元</span></li>`)
            })

            $('.btn-box .sale-btn').on('click', function() {
                addItim(res.id, res.price, 1)
                    // console.log(1);
            })
            let imgsre = '';
            picture.forEach(elm => {
                    imgsre += ` <div id="${elm.title}"><img src="../${elm.src}"></div>`
                        // $("#" + elm.title).imgzoom({ times: "1" })
                })
                // console.log(imgsre);
            $('.img_box').html(`
            <div class="target" id="target-2">
            <div>
                ${imgsre}
            </div>
        </div>`)
                // console.log($("#target-2"));
            $("#target-2").HappyImage({
                effect: "fade",
                autoplay: 5000
            });
            bigimg()


        }
    })


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


function addItim(id, price, num) {
    let shop = cookie.get('shop');
    let product = {
        id: id,
        price: price,
        num: num
    };
    if (shop) {
        shop = JSON.parse(shop)
        if (shop.some(elm => elm.id == id)) {

            shop.forEach(elm => {
                if (elm.id == id) {
                    elm.num++
                }
            });
        } else {
            shop.push(product)
        }
    } else {
        shop = [];
        shop.push(product)
    }
    cookie.set('shop', JSON.stringify(shop), 1)
    $()
}

function bigimg() {
    let minimg = $('.hy-box ')

    minimg.hover(function() {
            let elm = {}
                // console.log(this);
            elm.src = $(this).children('img').attr('src')
                // console.log(elm.src);
            elm.bigimg = `<div class="big_img" ><img src="${elm.src}" alt=""></div>`
            elm.movbox = `<div class="movbox"></div>`
            $(this).append(elm.bigimg).append(elm.movbox)
            let movebox = $('.movbox');
            let bigpicture = $('.big_img img');
            let small = $(this);
            let big = $('.big_img');
            // console.log(small.width());
            // console.log(big.offset().width);
            // console.log(bigpicture.offset().width);
            // console.log(small.width() * big.width() / bigpicture.width());
            movebox.css({
                width: (small.width() * big.width() / bigpicture.width()) + 'px',
                height: (small.height() * big.height() / bigpicture.height()) + 'px'
            })
            $(this).on('mousemove', function(ev) {

                    let top = ev.pageY - small.offset().top - movebox.height() / 2;
                    let left = ev.pageX - small.offset().left - movebox.width() / 2;
                    let ratio = bigpicture.width() / small.width(); // 比例必须大于1
                    // console.log(top);
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
                // console.log(this);
        }, function() {
            $(this).children('.big_img').remove()
            $(this).children('.movbox').remove()
        })
        // minimg.each(function(index, elm) {
        //         $(elm).hover(function() {
        //             console.log(1);
        //             elm.src = $(this).attr('src')
        //             console.log(elm.src);
        //         })

    //     })
    // minimg[0].on('mouseover', function() {
    //     console.log(1);
    // })

}