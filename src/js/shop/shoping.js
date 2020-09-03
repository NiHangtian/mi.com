import $ from '../library/jquery.js'
import { cookie } from '../library/cookie.js'
import notsop from './str.js'

$(function() {
    if (cookie.get('shop')) {
        let shop = JSON.parse(cookie.get('shop'))
        let listid = shop.map(elm => elm.id).join()
            // console.log(listid);
        $.ajax({
            type: "get",
            url: "../../interface/getitems.php",
            data: {
                listid: listid
            },
            dataType: "json",
            success: function(res) {
                // console.log(res);
                let str = ''
                res.forEach(elm => {

                    let arr = shop.filter(val => val.id == elm.id)
                        // console.log(arr);
                    let picture = JSON.parse(elm.picture)
                        // console.log(picture);
                    str += ` <div class="item-box">
                    <div class="item-table">
                        <div class="list-head clear_fix">
                            <div class="col col-check">
                                <input data-id="${elm.id}" type="checkbox">
                            </div>
                            <div data-v-562c5445="" class="col col-img">
                                <a href="javascript:;"><img src="../${picture[0].src}" alt=""></a>
                            </div>
                            <div data-v-562c5445="" class="col col-name">${elm.title} 白色</div>
                            <div data-v-562c5445="" data-id="${elm.id}" class="col col-price">${elm.price}元</div>
                            <div data-v-562c5445="" class="col col-num">
                                <div class="change-goods-num clear_fix">
                                    <a class="lost" data-id="${elm.id}" href="javascript:void(0)"><i >-</i></a><input type="text" data-id="${elm.id}" class="goods-num" value="${arr[0].num}" ><a data-id="${elm.id}" class="add" href="javascript:void(0)"><i   class="iconfont">+</i></a>
                                    <!---->
                                </div>
                            </div>
                            <div data-v-562c5445="" data-id="${elm.id}" class=" col col-total tot">${arr[0].num*elm.price}元</div>
                            <div data-v-562c5445="" data-id="${elm.id}" class="col col-action"><a data-id="${elm.id}" href="javascript:;">×</a></div>
                        </div>
                    </div>
                </div>`
                });
                $('.list-item').html(str)
                $('input[type="checkbox"]').on('change', function() {
                    let ckbox = $('input[type="checkbox"]').not($('input[data-ck="all"]'));
                    if ($(this).attr('data-ck') == "all") {
                        let ckbool = $(this).prop('checked')
                        console.log(ckbool);
                        ckbox.each(function(i, elm) {
                            $(elm).prop('checked', ckbool)
                        })

                    }
                    priChange();
                })

                $('.col-action a').on('click', function() {
                        let dataid = $(this).attr('data-id')
                        console.log(dataid);
                        shop = shop.filter(elm => {
                            return elm.id != dataid
                                // if (elm.id != dataid) {
                                //     return elm
                                // }
                        })
                        console.log(shop);
                        if (shop[0]) {
                            cookie.set('shop', JSON.stringify(shop), 1)
                        } else {
                            cookie.remove('shop')
                            $('.main-content').html(
                                notsop
                            )
                        }

                        $(this.parentNode.parentNode.parentNode.parentNode).remove()
                        priChange();
                    })
                    // console.log($('.lost').parentNode);
                $('.lost').on('click', function() {
                    let dataid = $(this).attr('data-id')
                    if ($(this).next('input')[0].value > 0) {
                        // $(this).next('input')[0].value--
                        $('input[type="text"][data-id="' + dataid + '"]')[0].value--
                            let val = $('input[type="text"][data-id="' + dataid + '"]')[0].value;
                        let num = parseInt($('.col-price[data-id="' + dataid + '"]').html())
                            // console.log(val, num);
                        $('.col-total[data-id="' + dataid + '"]')[0].innerHTML = val * num + '元';
                    }
                    priChange();
                })
                $('.add').on('click', function() {
                    let dataid = $(this).attr('data-id')
                        // console.log(dataid);
                    if ($(this).prev('input')[0].value < 10) {
                        $('input[type="text"][data-id="' + dataid + '"]')[0].value++;
                        let val = $('input[type="text"][data-id="' + dataid + '"]')[0].value;
                        let num = parseInt($('.col-price[data-id="' + dataid + '"]').html())
                            // console.log(val, num);
                        $('.col-total[data-id="' + dataid + '"]')[0].innerHTML = val * num + '元';
                    } else {
                        alert('你他喵是黄牛吧')
                    }
                    priChange();
                })
                $('.goods-num').on('input', function() {

                })
            }
        })

    } else {
        $('.main-content').html(
            notsop
        )
    }
})


function priChange(ck) {
    let ckbox = $('input[type="checkbox"]').not($('input[data-ck="all"]'));
    let num = 0;
    let a = 0
    ckbox.each(function(i, elm) {

        if ($(elm).prop('checked')) {
            let daid = $(elm).attr('data-id')

            num += parseInt($('.col-total[data-id="' + daid + '"]').text())
            a++
        }
        $('em[data-numall=""]').text(num)

        // console.log($(elm).attr('data-id'));
        // console.log(i, elm);
    })


    if (ckbox.length == a) {
        $('input[data-ck="all"]').prop('checked', true)
    } else {
        $('input[data-ck="all"]').prop('checked', false)
    }
}