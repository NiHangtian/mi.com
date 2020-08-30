import $ from '../library/jquery.js';
($(function() {
    $.fn.extend({
        banner: function(obj) {
            let mian = null,
                init = null,
                pre = null, //上一张
                next = null, //下一张
                timer = null, //定时器
                start = null,
                stop = null,
                elms = {},
                defaults = {
                    speek: 500,
                    delay: 3000
                }
            $.extend(defaults, obj)
            stop = function() {
                clearInterval(timer);
                elms.banDiv.stop(true, true)
            }.bind(this)
            init = function() {
                elms.banDiv = $(this).children('div')

                elms.banDiv.append(elms.banDiv.children().first().clone());
                elms.banImg = elms.banDiv.children()
                elms.imgWidth = elms.banImg.first().width()
                console.log(elms.imgWidth);
                elms.index = 0;
                elms.banSpan = $(this).children('span')
                elms.banUl = $(this).children('ul')
                let str = ''
                for (let i = 0; i < elms.banImg.length - 1; i++) {
                    str += '<li></li>'
                }
                elms.banUl.html(str)
                elms.banLi = elms.banUl.children('li')
                this.hover(function() {
                    stop()
                }, function() {
                    timer = setInterval(function() {
                        next()
                    }.bind(this), defaults.speek + defaults.delay)
                })
                elms.banLi.on('click', function() {
                    next(elms.banLi.index(this))
                })
                elms.banSpan.on('click', function() {
                    console.log(elms.banSpan.index(this));
                    if (elms.banSpan.index(this) == 0) {
                        pre();

                    };
                    if (elms.banSpan.index(this) == 1) {
                        next();
                        console.log(123);
                    }
                })
            }.bind(this)

            start = function() {

            }
            next = function(index) { //下一张
                elms.index = index - 1 || elms.index
                elms.index++;
                let left = elms.index * elms.imgWidth
                console.log(left);
                elms.banDiv.animate({
                    left: -left + 'px'
                }, defaults.speek, function() {
                    if (elms.index >= elms.banImg.length - 1) {
                        elms.index = 0;
                        elms.banDiv.css('left', 0)
                    }
                    $(elms.banLi[elms.index]).addClass('banner_this').siblings().removeClass()
                })
            }
            pre = function() {

                if (elms.index <= 0) {
                    elms.index = elms.banImg.length - 1;
                    elms.banDiv.css('left', '-' + (elms.banImg.length - 1) * elms.imgWidth + 'px')
                }
                elms.index--;
                let left = elms.index * elms.imgWidth
                console.log(left);
                elms.banDiv.animate({
                    left: -left + 'px'
                }, defaults.speek, function() {

                })
            }
            mian = function() {
                init();
                timer = setInterval(function() {
                    next()
                }.bind(this), defaults.speek + defaults.delay)
            }.bind(this)
            mian();
        }
    })


}))($)