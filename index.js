
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
                return '<li class="ms-elem-selectable" data-id="'+item.id+'"><img style="width:50px;vertical-align: middle;margin-right: 10px;" src="'+item.owner.avatar_url+'">'+item.full_name+'</li>';
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
