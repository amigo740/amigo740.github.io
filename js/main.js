"use strict";

let Menu = function ( _obj ) {

    let _showBtn = document.querySelector( '.site__header-open' ),
        _hideBtn = document.querySelector( '.site__header-close' ),
        _body = document.body,
        _forbidHide = false,
        _opened = false;

    let _hide = function() {
            _opened = false;
            _obj.classList.remove('opened');
        },
        _hideMenu = function() {

            if( _opened ){
                _hide();
            }

        },
        _show = function() {
            _opened = true;
            _obj.classList.add('opened');
        },
        _addEvents = function() {

            _showBtn.addEventListener("click", {

                handleEvent: function (e) {
                    e.stopPropagation();
                    _show();
                    _forbidHide = true;
                    setTimeout( function() {
                        _forbidHide = false;
                    }, 100 );
                    return false;
                }

            } );

            _hideBtn.addEventListener("click", {

                handleEvent: function (e) {
                    e.stopPropagation();
                    _hide();
                    return false;
                }

            } );

            _obj.addEventListener("click", {

                handleEvent: function (e) {
                    e.stopPropagation();
                }

            } );

            _body.addEventListener("click", {

                handleEvent: function () {

                    if( _opened ){
                        _hide();
                    }

                }

            });

            window.addEventListener('resize', _hideMenu);

        },
        _init = function() {

            _addEvents();

        };

    _init();

};

let Page = function (_obj){

    let _increase = _obj.querySelector( '.site__increase' ),
        _footer = _obj.querySelector( '.site__footer' );

    let _calculateFooterHeight = function(){
            _increase.style.height = _footer.offsetHeight+'px';
        },
        _addEvents = function (){
            window.addEventListener('resize', _calculateFooterHeight);
            window.addEventListener('load', _calculateFooterHeight);
        },
        _init = function (){
            _calculateFooterHeight();
            _addEvents();
        };

    _init();

};

let ProductsPreview = function (_obj){

    let _swiper;

    let _initSwiper = function (){

            _swiper = new Swiper(".products-preview__swiper", {
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<div class="' + className + '">' +
                                '<div class="products-preview__inner">' +
                                    '<img src="'+ productsPreviewConfig[index]['icon'] +'" alt="" class="products-preview__icon">' +
                                    '<div class="products-preview__name">'+ productsPreviewConfig[index]['name'] +'</div>' +
                                    '<div class="products-preview__txt">'+ productsPreviewConfig[index]['text'] +'</div>' +
                                '</div>' +
                            '</div>';
                    },
                },
            });

        },
        _init = function (){
            _initSwiper();
            _swiper.autoplay.start();
        };

    _init();

};

document.querySelectorAll('.site__header-wrap').forEach( function(item) {
    new Menu(item);
} );

document.querySelectorAll('.site').forEach( function(item) {
    new Page(item);
} );

document.querySelectorAll('.products-preview').forEach( function(item) {
    new ProductsPreview(item);
} );