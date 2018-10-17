<template>
    <!-- 去支付页面 -->
    <div class="bg_f5 padding_top_30 padding_bottom_80">
        <div class="box_center_1200">

            <!-- 订单部分 -->
            <div class="shopping_cart_container padding_bottom_40">
                <div class="list_box" >

                    <!-- 确认订单信息提示-->
                    <div class="padding_top_30 font_14" >
                        <div  style="line-height:30px;">
                            <div>请在24小时内完成支付</div> 
                            <div class="padding_bottom_20"><span> 超过24小时再支付可能会导致购买失败，需重新下单购买</span> </div>
                            <div class="relative" style="line-height:50px;" ><span> 实付金额：<i class="color_f09105">{{cartDate.listTotal}}</i></span> <s class="line"></s></div>
                        </div>
                        <p class="font_16 pointer" style="line-height:80px;" @click="hideShowDetail = !hideShowDetail">订单详情 <i :class="[hideShowDetail ? 'triangle_up':'triangle_down']"></i></p>
                    </div>

                    <!-- 订单列表头部-->
                    <div class="list_header padding_left_14" style="background:#fafafa;" v-if="hideShowDetail" >
                        <Row>
                            <Col span="4"><div style="height:1px;"></div></Col>
                            <Col span="7"><span>商品名称</span></Col>
                            <Col span="11"><span class="block_center">数量</span></Col>
                            <Col span="2"><span class="block_center">小计（元）</span></Col>
                        </Row>
                    </div>
                    
                    <!-- 订单列表 -->
                    <ul class="list_content" v-for="(items, index1) in cartDate.cartList" :key="index1" v-if="hideShowDetail">
                        <li>
                            <div class="item_title padding_left_14"> {{items.itemTitle}} </div>
                            <ul class="item_list">
                                <!-- 列表-->
                                <li class="padding_left_14" v-for="(item, index2) in items.items" :key="item.id" >
                                    <Row>
                                        <Col span="4">
                                            <span class="item_list_img">
                                                <img :src="item.imgSrc">
                                            </span>
                                        </Col>
                                        <Col span="7">
                                            <Row>
                                                <Col span="24">
                                                    <div class="item_list_describe">
                                                        <p>{{item.productTitle}}</p>
                                                        <p v-html="item.describe"></p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span="11"><span class="block_center">{{item.num}}</span></Col>
                                       
                                        <!-- 小计 -->
                                        <Col span="2"><span class="block_center">{{items.itemTotal}}</span></Col>
                                    </Row>
                                </li>
                            </ul>
                            <div class="item_total padding_right_24" >小计： {{items.itemTotal}}</div>
                            <!-- 其他操作 -->
                            <div class="item_shipping_methods padding_left_14" >
                                <span style="display:inline-block;width:100px;"> 配送方式： </span>快递包邮
                            </div>

                            <div class="item_shipping_methods padding_left_14" >
                                <span style="display:inline-block;width:100px;"> 优惠券：</span>活动活动
                            </div>
          
                        </li>
                    </ul>

                    <!-- 其他操作-->
                    <div class="list_operate padding_left_14" v-if="hideShowDetail">
                        <div class="all_total padding_right_24">
                            <h4>总计：<b class="font_16"> {{cartDate.listTotal}} </b></h4>
                        </div>
                    </div>

                    <!-- 支付方式 -->
                    <div class="pay_type padding_left_14">
                        <div class="padding_top_10">支付方式</div>
                        <div class="pay_type_list padding_top_30" >
                            <img  :class="[item.id == payTypeData.payTypeValue ? 'active':'']" v-for="(item, index ) in payTypeData.payType" 
                            :key="item.id" :src="item.url"  @click="payTypeData.payTypeValue = index" alt="" >
                        </div>
                        <div  class="padding_top_50" > 
                            <Button shape="circle" type="warning" size="large" style="width:110px;" @click="submitOrderClick">去支付</Button>
                            <span class="pay_msg" ><img src="../../assets/images/icon/pay_msg.png" alt=""><i>下单后请在24小时内完成支付, 超过24小时再支付可能会导致购买失败，需重新下单购买。</i></span>
                        </div>
                        <div class="padding_top_30">
                            <Checkbox v-model="payTypeData.single"> </Checkbox> 
                            <span style="display:inline-block;padding-left:5px;vertical-align:middle;" >我已经同意并阅读并同意<i class="color_f09105">《法律课堂用户付费协议》</i></span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            /*订单数据*/
            cartDate:{
                //全部列表状态
                listState: false,
                //总价格
                listTotal: 0.00,
                //大列表
                cartList:[]
            }, 
            
            // 商品列表
            cartList:[
                {
                    index1: 0,
                    itemState: false,
                    itemTitle: '机构法院',
                    itemTotal: 0.00,
                    shippingMethods: '快递免邮',
                    //小列表
                    items:[
                        {
                            index2: 0,
                            state: false,
                            price: 88.01,
                            num: 1,
                            describe: '我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字',
                            validityPeriod: '永久有效',
                            imgSrc: require('../../assets/images/image/cart_book.png')
                        },
                        {
                            index2: 1,
                            state: false,
                            price: 101.01,
                            num: 1,
                            describe: '我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，',
                            validityPeriod: '永久有效',
                            imgSrc: require('../../assets/images/image/cart_book.png')
                        }
                    ]
                },
                {
                    index1: 0,
                    itemState: false,
                    itemTitle: '机构法院',
                    itemTotal: 0.00,
                    shippingMethods: '快递免邮',
                    //小列表
                    items:[
                        {
                            index2: 0,
                            state: false,
                            price: 88.01,
                            num: 1,
                            describe: '我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，',
                            validityPeriod: '永久有效',
                            imgSrc: require('../../assets/images/image/cart_book.png')
                        },
                        {
                            index2: 1,
                            state: false,
                            price: 101.01,
                            num: 1,
                            describe: '我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，',
                            validityPeriod: '永久有效',
                            imgSrc: require('../../assets/images/image/cart_book.png')
                        }
                    ]
                }
            ],

            // 是否隐藏商品详情
            hideShowDetail: true,
            
            //支付方式
            payTypeData:{
                payTypeValue: 0,
                single:false,
                payType:[
                    { id: 0, url: require("../../assets/images/image/pay_type_01.png") },
                    { id: 1, url: require("../../assets/images/image/pay_type_02.png") },
                    { id: 2, url: require("../../assets/images/image/pay_type_03.png") }
                ],
            },

            /*个人信息*/
            userData: {
                ciCode: '',
                phone: '',
            },
            
        }
        
    },
    methods: {

        /*订单数据计算*/    
        // 计算小计与合计
        calculatePrice(){

            // 获取商品个数
            let m = this.cartDate.cartList.length;

            // 计算小计
            for(let x = 0 ; x < m ; x++){

                let n = this.cartDate.cartList[x].items.length;

                // 重置小计
                this.cartDate.cartList[x].itemTotal = 0;

                for(let i = 0 ; i < n ; i++){
                    
                    let item = this.cartDate.cartList[x].items[i];

                    this.cartDate.cartList[x].itemTotal += item.num * (item.price * 10000);

                }

                this.cartDate.cartList[x].itemTotal = (this.cartDate.cartList[x].itemTotal / 10000).toFixed(2);

            }

            

            this.$Spin.hide()

        },

        /*订单提交*/   
        submitOrderClick(){
            
            if(this.payTypeData.single){

                switch(this.payTypeData.payTypeValue){

                    // 阿里支付
                    case 0:
                    this.aliPayRequest();
                    break;

                }

            }else{

                this.$Message.warning('请仔细阅读付费协议！');

            }
        },

        /**数据**/
        // 获取订单详情商品数据
        // param orderCode string 订单编号
        getOrderProduct(orderCode){

            this.$Spin.show();

            let param = this.$Qs.stringify({ 'pageNo': 1, 'pageSize': 20 ,'orderCode': orderCode }) ;

            this.$api.getOrderProductList( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content.list , arr = [], merchantArr = [];

                    for(let i = 0 ; i < data.length; i++){

                        let index = merchantArr.indexOf(data[i].merchantInfo.merchantNm) ;

                        console.log(index)

                        if( index == -1  ){ 

                            merchantArr.push(data[i].merchantInfo.merchantNm);

                            // 压入商户
                            arr.push({
                                id: '',
                                itemState: false,
                                itemTitle: data[i].merchantInfo.merchantNm,
                                itemCode: data[i].merchantInfo.merchantCode,
                                itemTotal: 0.00,
                                //小列表
                                items:[]
                            });

                            index = merchantArr.indexOf(data[i].merchantInfo.merchantNm);

                            // 压入商品
                            arr[index].items.push({
                                cartId: data[i].id,
                                productCode: data[i].productCode,
                                state: false,
                                price: data[i].productPrice,
                                num: data[i].productCount,
                                productTitle: data[i].productInfo.productTitle,
                                describe:data[i].productInfo.productDesc,
                                imgSrc: data[i].productInfo.productProfileUrl
                            })

                        }else{

                            // 压入商品
                            arr[index].items.push({
                                cartId: data[i].id,
                                productCode: data[i].productCode,
                                state: false,
                                price: data[i].productPrice,
                                num: data[i].productCount,
                                productTitle: data[i].productInfo.productTitle,
                                describe:data[i].productInfo.productDesc,
                                imgSrc: data[i].productInfo.productProfileUrl
                            })

                        }

                    }

                    // 压入到购物车
                    this.cartDate.cartList = arr;

                    // 计算小计与合计
                    this.calculatePrice();

                    // 获取订单详情 获取订单金额
                    this.getOrderDetail();

                }else{

                    this.$Message.warning(res.data.message);

                }

                this.$Spin.hide();

            })
            .catch((error) => {

                this.$Spin.hide();
                console.log('发生错误！', error);

            });
        },
        // 获取订单金额
        getOrderDetail(){

            this.$api.getOrderInfo( this.$Qs.stringify({'orderCode': this.$route.query.orderCode }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    this.cartDate.listTotal = res.data.content.orderPayAmount;

                }else{

                    this.$Message.warning(res.data.message);

                }

            })
        },

        /**支付**/
        // 阿里支付
        aliPayRequest(){

            let param = this.$Qs.stringify({ 'orderCode': this.$route.query.orderCode, 'truePayMoney': this.cartDate.listTotal ,'ciCode': this.userData.ciCode , 'payCommet': '' }) ;

            this.$api.aliPayRequest( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    location.href = res.data.content;

                }else{

                    this.$Message.warning(res.data.message);

                }

            })
        },
        // 阿里支付回调
        aliPayBack(){

            let param = this.$Qs.stringify({ 'orderCode': this.$route.query.orderCode, 'truePayMoney': this.cartDate.listTotal ,'ciCode': this.userData.ciCode , 'payCommet': '' }) ;

            this.$api.aliPayNotify( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    

                }else{

                    this.$Message.warning(res.data.message);

                }

            })

        }


    },
    mounted(){

        // 获取用户信息
        this.userData.ciCode = this.$store.state.userData.cicode ;
        this.userData.phone = this.$store.state.userData.ciphone ;

        // 获取订单详情
        this.getOrderProduct(this.$route.query.orderCode);

    }  
    
}
</script>

