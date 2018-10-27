<template>
    <!-- 我的订单 -->
    <div class="order_box">

        <!-- 订单标题    -->
        <div class="order_title font_16 border_bottom_1">
            <span>我的订单</span>
        </div>

        <!-- 订单搜索 -->
        <div class="order_search padding_left_20 padding_top_20">
            <Input v-model="orderData.orderSearchValue" size="large" placeholder="商品名称/退换货单号" style="width:200px;padding-right:10px;" />
            <Button type="success" size="large" style="background:#00aa88;width:80px;border-radius:2px;" @click="getOrderList">搜索</Button>
        </div>

        <!-- 订单类型切换 -->
        <ul class="order_type padding_left_20 padding_top_30">
            <li :class="[orderData.orderTypeIndex == index ? 'active' : '' ]" v-for="(items, index) in orderData.orderType" :key="index"   
             @click="changeOrderType(index)"  >{{items.text}}</li>
        </ul>

        <!-- 订单list -->
        <div class="order_list_box padding_top_30 padding_bottom_40" v-if="orderData.orderList.length != 0 ">

            <!-- 订单list 头部 -->
            <div class="order_list_header">
                <Row>
                    <Col span="16">
                        <Col span="10"> <div class="text_left padding_left_20">订单信息</div> </Col>
                        <Col span="5"> <span >单价（元）</span> </Col>
                        <Col span="4"> <span >数量</span> </Col>
                        <Col span="5"> <span >实付金额（元）</span> </Col>
                    </Col>
                    <Col span="8">
                        <Col span="12"> <span >交易状态</span> </Col>
                        <Col span="12"> <span >交易操作</span> </Col>
                    </Col>
                </Row>
            </div>

            <div :class="[ orderData.isScroll ? 'order_scroll':'']">

                <!-- 订单list列表 -->
                <ul class="order_list padding_left_20">
                    <li class="order_list_item" v-for="(lists, index1) in orderData.orderList" :key="index1"  v-if="lists.isShow != 1">

                        <!-- 最新普通订单-->
                        <div>
                            <div class="text_left padding_left_20 line_height_50px border_bottom_1 child_span_padding_20">
                                <span>主订单号：<i class="color_666">{{lists.orderCode}}</i></span>
                                <span>{{lists.orderTime}} </span>
                                
                                <span >订单金额：<i class="color_f09105">¥&nbsp;{{lists.orderPayAmount}}</i></span> 
                                <span  v-if="lists.isCombination == '1'">组合包</span>
                            </div>
                            <div v-for="(items, index2) in lists.orderItem" :key="index2" v-if="items.childItem.length > 0">
                                <Row>
                                    <Col span="16">
                                        <div >
                                            <!-- 子订单标题行 -->
                                            <div class="text_left padding_left_20 line_height_60px child_span_padding_20 font_13"  >
                                                <span>子订单号：<i  class="color_666">{{items.itemCode}}</i></span>
                                                <span>{{items.itemTime}} </span>
                                                <span>订单金额：<i>¥&nbsp;{{items.itemAmount}}</i></span> 
                                            </div>
                                            <!-- 商品行 -->
                                            <div class="height_50px font_12" v-for="(childs, index3) in items.childItem" :key="index3">
                                                <Row>
                                                    <Col span="10"> <div class="text_left padding_left_20">
                                                        <div class="item_td">
                                                            <p >
                                                                <span class="twoline_ellipsis" style="color:#666;" :data-product="childs.productCode" >{{childs.title}} {{childs.name}} {{childs.desc}}</span>    
                                                            </p>
                                                        </div>
                                                    </div> </Col>
                                                    <Col span="5"> <div class="item_td"><p>¥&nbsp;{{childs.price}}</p></div></Col>
                                                    <Col span="4"> <div class="item_td"><p>×{{childs.num}}</p></div></Col>
                                                    <Col span="5"> <div class="item_td"><p>¥&nbsp;{{childs.total}}</p></div></Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span="8">
                                        <div >
                                            <!-- 子订单标题行 -->
                                            <div class="line_height_60px" >
                                                <div>
                                                    <Row>
                                                        <Col span="12">
                                                        <!-- 订单状态 -->
                                                        <div v-if="index2 == 0">
                                                            {{ orderData.orderType[parseFloat(lists.orderStatus) + 1].text }} 
                                                        </div>
                                                        </col>
                                                        <Col span="12">
                                                            <!-- 订单主操作 -->
                                                            <!-- 针对整个订单 -->
                                                            <div v-if="index2 == 0">
                                                                <!-- 去支付 -->
                                                                <div class="item_td" v-if="lists.orderStatus == '0'"><p>
                                                                    <Button type="success" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" 
                                                                        @click="jumpPage(lists.orderCode, lists.orderStatus)">去支付
                                                                    </Button> <br> 
                                                                    <Button type="text" shape="circle" 
                                                                        style="width:80px;height:26px;line-height:5px;padding:0" @click="openModel(lists.orderCode, 0)" >取消订单
                                                                    </Button> 
                                                                </p></div>
                                                                <!-- 重新购买  交易取消或交易关闭 -->
                                                                <div class="item_td" v-if="lists.orderStatus == '4' || lists.orderStatus == '5'"><p>
                                                                    <Button type="success" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" 
                                                                        @click="jumpPage(lists.orderCode, lists.orderStatus)">重新购买
                                                                    </Button> <br> 
                                                                    <Button type="text" shape="circle" 
                                                                        style="width:80px;height:26px;line-height:5px;padding:0" @click="openModel(lists.orderCode, 1)" >删除订单
                                                                    </Button> 
                                                                </p></div>
                                                            </div>

                                                        </col>
                                                    </Row>
                                                </div>
                                            </div>
                                            <!-- 商品行 -->
                                            <div class="height_60px" v-for="(childs, index3) in items.childItem" :key="index3">
                                                <div>
                                                    <Row>
                                                        <Col span="12">

                                                            <!-- 组合包 -->
                                                            <div v-if="lists.isCombination != '0'">
                                                                <!-- 评价 组合包交易成功只有一个评价 -->
                                                                <div class="item_td" v-if="lists.orderStatus == '3' && index2 == 0 && index3 == 0"><p>
                                                                    {{ lists.orderCommetStatus == 0 ? '待评价' : '已评价' }}
                                                                </p></div>

                                                            </div>

                                                            <!-- 普通商品 -->
                                                            <div v-else>
                                                                <!-- 评价 普通商品交易成功，每个都有-->
                                                                <div class="item_td" v-if="lists.orderStatus == '3'"><p>
                                                                    {{childs.commetStatus == '2' ? '待评价' : '已评价'}}
                                                                </p></div>
                
                                                            </div>
                                                            <div>&nbsp;</div>

                                                        </Col>
                                                        <Col span="12">

                                                            <!-- 组合包 -->
                                                            <div  v-if="lists.isCombination != '0'">
                                                                <!-- 换货 只要是实质商品都有换货-->
                                                                <div class="item_td" v-if=" (lists.orderStatus == '1' && childs.productProperty == '1' )|| (lists.orderStatus == '2' && childs.productProperty == '1')"><p>
                                                                    <Button type="success" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" 
                                                                        @click="productChange(lists.orderCode, childs.productCode)">换货
                                                                    </Button> <br> 
                                                                </p></div>

                                                                <!-- 评价  组合包交易成功只有一个评价-->
                                                                <div class="item_td" v-if="lists.orderStatus == '3' && index2 == 0 && index3 == 0 && lists.orderCommetStatus == 0"><p>
                                                                        <Button type="success" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" 
                                                                            @click="goComment(lists.orderCode, childs.productCode)">去评价
                                                                        </Button> <br> 
                                                                </p></div>

                                                                <!-- 物流 只要是实质商品都有物流-->
                                                                <div v-if=" (lists.orderStatus == '1' && childs.productProperty == '1' )|| (lists.orderStatus == '2' && childs.productProperty == '1')">
                                                                    <Button type="text" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" 
                                                                        @click="checkLogistics(items.itemCode, items.itemTrackNo, childs.productCode)">查看物流
                                                                    </Button> <br>   
                                                                </div>
                                                            </div>

                                                            <!-- 针对于单个商品 -->
                                                            <div  v-else>
                                                                <!-- 换货 只要是实质商品都有换货-->
                                                                <div class="item_td" v-if=" (lists.orderStatus == '1' && childs.productProperty == '1' )|| (lists.orderStatus == '2' && childs.productProperty == '1')"><p>
                                                                    <Button type="success" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" 
                                                                        @click="productChange(lists.orderCode, childs.productCode)">
                                                                        {{childs.isExchange == 0 ? '换货' : childs.isExchange == 1 ? '申请中' : '已同意'}}
                                                                    </Button> <br> 
                                                                </p></div>
                                                                
                                                                <!-- 评价 普通商品交易成功，每个都有评价-->
                                                                <div class="item_td" v-if="lists.orderStatus == '3' && childs.commetStatus == '2'" ><p>
                                                                        <Button type="success" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" 
                                                                            @click="goComment(lists.orderCode, childs.productCode)">去评价
                                                                        </Button> <br> 
                                                                </p></div>

                                                                <!-- 物流 只要是实质商品都有物流 (orderCode, trackNo, productProfileUrl, productPirce, productNun)-->
                                                                <div v-if=" (lists.orderStatus == '1' && childs.productProperty == '1' )|| (lists.orderStatus == '2' && childs.productProperty == '1')">
                                                                    <Button type="text" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" 
                                                                        @click="checkLogistics(items.itemCode, items.itemTrackNo, childs.productCode)">查看物流
                                                                    </Button> <br>   
                                                                </div>
                                                            </div>      

                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>    
                    </li>
                </ul>
            </div>
            <!-- 订单分页 -->
            <div class="list_page" v-if="orderData.pageData.total > 5 ">
                <Page :total="orderData.pageData.total" :current="orderData.pageData.current"   :page-size="orderData.pageData.pageSize"  
                    @on-change="changeOrderPage" show-total show-elevator />
            </div>

        </div>

        <!-- 没有订单 -->
        <div class="order_has_not" v-if="orderData.orderList.length == 0 ">
            <img src="../../assets/images/image/order_not.png" width="100px" alt="">
        </div>

        <!-- 订单操作弹框 -->
        <Modal v-model="orderModelData.modelValue" width="480" footer-hide >
            <p slot="header" style="background:#f8f8f8;">
                <span class="font_14" style="font-weight:400;">提示</span>
            </p>
            <div class="font_16 padding_top_30 padding_bottom_40 padding_left_10" >{{ orderModelData.modelList[orderModelData.modelState].title }}</div>
            <div style="padding: 30px 0 20px 200px; "> 
                <Button shape="circle" type="success" size="large"  style="background:#00aa88;width:80px;" @click="closeModel">确定</Button>
                <span style="display:inline-block;width:50px;"></span>
                <Button shape="circle" type="success" size="large" style="background:#a5a5a5;width:80px;" @click="orderModelData.modelValue = false">取消</Button>
            </div>
        </Modal>

    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            
             /* 订单数据对象 */
            orderData:{
                // 订单查询值
                orderSearchValue:'',
                // 订单类型下标
                orderTypeIndex: 0,
                // 订单类型
                orderType:[
                    { text: '全部', value: ''},
                    { text: '待付款', value: 0},
                    { text: '已付款', value: 1},
                    { text: '已发货', value: 2},
                    { text: '交易成功', value: 3},
                    { text: '交易取消', value: 4},
                    { text: '交易关闭', value: 5},
                    { text: '订单异常', value: 6},
                    { text: '其他', value: 7},
                ],

                // 订单数据真实数据
                orderList:[],

                // 分页
                pageData:{
                    total: 8,
                    pageSize: 5,
                    current: 1
                },

                // 是否添加滚动
                isScroll: false

            },


            /* 订单操作弹框对象 */
            orderModelData: {
                // 弹框开关
                modelValue: false,
                // 触发的弹框状态  0：取消订单 ， 1：删除订单
                modelState: 0,
                // 弹出框选中的订单
                modelCode:'',
                // 弹框参数
                modelList:[
                    { title: '确定取消该订单吗？'},
                    { title: '确定删除该订单吗？'}
                ]

            },

  
        }
        
    },
    methods: {

        /**订单类型切换**/
        //@param index 获取当前点击的元素下标
        changeOrderType(index){

            this.orderData.orderTypeIndex = index;
            this.orderData.pageData.current = 1
            // 获取订单列表
            this.getOrderList();

        },

        /**订单分页**/
        //@param value 返回当前页码
        changeOrderPage(value){

            this.orderData.pageData.current = value;

            // 获取订单列表
            this.getOrderList();


        },

        //监听订单数量添加滚动事件
        lisionOrderScroll(){

            //当页面订单商品数量大于5条时，就给列表添加滚动
            let n = 0;
            let data = this.orderData.orderList;

            for(let i = 0 ; i < data.length ; i++ ){
                for(let k = 0 ; k < data[i].orderItem.length; k++ ){
                    for(let j = 0 ; j < data[i].orderItem[k].childItem.length; j++ ){
                        n++;
                    }
                }
            }

            if(n > 3){
                return true;
            }
        },

        /**订单提示弹框**/
        // 打开弹框
        // @param code string 获取当前点击的订单单号
        // @param type number 设置打开弹框类型  0 取消订单  1 删除订单
        openModel(code,type){

            this.orderModelData.modelState = type;
            this.orderModelData.modelValue = true;
            this.orderModelData.modelCode = code; 

        },

        // 确认关闭弹框
        closeModel(){

            this.orderModelData.modelValue = false;

            let code = this.orderModelData.modelCode;

            // 取消订单或者删除订单
            this.orderModelData.modelState == 0 ? this.cancelOrderItem(code) : this.deleteOrderItem(code);

        },

        /* 页面跳转 */
        // @param code string 获取当前点击的订单单号
        // @param state string 获取当前点击的订单状态
        jumpPage(code, state){

            // 路由
            let Url = '';
            let param = {};
            var codestr = this.returnCode(code);

            switch(state){
                // 去支付
                case '0':  
                    Url = '/confirmOrder'; 
                    param = {orderCode: code}; 
                    break;              
                case '4':  
                    Url = '/submitOrder'; 
                    param = {productCode:  codestr}; 
                    break;
                case '5':  
                    Url = '/submitOrder'; 
                    param = {productCode:  codestr}; 
                    break;
            }

             this.$router.push({ path: Url, query: param })

        },

        // 重新购买 获取返回订单商品编码
        // @param code string 获取当前点击的订单单号
        returnCode(code){

            let codeStr = '';

            for(let lists of this.orderData.orderList ){

                if(code == lists.orderCode){

                    for(let items of lists.orderItem){

                        for(let childs of items.childItem){

                            codeStr = codeStr == '' ? childs.productCode + '-1'  : ',' + childs.productCode + '-1' ;

                        }
                        
                    }
                }

            }

            return codeStr;
        },

        // 查看物流
        // @param orderCode string 获取当前点击的订单子单号
        // @param trackNo string 获取当前点击的子订单运单单号
        // @param productCode string 商品编号
        checkLogistics(orderCode, trackNo, productCode ){
            this.$router.push({ path: '/personCenter/checkLogistics', query: {orderCode, trackNo, productCode } })
        },

        // 去评论
        // @param orderCode string 获取当前点击的订单子单号
        // @param productCode string 获取当前点击的商品编号
        // @param productProfileUrl string 获取当前点击的商品图片
        // @param productName string 获取当前点击的商品名字
        goComment(orderCode, productCode ){
            this.$router.push({ path: '/personCenter/goComment', query: {orderCode, productCode } })
        },

        /** 数据获取 **/
        // 获取订单列表
        getOrderList(){

            this.$Spin.show()
              
            let param = this.$Qs.stringify({ 
                'pageNo': this.orderData.pageData.current, 
                'pageSize': this.orderData.pageData.pageSize,
                'ciCode': this.$store.state.userData.cicode ,
                'orderStatus': this.orderData.orderType[this.orderData.orderTypeIndex].value,
                'searchKey': this.orderData.orderSearchValue,
                }) ;

            this.$api.getOrderList( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){
                   
                   let data = res.data.content.list , arr = [], merchantArr = [];

                   this.orderData.pageData.total = res.data.content.count;

                   for(let i = 0 ; i < data.length; i++){

                        let orderItem = [];
                        let lists = data[i];
                        
                        // isCombination (string, optional): 是否是组合包 0- 不是 1-是 
                        // isShow (string, optional): 前端显示 0-显示 1-不显示 ,
                        arr.push({
                            orderTime: lists.createDate,
                            orderCode: lists.orderCode,
                            isCombination: lists.isCombination,
                            orderAmount: lists.orderAmount,
                            orderPayAmount: lists.orderPayAmount ,
                            orderStatus: lists.orderStatus,
                            orderCommetStatus: lists.orderCommetStatus ,
                            isShow: lists.isShow,
                            orderItem:[]
                        })

                        // 子订单
                        for( let x = 0 ; x < lists.orderMerchantList.length; x++){

                            let childItem = [];
                            let items = lists.orderMerchantList[x];

                            orderItem.push({
                                itemTime: items.createDate,
                                itemCode: items.orderMerchantCode,
                                itemAmount: items.orderAmount,
                                itemName: items.merchantCode,
                                itemTrackNo: items.trackNo,
                                childItem:[]
                            })

                            // 子订单商品
                            for( let z = 0 ; z < items.orderProductList.length; z++){

                                let child = items.orderProductList[z];
                                // commetStatus (string, optional): 订单评价 1-已评价 2-未评价 
                                // isExchange (string, optional): 换货状态 0-不需要换货 1-申请换货 2-同意换货 ,
                                // orderSource (string, optional): 订单来源 1-PC商城 2-公众号 3-小程序 ,
                                childItem.push({
                                    title: child.productInfo.productTitle,
                                    name: child.productName,
                                    desc: child.descConsist,
                                    productCode: child.productCode,
                                    price: child.productPrice,
                                    num: child.productCount,
                                    productProperty: child.productProperty,
                                    commetStatus: child.commetStatus ,
                                    isExchange: child.isExchange,
                                    productProfileUrl: child.productInfo.productProfileUrl,
                                    total: (parseFloat(child.productPrice * 10000) * child.productCount)/10000
                                })

                            }

                            orderItem[x].childItem = childItem;

                        }

                        arr[i].orderItem = orderItem;
                   }

                   this.orderData.orderList = arr;

                   this.orderData.isScroll = this.lisionOrderScroll();

                }else{

                    this.$Message.warning(res.data.message);

                }

                this.$Spin.hide()

            })
            .catch((error) => {

                this.$Spin.hide();
                console.log('发生错误！', error);

            });
        },
        // 删除订单
        // @param orderCode string 订单编号
        deleteOrderItem(orderCode){

            this.$Spin.show()
              
            let param = this.$Qs.stringify({ 'orderCode': orderCode }) ;

            this.$api.hideOrder( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    this.$Message.success(res.data.message);
                    this.getOrderList();
                   
                }else{

                    this.$Message.warning(res.data.message);

                }

                this.$Spin.hide()

            })
            .catch((error) => {

                this.$Spin.hide();
                console.log('发生错误！', error);

            });
        },
        // 取消订单
        // @param orderCode string 订单编号
        cancelOrderItem(orderCode){

            this.$Spin.show()
              
            let param = this.$Qs.stringify({ 'orderCode': orderCode }) ;

            this.$api.cancleOrder( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    this.$Message.success(res.data.message);
                    this.getOrderList();
                   
                }else{

                    this.$Message.warning(res.data.message);

                }

                this.$Spin.hide()

            })
            .catch((error) => {

                this.$Spin.hide();
                console.log('发生错误！', error);

            });
        },
        // 换货
        // @param orderCode string 获取当前点击的订单单号
        // @param productCode string 获取当前点击的商品编号
        productChange(orderCode, productCode){
            this.$Spin.show()
              
            let param = this.$Qs.stringify({ 
                'ciCode': this.$store.state.userData.cicode , 
                'productCode': productCode, 
                'orderCode': orderCode
                }) ;

            this.$api.orderProductExchange( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    // 获取订单列表
                    this.getOrderList();
                   
                }else{

                    this.$Message.warning(res.data.message);

                }

                this.$Spin.hide()

            })
            .catch((error) => {

                this.$Spin.hide();
                console.log('发生错误！', error);

            });  
        },  

    },
    mounted(){

        // 获取订单列表
        this.getOrderList();

    }
}
</script>

