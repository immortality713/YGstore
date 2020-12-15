define(['jlazyload'], () => {
    return {
        init: function() {
            //渲染+懒加载
            const $list = $('.like-ul');
            const $bnlist = $('.banner li');
            const $cartlist = $('.cartlist');
            const $items = $('.item');
            $bnlist.hover(function() {
                $cartlist.show();
                $(this).addClass('active').siblings('li').removeClass('active');
                //切换内容发生改变，不同的li对应不同的内容块。
                $items.eq($(this).index()).show().siblings('.item').hide();

                //改变右侧的大盒子的位置
                let $scrolltop = $(window).scrollTop();
                let $bannertop = $('.banner').offset().top;
                if ($scrolltop > $bannertop) {
                    $cartlist.css({
                        top: $scrolltop - $bannertop
                    });
                } else {
                    $cartlist.css({
                        top: -79,
                        left: 180
                    });
                }
            }, function() {
                $cartlist.hide();
                // $bnlist.removeClass('active')
                $(this).removeClass('active');

            });

            //2.鼠标移入右侧的大盒子，大盒子依然显示隐藏
            $cartlist.hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
            });

            $.ajax({
                url: 'http://10.31.161.51/dashboard/peojectname/php/index-li.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}">
                                <img class="lazy" data-original="${value.url}" width="224" height="224"/>
                                <p class='like-u-p1'>${value.title}</p>
                                <p class='like-u-p2'>￥${value.price}</p>
                            </a>
                        </li>
                    `;
                });
                $list.html($strhtml);
                //渲染的下面进行懒加载操作
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });

        }
    }
});