<style scoped lang='less'>

    //引入订单共用less文件
    @import './shopCart.less'; 

    /**订单容器**/ 
    .shopping_cart_container{
        background:#fff;

        // 订单盒子
        .list_box{
            margin: 0 16px;
            
            // 头部
            .list_header{
                height: 60px;
                line-height: 60px;

                *{
                    color: @color_666;
                }
            }
            .line{
                position: absolute;
                bottom: 0;
                left:-16px;
                width:1200px;
                border-bottom:1px solid @color_e6e6e6;
            }
            .triangle_up{
                width:0;
                height:0;
                border-width:0 8px 8px;
                border-style:solid;
                border-color:transparent transparent #333;/*透明 透明  灰*/
                position:relative;
                top:-13px;
                left:5px;
            }
            .triangle_down{
                width:0;
                height:0;
                border-width:8px 8px 0;
                border-style:solid;
                border-color:#333 transparent transparent;/*灰 透明 透明 */
                position:relative;
                top:13px;
                left:5px;
            }
            // 订单列表
            .list_content{
                padding-bottom:10px;

                .item_title{
                    height: 40px;
                    line-height: 40px;
                }
                .item_list>li{
                    line-height: 140px;
                    border:1px solid @color_e6e6e6;
                    border-bottom:0;
                }
                .item_list>li.active{
                    border:0;
                    border-bottom:1px solid @color_e6e6e6;
                    background: #fafafa
                }
                .item_list_img{
                    display: inline-block;
                    width:100px;
                    text-align: center;
                }
                .item_list_img img{
                    vertical-align: middle;
                    height: 100px;
                    width: 100px;
                }
                .item_list_describe{
                    display:table;
                    height:140px;
                    overflow: hidden;

                    p{
                        display:table-cell;
                        vertical-align:middle;
                        line-height:1.5;
                    }
                }
                .item_total{
                    height:60px;
                    line-height: 60px;
                    text-align: right;
                    border:1px solid @color_e6e6e6;
                    background:#fafafa;
                }
                .item_total.active{
                    border:0;
                    border-bottom:1px solid @color_e6e6e6;
                    background:#fff;
                }
                .item_coupon{
                    color: @color_f09105;
                }
                .item_shipping_methods{
                    height: 60px;
                    line-height: 60px;
                    border-bottom:1px solid @color_e6e6e6;
                }
                *{
                    color: @color_333;
                }
            }

            // 订单列表操作
            .list_operate{
                height: 70px;
                line-height: 70px;

                .all_total{
                    text-align: right;

                    b{
                        color: @color_f09105;
                    }
                }
            }

            // 支付方式
            .pay_type{
                height: 300px;
                background:#fffcef;
                border:1px solid @color_e6e6e6;
                border-radius: 4px;
                
                .pay_type_list img{
                    display: inline-block;
                    margin-right:64px;

                }
                .pay_type_list img:hover{
                    box-shadow: 1px 1px 4px @color_f09105;
                    cursor: pointer;
                }
                .pay_type_list img.active{
                    box-shadow: 1px 1px 4px @color_f09105;
                }
                .pay_msg{
                    position: relative;
                    top: 8px;
                    img{
                        margin-right:5px;
                        margin-left:20px;
                        position: relative;
                        top: 4px;
                    }
                }
            }
        }
    }
    
</style>
