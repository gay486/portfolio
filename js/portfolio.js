;(function(window,document,$,undefined){

    var portfolio = {
        init:   function(){
            var that = this;

            that.headerFn();
            that.section1Fn();
            that.section2Fn();
            that.section3Fn();
            that.totalFn();

        },
        headerFn: function(){
            var that = null;
            var _win = $(window);
            var _winW = _win.innerWidth();
            var _winH = _win.innerHeight();
            var _header = $('#header');
            var _nav = $('#nav');
            var bod = $('body');
            var _menuBar = $('#header .menu-bar');
            var _mainBtn = $('#header .main-btn');
            var _smoothBtn = $('.smoothBtn');
            var _htmlBody = $('html,body');
            var _scroll = false;
            var m = 0;
            var _section2 = $('#section2');
            var t = false;
            var s = -1;
            var topPos = 84;

            var _wheelE = $('.wheelE');
            var _section9 = $('#main #section9');
            var _footer = $('#footer');
            var _wheelDelta = null;
            var n = _wheelE.length;
            var url = null;

                _header.on({
                    mouseenter: function(){
                        that = $(this);
                        that.addClass('addH');
                    },
                    mouseleave: function(){
                        that = $(this);
                        if( _scroll === false && m === 0 ){
                            that.removeClass('addH');
                        }
                    }
                });

                _smoothBtn.on({
                    click: function(e){
                        var that = $(this);
                        e.preventDefault();
                        url = that.attr('href');
                        _htmlBody.stop().animate({ scrollTop: $(url).offset().top },600);
                    }
                });

                _win.scroll(function(){
                    that = $(this);
                    if( that.scrollTop() >= 30 ){
                        _scroll = true;
                        _header.addClass('addH');
                    }
                    else{
                        _scroll = false;
                        if( m===0 ){
                            _header.removeClass('addH');
                        }
                    }
                });

                _win.resize(function(){
                    resizeFn();
                });

                function resizeFn(){

                    // if( _window.innerWidth() > 1024 ){
                    //     topPos = 84;
                    //     _nav.stop().show(0).animate({top:(s*topPos)},300);
                    // }
                    // else if( _window.innerWidth() > 780 ){
                    //     topPos = 84;
                    //     _nav.stop().show(0).animate({top:(s*topPos)},300);
                    // }
                    // else{
                    //     topPos = 0;
                    //     _sub.stop().slideDown(0);
                    //     _nav.stop().animate({top:0},0);
                    //     if(m==1){
                    //         _nav.stop().show(0);
                    //         $('html').removeClass('addScroll');
                    //     }
                    //     else{
                    //         _nav.stop().hide(0);
                    //         $('html').removeClass('addScroll');
                    //     }
                    // }
                }
                setTimeout(resizeFn,10);

                _menuBar.on("click", function(e){
                    e.preventDefault();
                    $(this).toggleClass('is-closed');
                    if(!$(this).hasClass('is-closed')){
                        bod.removeClass('is-open');
                        _nav.stop().slideUp(600,'swing');
                        $(this).addClass('addBtn');
                    } 
                    else {
                        bod.addClass('is-open');
                        _nav.stop().slideDown(600,'swing');
                        $(this).removeClass('addBtn');
                    }
                    resizeFn();
                    $(this).toggleClass('addBtn');
                });

                //메인버튼 이벤트
                _mainBtn.on({
                    click: function(){
                        _menuBar.toggleClass('is-closed');
                        _nav.stop().slideToggle(600,'swing');
                        _menuBar.removeClass('addBtn');
                        _header.addClass('addWheel');
                    }
                });

                _wheelE.each(function(idx){
                    var that = $(this);
                    that.on('mousewheel DOMMouseScroll', function(e){
                        e.preventDefault();
                        if(e.detail){
                            _wheelDelta = e.detail*-40;
                        }
                        else{
                            _wheelDelta = e.originalEvent.wheelDelta;
                        }
                            if(_wheelDelta < 0){
                                _header.addClass('addWheel');
                                if(idx < n-1){
                                    if(idx == n-2){
                                        _htmlBody.stop().animate({scrollTop:that.parent().next().offset().top},600,'easeInOutSine');
                                    }
                                    else{
                                        _htmlBody.stop().animate({scrollTop:that.next().offset().top},600,'easeInOutSine');
                                    }
                                }
                            }
                            else{
                                _header.removeClass('addWheel');
                                if(idx > 0){
                                    if(idx == n-1){
                                        _htmlBody.stop().animate({scrollTop:that.prev().find('.wheelE').last().offset().top},600,'easeInOutSine');
                                    }
                                    else{
                                        _htmlBody.stop().animate({scrollTop:that.prev().offset().top},600,'easeInOutSine');
                                    }
                                }
                            }
                    });
                });
        },

        section1Fn: function(){
            var _win = $(window);
            var _winW = _win.innerWidth();
            var _winH = _win.innerHeight();
            var _section1 = $('#main #section1');
            var _portfolio = $('#main .portfolio');

                function resizeFn(){
                    _winW = _win.innerWidth();
                    _winH = _win.innerHeight();

                    _section1.css({width:_winW,height:_winH});
                    _portfolio.css({width:_winW});

                }
                setTimeout(resizeFn,10);

                _win.resize(function(){
                    resizeFn();
                });

        },
        section2Fn: function(){

        },
        section3Fn: function(){
            var circle = $('.circle');
            var totLen = [];
            var s = [5,6,7,8,9,10];
            var slice = [];
            var tot = [0,0,0,0,0,0];
            var setId = [];
            var per = [.80,.80,.40,.50,.30,.30];
            var x = [];
            var color = ['#e44d26','#264de4','#f7df1e','#0868ab','#62ccf1','#f57f2a'];

                svgAniFn();
                function svgAniFn(){
                    $.each(circle,function(idx,obj){
                        totLen[idx] = obj.getTotalLength();

                        obj.style.strokeDasharray = totLen[idx];
                        obj.style.strokeDashoffset = totLen[idx];

                        slice[idx] = (totLen[idx]/s[idx])/100;

                        setId[idx] = setInterval(function(){
                            tot[idx] += slice[idx];

                            if( tot[idx] > (totLen[idx]*per[idx]) )
                                clearInterval(setId[idx]);

                            $(obj).css({strokeDashoffset:totLen[idx]-tot[idx]});
                            x[idx] = Math.round((tot[idx]/totLen[idx])*100) + '%';
                            $('.name').eq(idx).find('h3').text(x[idx]).css({color:color[idx]});
                            $('.circle').eq(idx).css({stroke:color[idx]});

                        },1000/100);
                    });
                }
        },
        totalFn: function(){

            $(window).scroll(function(){
                if( $(this).scrollTop() >= 100 ){
                    // $(".goTop").stop().fadeIn(1000);
                    $(".goTop, .goHome").stop().addClass('addTop');
                }
                else{
                    // $(".goTop").stop().fadeOut(1000);
                    $(".goTop, .goHome").stop().removeClass('addTop');
                }
            });
        
            $(".goTop-btn, .goHome-btn").on({
                click: function(){
                    $('html,body').stop().animate({scrollTop:0},500);
                }
            });

        }

    };
    
    portfolio.init();

})(window,document,jQuery);