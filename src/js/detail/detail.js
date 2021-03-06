import $ from '../library/jquery.js';
import { cookie } from '../library/cookie.js';
import bigimg from '../library/bigimg.js'


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
            let titleType = ''
            $('main').append(res.details)
            $('.option-box ul li').on('click', function() {
                $(this).addClass('active');
                $('.selected-list ul').html(`<li>${$('.header_sopin>.warpper>span').html()} ${$(this).text()} <span>${res.price}元</span></li>`)
                titleType = '' + $('.header_sopin>.warpper>span').html() + $(this).text()
            })

            $('.btn-box .sale-btn').on('click', function() {

                if ($('.option-box ul li.active').length) {
                    addItim(res.id, res.price, 1, titleType)
                    location.href = '../html/shopping.html'
                } else {
                    alert('请选择类型')
                }


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


function addItim(id, price, num, titleType) {
    let shop = cookie.get('shop');
    let product = {
        id: id,
        price: price,
        num: num,
        titleType: titleType
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