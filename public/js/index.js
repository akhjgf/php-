$(document).ready(function () {
    // 隐藏所有的.two-one元素
    $('.two-one').hide();
    $('.banner-select div').mouseover(function(){
       // 获取鼠标悬停元素的索引
       var index = $(this).index();

       // 显示相应的.two-one元素
       $('.two-one').eq(index).show(); 
    })
    $('.banner-select div,.two-one').mouseout(function(){
        $('.two-one').hide();
    })


});



$(document).ready(function() {
    $('.pho').mouseenter(function() {
        $(this).css('box-shadow', '0px 0px 15px rgb(199, 198, 198)');
    });

    $('.pho').mouseleave(function() {
        $(this).css('box-shadow', 'none');
    });
});
$(document).ready(function() {
    $('.pla').mouseenter(function() {
        $(this).css('color', 'blue');
    });

    $('.pla').mouseleave(function() {
        $(this).css('color', 'black');
    });
});

