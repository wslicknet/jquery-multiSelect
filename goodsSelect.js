
    var GoodsSelect=function(options){
        this.options= $.extend({},GoodsSelect.defaults,options);
        this._init();
    };

    GoodsSelect.prototype={

        _init:function(){

            this.$modLayer=this.options.id;
            this.$selectable=this.$modLayer.find('.ms-selectable');
            this.$selection=this.$modLayer.find('.ms-selection');
            this.$countNum=this.$modLayer.find('.ms-count-num');
            this.num=this.$countNum.text(); //已选的数量
            this.inputEle=this.$modLayer.find('.search_box_input');
            this.leftIdArr=[]; //左边，全部数据的ID数组
            this.rightIdArr=[];//右边，已选数据的ID数组

            this.$modLayer.find('.mod_layer_tit').text(this.options.title);
            this.$modLayer.find('.search_box_input').attr('placeholder',this.options.placeholder);

            this._getData();

            this._search();

            this._action();

            this.confirm();

            this.cancel(); //这个是不是也可以考虑写成回调函数

            if(typeof this.options.onConfirm == 'function'){
                this.options.onConfirm(this);
            }
        },

        _getData:function(){
            var opts=this.options;

            var self = this;
            self.rightIdArr=[]; //初始化已选数据数组

            if(opts.selectData){ //如果有已选数据，初始化已选框
                self.$selection.find('.ms-list').html(opts.selectData);
                self.num=self.$selection.find('.ms-elem-selectable').length;
                self.$countNum.text(self.num);
                opts.selectData.each(function(){
                    self.rightIdArr.push($(this).data('id'));
                });
            }

            this._getAjaxData();
        },

        _getAjaxData:function(){
            var self = this;
            var opts=this.options;
            var strhtml = '',liHtml='';
            var inputTxt = $.trim(this.inputEle.val());
            $.ajax({
                url:opts.url,
                type: 'post',
                data: { q: inputTxt},
                timeout: 10000,
                dataType: 'json',
                success: function(data) {
                    var arr=opts.responseData(data);
                    if (arr.length) {
                        strhtml = '<li class="ms-count"><input type="checkbox"  class="li_ck_all"><span>全选</span><span class="li_add">添加</span></li>';
                        for (var i = 0; i < arr.length; i++) {
                            if($.inArray(arr[i][opts.keyIdName],self.rightIdArr) == -1){ //过滤已选择的元素
                                self.leftIdArr.push(arr[i][opts.keyIdName]);
                                liHtml=opts.setLi(arr[i]);
                                strhtml +=liHtml;
                            }
                        }

                    }else{
                        strhtml = '<li class="ms-elem-none" value="none" disabled>没有查询到相关数据</li>';
                    }

                    self.$selectable.find('.ms-list').html(strhtml);
                },
                error:function(){
                    strhtml = '<li class="ms-elem-none" value="none" disabled>没有查询到相关数据</li>';
                    self.$selectable.find('.ms-list').html(strhtml);
                }
            });
        },

        _search:function(){
            var self = this;
            this.$modLayer.find('.li_search').on('click',function(){
                self._getAjaxData();
            });
        },

        _action:function(){
            var self = this;

            this.$selectable.on('click', '.ms-elem-selectable', function() {  //单个添加
                var _this=$(this);
                var thisId=_this.data('id');
                if($.inArray(thisId,self.rightIdArr) == -1){ //只有右边没有时，才添加到右边
                    self.$selection.find('.ms-list').append(_this.clone().removeClass('selected-elem'));
                    _this.remove();
                    ++self.num;
                    self.$countNum.text(self.num);
                    self.rightIdArr.push(thisId);
                    self.leftIdArr.splice(self.leftIdArr.indexOf(thisId),1);
                }

            });

            this.$selection.on('click', '.ms-elem-selectable', function() {   //单个删除
                var _this=$(this);
                var thisId=_this.data('id');
                if($.inArray(thisId,self.leftIdArr) == -1) { //只有左边没有时，才添加到左边
                    self.$selectable.find('.ms-list').append(_this.clone());
                    self.leftIdArr.push(thisId);
                }
                _this.remove();
                --self.num;
                self.$countNum.text(self.num);
                self.rightIdArr.splice(self.rightIdArr.indexOf(thisId),1);

            });

            this.$selectable.on('click', '.li_ck_all', function() {  //全选
                if ($(this).is(':checked')) {
                    self.$modLayer.find('.li_add').show();
                    self.$selectable.find('.ms-elem-selectable').each(function() {
                        $(this).find('i').addClass('add');
                        $(this).addClass('selected-elem');
                    });
                } else {
                    self.$modLayer.find('.li_add').hide();
                    self.$selectable.find('.ms-elem-selectable').each(function() {
                        $(this).find('i').removeClass('add');
                        $(this).removeClass('selected-elem');
                    });
                }
            });

            this.$selectable.on('click', '.li_add', function() { //全部添加
                var $selectableList=$(this).closest('.ms-list');
                var $selectionList=self.$selection.find('.ms-list');

                $selectableList.find('.ms-elem-selectable').each(function(){
                    var $itemSelectable=$(this);
                    var thisId=$itemSelectable.data('id');
                    if($.inArray(thisId,self.rightIdArr) == -1) { //只有右边没有时，才添加到右边
                        $selectionList.append($itemSelectable.clone().removeClass('selected-elem'));
                        ++self.num;
                        $itemSelectable.remove();
                        self.rightIdArr.push(thisId);
                        self.leftIdArr.splice(self.leftIdArr.indexOf(thisId),1);
                    }

                });
                self.$countNum.text(self.num);
                self.$modLayer.find('.li_add').hide();
                self.$modLayer.find('.li_ck_all').prop('checked',false);
            });


        },
        show:function(){
            this.layer = $('<div class="select_goods_mask select_cancel" id="selectMask" />').css({
                position: 'fixed',
                left: 0,
                top: 0,
                height: '100%',
                width: '100%',
                background: '#000',
                opacity: '0.2',
                zIndex: 999
            }).appendTo('body');

            this.layer.show();
            this.$modLayer.show();

        },
        confirm:function(){
            var self=this;
            this.$modLayer.find('.select_confirm').on('click', function() {
                //确定之后更新selectData的数据,便于取消后恢复原状
                self.options.selectData=self.$modLayer.find('.ms-selection').find('.ms-elem-selectable');

            });
        },
        cancel:function(){  //取消，恢复最近“确定”时的数据
            var self=this;
            this.$modLayer.find('.select_cancel').on('click',function(){
                self._getData();
                $('.select_goods_mask').hide();
                self.$modLayer.hide();
            });
        }

    };

    GoodsSelect.defaults={
        id:$('#goods_select1'),  //浮层
        title:'商品',  //浮层的title，例如“商品”、“人员”等
        placeholder: "请输入商品名称",
        url: "//fenxiao.midea.com/dealer/coupon/getGoodsInfo", //返回的数据必须是{errcode:0;data:[]}
        paramsName:'goodsName',//get方法的参数名字
        responseData:function(data){  //处理请求返回的data，return一个数组
            var arr=[];
            if (data.code === 0) {
                return arr = data.data[0];
            } 
        },
        setLi:function(item){  //data-id属性标识唯一的li，必须有，且唯一
            return '<li class="ms-elem-selectable" data-id="'+item.lSkuId+'" lSupplierSkuId="'+item.lSupplierSkuId+'" supplyId="'+item.nSupplierId+'"><span class="goods_total_num">('+item.nSameSpuCount+')</span>'+item.strDisSkuTile+'<i></i></li>';
        },
        onConfirm:function(){  //点击确定后的回调函数

        },
        keyIdName:'lSkuId', //data-id的value值,用来标识唯一的li
        selectData:false  //已选数据，必须是jQuery元素，li标签;没有时不填或填false

    };

    window.GoodsSelect = GoodsSelect;

    $.goodsSelect=function(options){
        return new GoodsSelect(options);
    };


