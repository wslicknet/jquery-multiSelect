define('sherry_test', function(require, exports, module) {
    var jQuery = $ = require("jquery");
     require("sherry_test01");



    exports.init = function() {

        /**
         * 说明：selected-elem是左边全选之后的样式，可以自己定义。
         *
         */

        var $goodsSelect1=$('#goods_select1');
        var goodsSelect= $.goodsSelect({
            id:$goodsSelect1,
            title:'测试',
            placeholder: "请输入测试名称",//
            url: "//fenxiao.midea.com/dealer/coupon/getGoodsInfo",//查询接口请求的URL
            setLi:function(item){
                return '<li class="ms-elem-selectable" data-id="'+item.lSkuId+'" lSupplierSkuId="'+item.lSupplierSkuId+'" supplyId="'+item.nSupplierId+'"><span class="goods_total_num">('+item.nSameSpuCount+')</span>'+item.strDisSkuTile+'</li>';
            },
            keyIdName:'lSkuId', //接口中返回的唯一标识主键名称,例如：item中是lSupplierSkuId
            selectData: $goodsSelect1.find('.ms-selection').find('.ms-elem-selectable'),  //已选数据，必须是jQuery元素，li标签;没有时不填或填false
            onConfirm:function(){  //点击确定后的回调函数，由于li的模板是用户自己定义的，所以这个回调函数也会很好写。
                $goodsSelect1.find('.select_confirm').on('click', function() {
                    $('.select_goods_mask').hide();
                    $goodsSelect1.hide();

                    var selectHtml= $goodsSelect1.find('.ms-selection').find('.ms-list').html();
                    $('.select_ul').html(selectHtml);
                });
            }
        });

        $('.js_select').on('click',function(){
            goodsSelect.show();
        });



        //第二个，测试一个页面中有多处用到组件
        var $goodsSelect2=$('#goods_select2');
        var goodsSelect2= $.goodsSelect({
            id:$goodsSelect2,
            title:'测试2',
            placeholder: "请输入测试名称2",
            url: "//fenxiao.midea.com/dealer/coupon/getGoodsInfo",//查询接口请求的URL
            setLi:function(item){
                return '<li class="ms-elem-selectable" data-id="'+item.lSkuId+'" lSupplierSkuId="'+item.lSupplierSkuId+'" supplyId="'+item.nSupplierId+'"><span class="goods_total_num">('+item.nSameSpuCount+')</span>'+item.strDisSkuTile+'</li>';
            },
            keyIdName:'lSkuId', //接口中返回的唯一标识主键名称,例如：item中是lSupplierSkuId
            selectData:$goodsSelect2.find('.ms-selection').find('.ms-elem-selectable'),  //已选数据，必须是jQuery元素，li标签;没有时不填或填false
            onConfirm:function(){  //点击确定后的回调函数，由于li的模板是用户自己定义的，所以这个回调函数也会很好写,data是所有入参对象
                $goodsSelect2.find('.select_confirm').on('click', function() {
                    $('.select_goods_mask').hide();
                    $goodsSelect2.hide();

                    //填充到页面上
                    var selectHtml= $goodsSelect2.find('.ms-selection').find('.ms-list').html();
                    $('.select_ul2').html(selectHtml);
                });
            }
        });

        $('.js_select2').on('click',function(){
            goodsSelect2.show();
        });
    };

});