<style>
     .ivu-modal .ivu-modal-header {
        border-bottom:0;
        padding: 0 16px;
        height:30px;
        line-height: 40px;
        background: #f8f8f8;
    }  
    .ivu-modal .ivu-modal-content{
        border-radius: 0;
    }
    .ivu-modal-close .ivu-icon-ios-close{
        top:-5px;
    } 
    .ivu-icon-ios-close:before{
        content: "\F178";
    }

</style>

<style scoped lang='less'>

    //引入订单共用less文件
    @import '../shopCart/shopCart.less'; 

    // 订单类型
    .order_type{

        >li{
            display: inline-block;
            height: 38px;
            line-height: 38px;
            width: 80px;
            text-align: center;
            cursor: pointer;
            
            &:hover, &.active{
                background: @color_00aa88;
                color:#fff;
            }
            
        }
    }

    // 订单list
    .order_list_box{
        color: #929292;

        // 头部
        .order_list_header{
            height: 52px;
            line-height: 52px;
            border: 1px solid @color_e6e6e6;
            background: #f5f5f5;
            margin: 0 20px;

            span{
                display: block;
                text-align: center;
                font-size: 14px;
            }
            .text_left{
                text-align: left;
                padding-left:20px;
            }

        }

        // 列表
        .order_list{

            >li{
                min-height: 90px;
                border-bottom: 1px solid @color_e6e6e6;
                // background: @color_fafafa; 
                text-align: center;
                .item_td{
                    display: table;
                    width:100%;
                    min-height: 90px;

                    p{
                        display:table-cell;
                        vertical-align:middle;
                        line-height:1.5;
                        width:100%;
                        position: relative;
                    }
                }
                .text_left{
                    text-align: left;
                }
            }
        }
        // 订单分页
        .list_page{
            float: right;
            padding-right:20px;
            padding-top:30px;
        }
        &:after{
            display: block;
            content: '';
            clear: both;
        }
    }
    // order为空判断
    .order_has_not{
        padding:150px 0;
        text-align: center;
        img{
            width: 260px;
        }
    }
    // order滚动设置
    .order_scroll{
        height: 450px;
        width: 100%;
        overflow-y: scroll;
    }
    
    .child_span_padding_20 > span{
        padding-right:20px;
        display: inline-block;
    }
    .child_span_padding_20 > span:nth-child(1){
        width: 250px;
    }
    .child_span_padding_20 > span:nth-child(2){
        width: 170px;
    }
    .child_order{
        font-size: 13px;
    }

    
</style>
