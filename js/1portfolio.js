;(function(window,document,$,undefined){

    var portfolio = {
        init:   function(){
            var that = this;

            that.headerFn();
            that.section1Fn();
            that.section2Fn();
            that.section3Fn();

        },
        headerFn: function(){
            var that = null;
            var _window = $(window);
            var _header = $('#header');
            var _nav = $('#nav');
            var _menuBar = $('.menu-bar');
            var _mainBtn = $('.main-btn');
            var _sub = $('.sub');
            var _section2 = $('#section2');
            var _htmlBody = $('html,body');
            var _scroll = false;
            var t = false;
            var m = 0;
            var s = -1;
            var topPos = 84;

            var _wheelE = $('.wheelE');
            var _section9 = $('#section9');
            var _footer = $('#footer');
            var _wheelDelta = null;
            var n = _wheelE.length;

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

                _window.scroll(function(){
                    that = $(this);
                    if( that.scrollTop() >= 30 ){
                        _scroll = true;
                        _header.addClass('addH');
                        if( t === false ){
                            t=true;
                            var headerH = $('#header').height();
                            _htmlBody.stop().animate({ scrollTop: _section2.offset().top-headerH },600,'easeInOutExpo');
                        }
                    }
                    else{
                        t=false;
                        _scroll = false;
                        if( m===0 ){
                            _header.removeClass('addH');
                        }
                    }
                });

                _window.resize(function(){
                    resizeFn();
                });

                function resizeFn(){

                    if( _window.innerWidth() > 1024 ){
                        topPos = 84;
                        _nav.stop().show(0).animate({top:(s*topPos)},300);
                    }
                    else if( _window.innerWidth() > 780 ){
                        topPos = 84;
                        _nav.stop().show(0).animate({top:(s*topPos)},300);
                    }
                    else{
                        topPos = 0;
                        _sub.stop().slideDown(0);
                        _nav.stop().animate({top:0},0);
                        if(m==1){
                            _nav.stop().show(0);
                            $('html').removeClass('addScroll');
                        }
                        else{
                            _nav.stop().hide(0);
                            $('html').removeClass('addScroll');
                        }
                    }
                }
                _nav.stop().hide(0);
                setTimeout(resizeFn,10);

                //네비게이션 이벤트
                _menuBar.on({
                    click: function(e){
                        e.preventDefault();
                        if(m==0){
                            m = 1;
                            s = 1;
                        }
                        else{
                            m = 0;
                            s = -1;
                        }
                        resizeFn();
                        $(this).toggleClass('addBtn');
                    }
                });

                //메인버튼 이벤트
                _mainBtn.on({
                    mouseenter: function(){
                        if( _window.innerWidth() > 780 ){
                            _sub.stop().slideUp(100);
                            $(this).next('.sub').stop().slideDown(300);
                        }
                    }
                });

                //서브메뉴 사라지는 효과 이벤트
                //#nav 를 떠나면 사라짐
                _nav.on({
                    mouseleave: function(){
                        _sub.stop().slideUp(300);
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
            var _smoothBtn = $('#main #section1 .smooth-btn');
            var _section1 = $('#main #section1');
            var _title2 = $('#main #section1 .title2 span');
            var _title3 = $('#main #section1 .title3 span');
            var _portfolio = $('#main .portfolio');
            var _portfolioCon = $('#main .portfolio .container');
            var _htmlBody = $('html,body');
            var setId = null;
            var setId2 = null;
            var _second = 4;
            var tCnt = 0;

                //스무스 버튼
                _smoothBtn.on({
                    click: function(e){
                        e.preventDefault();
                        var headerH = $('#header').height();
                        var url = $(this).attr('href');
                        _htmlBody.stop().animate({ scrollTop: $(url).offset().top-headerH },600,'easeInOutExpo');
                    }
                });

                var winW = _win.width();
                var winH = _win.height();
                
                    function resizeFn(){
                        winW = _win.width();
                        winH = _win.height();

                        _section1.css({width:winW,height:winH});
                        _portfolio.css({width:winW});
                        
                        // if( winW > 1170 ){
                        //     _portfolioCon.css({height:winH-387});                            
                        // }
                        // else{
                        //     _portfolioCon.css({height:'auto'});

                        // }

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
        }

    };
    
    portfolio.init();

})(window,document,jQuery);