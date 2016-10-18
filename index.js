

        var $goodsSelect=$('#goods_select');
        var goodsSelect= $.goodsSelect({
            id:$goodsSelect,
            title:'git仓库',
            placeholder: "请输入git仓库",
            url: "//api.github.com/search/repositories?",//查询接口请求的URL
            paramsName:'q',//get方法的参数名字
            responseData:function(data){  //处理请求返回的data，return一个数组
                var arr=[];
                if (data['total_count']) {
                    return arr = data['items'];
                } 
            },
            setLi:function(item){
                return '<li class="ms-elem-selectable" data-id="'+item.id+'"><img src="'+item.owner.avatar_url+'">'+item.full_name+'</li>';
            },
            keyIdName:'id', //接口中返回的唯一标识主键名称,例如：item中是lSupplierSkuId
            selectData:false,  //已选数据，必须是jQuery元素，li标签;没有时不填或填false
            onConfirm:function(){  //点击确定后的回调函数，由于li的模板是用户自己定义的，所以这个回调函数也会很好写,data是所有入参对象
                $goodsSelect.find('.select_confirm').on('click', function() {
                    $('.select_goods_mask').hide();
                    $goodsSelect.hide();

                    //填充到页面上
                    var selectHtml= $goodsSelect.find('.ms-selection').find('.ms-list').html();
                    $('.select_ul').html(selectHtml);
                });
            }
        });

        $('.js_select').on('click',function(){
            goodsSelect.show();
        });



        //第二个，测试一个页面中有多处用到组件
        // var $goodsSelect2=$('#goods_select2');
        // var goodsSelect2= $.goodsSelect({
        //     id:$goodsSelect2,
        //     title:'测试2',
        //     placeholder: "请输入测试名称2",
        //     url: "//fenxiao.midea.com/dealer/coupon/getGoodsInfo",//查询接口请求的URL
        //     setLi:function(item){
        //         return '<li class="ms-elem-selectable" data-id="'+item.lSkuId+'" lSupplierSkuId="'+item.lSupplierSkuId+'" supplyId="'+item.nSupplierId+'"><span class="goods_total_num">('+item.nSameSpuCount+')</span>'+item.strDisSkuTile+'</li>';
        //     },
        //     keyIdName:'lSkuId', //接口中返回的唯一标识主键名称,例如：item中是lSupplierSkuId
        //     selectData:$goodsSelect2.find('.ms-selection').find('.ms-elem-selectable'),  //已选数据，必须是jQuery元素，li标签;没有时不填或填false
        //     onConfirm:function(){  //点击确定后的回调函数，由于li的模板是用户自己定义的，所以这个回调函数也会很好写,data是所有入参对象
        //         $goodsSelect2.find('.select_confirm').on('click', function() {
        //             $('.select_goods_mask').hide();
        //             $goodsSelect2.hide();

        //             //填充到页面上
        //             var selectHtml= $goodsSelect2.find('.ms-selection').find('.ms-list').html();
        //             $('.select_ul2').html(selectHtml);
        //         });
        //     }
        // });

        // $('.js_select2').on('click',function(){
        //     goodsSelect2.show();
        // });
  

       
    


