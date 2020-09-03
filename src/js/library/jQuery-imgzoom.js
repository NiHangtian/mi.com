import $ from '../library/jquery.js'
// 立即执行函数闭包

// 倍数，times  想放大的倍数
// id,对应的id 
$.fn.imgzoom = function(o) {
    var e = this;
    // 找到图片
    img = $(this).find("img").eq(0),
        s = {
            width: "100px",
            height: "100px",
            backgroundColor: "white",
            opacity: "0.5",
            left: "0",
            top: "0"
        };
    // console.log(img)
    o && $.extend(!0, s, o)
        // console.log(s.times)
    s.times == null ? s.times = 3 : null
    s.id == null ? s.id = "#small" : null
    if (s.times <= 1) {
        s.times = 1.5
    } else {
        s.times = s.times
    }
    // 设置进入
    $(this).hover(function() {
            mark = $("<div id='mark'></div>"),
                big = $("<div id='big'>"),
                src = img.attr("src"),
                // console.log(src[1])
                bigImg = $("<img src=" + src + " />")
                // console.log(bigImg)
            $(e).append(mark),
                $(big).append(bigImg),
                $(e).after(big)

            w = $(s.id).width()
            h = $(s.id).height()

            $("#big").css({
                    width: 100 * s.times + "px",
                    height: 100 * s.times - 5 + "px"
                })
                // console.log(w)
            $("#big img").css({
                    width: w * s.times + "px",
                    height: h * s.times + "px"
                })
                // console.log(365/s.times*(s.times-1))
            $(e).off("mousemove"),
                $(e).on("mousemove", function(o) {
                    var i = o || window.event;
                    // console.log(i)
                    mark = $(e).find("#mark");
                    l = o.pageX - $(this).offset().left - 50;
                    t = o.pageY - $(this).offset().top - 50;
                    // console.log(l)
                    l <= 0 && (l = 0);
                    l >= 150 && (l = 150);
                    t <= 0 && (t = 0);
                    t >= 265 && (t = 265);
                    mark.css({
                        left: l,
                        top: t
                    })
                    $("#big img").css({
                            left: -(s.times) * l,
                            top: -(s.times) * t
                        })
                        // console.log(s.times)

                })
        },
        function() {
            // 移除 
            $(e).find("#mark").remove(),
                $("#big").remove()
        })
}