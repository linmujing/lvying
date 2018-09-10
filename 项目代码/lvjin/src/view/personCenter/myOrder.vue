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
            <Button type="success" size="large" style="background:#00aa88;width:80px;border-radius:2px;" >搜索</Button>
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
                    <Col span="8"> <span class="text_left">订单信息</span> </Col>
                    <Col span="4"> <span >单价（元）</span> </Col>
                    <Col span="4"> <span >实付金额（元）</span> </Col>
                    <Col span="4"> <span >交易状态</span> </Col>
                    <Col span="4"> <span >交易操作</span> </Col>
                </Row>
            </div>

            <div :class="[ lisionOrderScroll() ? 'order_scroll':'']">
                <!-- 订单list列表 -->
                <ul class="order_list padding_left_20 padding_right_20">
                    <li class="order_list_item" v-for="(items, index) in orderData.orderList" :key="index" v-if="index < 5" :style="{height: 90 * items.items.length + 'px' }">
                        <Col span="16"> 
                            <div v-for="(item, index2) in items.items" :key="index2">
                                <Col span="12"> 
                                    <div class="item_td padding_left_20 text_left">
                                        <p>
                                            {{item.startTime}} <span>订单号：{{item.orderId}}</span><br>
                                            <span class="text_ellipsis" style="color:#666;display:inline-block;width:300px;" :title="item.title">{{item.title}}</span>

                                        </p>
                                    </div>
                                </Col>
                                <Col span="6"><div class="item_td"><p>{{item.price}}</p>    </div> </Col>
                                <Col span="6"><div class="item_td"><p>{{item.total}}</p></div> </Col>
                            </div>

                        </Col>
                        <Col span="4"> 
                            <div class="item_td">
                                <p :style="{height: 90 * items.items.length + 'px' }">
                                {{items.payStateText}} <br>
                                <Button type="text" shape="circle" v-if="items.payStateText == '待发货'" 
                                    style="width:80px;height:26px;line-height:5px;padding:0" @click="checkLogistics" >查看物流</Button>
                                </p>
                            </div>
                        </Col>
                        <Col span="4"> 
                            <div class="item_td">
                                <p :style="{height: 90 * items.items.length + 'px' }">
                                    <Button type="success" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" 
                                        v-if="items.payStateText != '待付款'" @click="jumpPage(index)">{{items.operation}}</Button>

                                    <!-- 待付款取消订单 -->
                                    <Button type="warning" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" 
                                        v-if="items.payStateText == '待付款'" @click="jumpPage(index)">{{items.operation}}</Button>
                                    <Button type="text" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0"
                                    v-if="items.payStateText == '待付款'" @click="openModel(index)" >取消订单</Button>

                                    <!-- 已关闭删除订单 -->
                                    <Button type="text" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0"
                                    v-if="items.payStateText == '已关闭'" @click="openModel(index)" >删除订单</Button>
                                </p>
                            </div>
                        </Col>
                    </li>
                </ul>
            </div>
            <!-- 订单分页 -->
            <div class="list_page" v-if="orderData.orderList.length > 5 ">
                <Page :total="orderData.pageData.total" :current="orderData.pageData.current"   :page-size="orderData.pageData.pageSize"  
                    @on-change="changeOrderPage" size="small" show-total show-elevator />
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
                    { text: '待付款', value: ''},
                    { text: '已付款', value: ''},
                    { text: '待发货', value: ''},
                    { text: '待收货', value: ''},
                    { text: '待评价', value: ''},
                    { text: '退款中', value: ''},
                    { text: '已评价', value: ''},
                    { text: '已关闭', value: ''},
                    { text: '已成功', value: ''},
                ],
                // 订单数据
                orderList:[
                    {
                        payState: '',
                        payStateText: '待付款',
                        operation: '去支付',
                        routerUrl:'personCenter/checkLogistics',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            startTime: '2018-08-51 16:00:00',
                            orderId: '2018080511600',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                        },
                        {
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            startTime: '2018-08-51 16:00:00',
                            orderId: '2018080511600',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                        }],
                    },
                    {
                        payState: '',
                        payStateText: '已关闭',
                        operation: '重新购买',
                        routerUrl:'personCenter/checkLogistics',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            startTime: '2018-08-51 16:00:00',
                            orderId: '2018080511600',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                        }],
                    },
                    {
                        payState: '',
                        payStateText: '待评价',
                        operation: '去评价',
                        routerUrl:'personCenter/goComment',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            startTime: '2018-08-51 16:00:00',
                            orderId: '2018080511600',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                        }],
                    },
                    {
                        payState: '',
                        payStateText: '待发货',
                        operation: '退款',
                        routerUrl:'personCenter/refundMoney',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            startTime: '2018-08-51 16:00:00',
                            orderId: '2018080511600',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                        }],
                    },
                    {
                        payState: '',
                        payStateText: '已付款',
                        operation: '待发货',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            startTime: '2018-08-51 16:00:00',
                            orderId: '2018080511600',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                        }],
                    },
                    {
                        payState: '',
                        payStateText: '待发货',
                        operation: '待收货',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            startTime: '2018-08-51 16:00:00',
                            orderId: '2018080511600',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                        }],
                    },
                    {
                        payState: '',
                        payStateText: '已成功',
                        operation: '去支付',
                        items:[{
                            title: '法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程法律顾问课程',
                            startTime: '2018-08-51 16:00:00',
                            orderId: '2018080511600',
                            price: '100.00',
                            number: '1',
                            total: '100.00',
                        }],
                    }
                ],
                // 分页
                pageData:{
                    total: 7,
                    pageSize: 5,
                    current: 1
                }

            },

            /* 订单操作弹框对象 */
            orderModelData: {
                // 弹框开关
                modelValue: false,
                // 触发的弹框状态  0：取消订单 ， 1：删除订单
                modelState: 0,
                // 弹框参数
                modelList:[
                    { title: '确定取消该订单吗？'},
                    { title: '确定删除该订单吗？'}
                ]

            }

            
        }
        
    },
    methods: {

        /**订单类型切换**/
        //@param index 获取当前点击的元素下标
        changeOrderType(index){

            this.orderData.orderTypeIndex = index;

        },

        /**订单分页**/
        //@param value 返回当前页码
        changeOrderPage(value){

            this.orderData.pageData.current = value;

        },
        //监听订单数量添加滚动事件
        lisionOrderScroll(){

            //当页面订单商品数量大于5条时，就给列表添加滚动
            let n = 0;
            let data = this.orderData.orderList;

            for(let i = 0 ; i < data.length ; i++ ){
                for(let k = 0 ; k < data[i].items.length; k++ ){
                    n++;
                }
            }

            if(n > 5){
                return true;
            }
        },

        /**订单功能弹框**/
        // 确定
        //@param index 获取当前点击的元素下标
        openModel(index){

            if( this.orderData.orderList[index].payStateText == "待付款" ){

                this.orderModelData.modelState = 0;

            }else{

                this.orderModelData.modelState = 1;

            }

            this.orderModelData.modelValue = true;

        },
        // 关闭
        closeModel(){

            this.orderModelData.modelValue = false;

        },

        /* 页面跳转 */
        //@param index 获取当前点击的元素下标
        jumpPage(index){
            console.log(index)
            // 路由
            let Url = this.orderData.orderList[index].routerUrl;
            let param = {};

            switch(this.orderData.orderList[index].payStateText){

                case '待付款':  param = {state: 'a'}; break;
                case '已关闭':  param = {state: 'b'}; break;
                case '待发货':  param = {state: 'a'}; break;
            }

            this.$router.push({ name: Url, params: param })

        },
        // 查看物流
        checkLogistics(){
            this.$router.push({ name: 'personCenter/checkLogistics', params: {state: 'c'}})
        }
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
                background: @color_fafafa; 
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

    
</style>
