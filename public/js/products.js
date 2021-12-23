
let product_list = document.querySelector('#products')
const btnCart = document.querySelectorAll('.btn-cart-add')
let filter_col = document.querySelector('#filter-col')

document.querySelector('#filter-toggle').addEventListener('click', () => filter_col.classList.toggle('active'))

document.querySelector('#filter-close').addEventListener('click', () => filter_col.classList.toggle('active'))

// let size;

// $(document).ready(function(){
//     $("input[type='radio']").click(function(){
//         size = $("input[name='size']:checked").val();
//     });
// });

$(".btn-cart-add").click(function (e) {
    e.preventDefault();
    const productid = $(this).attr("value");
    // $.ajax({
    //     async: false,
    //     type: "POST",
    //     url: `/cart/${productid}`,
    //     contentType: "application/x-www-form-urlencoded",
    //     datatype: "html",
    //     data: {size: size},
    //     success: function (response) {
    //         console.log(response);
    //         $('.cart-count').html(`(${curCount + 1})`);
    //     },
    //     error: function (response) {
    //         console.log(response);
    //     }
    // })

    $.post(`/cart/${productid}/`, {}, function (data, status) {
        if (data.msg === "success") {
            const curCount = parseInt($('.cart-count').html());
            $('.cart-count').html(`(${curCount + 1})`);
        }
    });

    if($(this).hasClass('disable')){
        return false;
    }
    $(document).find('.btn-cart-add').addClass('disable');
    
    const parent = $(this).parents('.product-card');
    const src = parent.find('img').attr('src');
    const cart = $(document).find('.cart-btn');

    const parentTop = $(this).offset().top;
    const parentLeft = $(this).offset().left;

    $('<img/>', {
        class: 'flying-product',
        src: src,
    }).appendTo('body').css({
        'top': parentTop,
        'left': parentLeft,
    });

    setTimeout(function () {
        $(document).find('.flying-product').css({
            'top': cart.offset().top,
            'left': cart.offset().left,

        })
        setTimeout(function () {
            $(document).find('.flying-product').remove();
            let citem = parseInt($(document).find('.cart-count').data('count')) + 1;
            $(document).find('.cart-count').text(citem).data('count', citem);
            $(document).find('.btn-cart-add').removeClass('disable')
        }, 990)
    }, 500)
});