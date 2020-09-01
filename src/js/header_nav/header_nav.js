import $ from '../library/jquery.js';

import '../library/jquery.lazyload.js'
import '../library/banner.js'
import '../library/sidebar.js'

$(function() {
    //侧边栏的回到顶部的显示
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

    //////////////////////////
    //倒计时

    //14:00 场
    // ! function() {
    //     let h = new Date().getHours();
    //     let m = new Date().getMinutes();
    //     let s = new Date().getSeconds();
    //     console.log(dataot);
    //     let outtime = parseInt($('.round').html())
    //     console.log(outtime);
    //     let ktime = setInterval(function() {
    //         let data = new Date();
    //         let hos = data.getHours()
    //     }, 1000)
    // }()



    //////////
    let elm = {}
    elm.nav_ul = $('.nav_li_hov>div').children();
    // console.log($('.nav_list').children());
    let k = $('.nav_list').children()
    for (let i = 0; i <= k.length - 2; i++) {
        $(k[i]).hover(function() {
            elm.nav_ul.removeClass('disblock')
            $(elm.nav_ul[i]).addClass('disblock')
        })
    }




    $('#banner_s').banner({
        speek: 600,
        delay: 5000
    })
    $.ajax({
        type: "get",
        url: "../../interface/getproduct.php",
        dataType: "json",
        success: function(res) {
            let temp = '';
            console.log(res);

            res.forEach((elm, index) => {
                let picture = JSON.parse(elm.picture);
                console.log(picture);
                temp += `<div class="sj_son">
                <a href="./detail.html?id=${elm.id}">
                    <img class="lazy" data-original="../${picture[0].src}" alt=" ">
                    <p> ${elm.title}</p>
                    <i>${elm.synopsis}</i>
                    <em>${elm.price}元</em>
                </a>
            </div>`
            });
            console.log(temp);
            $('#jungezuishuai').children().remove()
            $('#jungezuishuai').html(temp)

            $("img.lazy").lazyload({
                placeholder: "../../images/timg.gif", //用图片提前占位
                // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
                effect: "fadeIn", // 载入使用何种效果
                // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
                // threshold: 200, // 提前开始加载
                // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
                // event: 'click', // 事件触发时才加载
                // event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标莫过或点击图片才开始加载,后两个值未测试…
                // container: $("#container"), // 对某容器中的图片实现效果
                // container,值为某容器.lazyload默认在拉动浏览器滚动条时生效,这个参数可以让你在拉动某DIV的滚动条时依次加载其中的图片
                // failurelimit: 10 // 图片排序混乱时
                // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.


            });
        }
    })
})
console.log(JSON.parse('[{"title":"pic1","src":"images/det/p2/1.jpg"},{"title":"pic2","src":"images/det/p2/2.jpg"},{"title":"pic3","src":"images/det/p2/3.jpg"}]'));