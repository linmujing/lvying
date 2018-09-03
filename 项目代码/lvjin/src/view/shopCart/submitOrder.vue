<template>
    <div class="box_center_1200">

        <!-- 订单地址 #submitType#-->
        <div class="order_address" v-if="!submitType">

            <!-- 添加地址 -->
            <!-- <div class="address_add"><span class="address_btn" @click="addressData.addressModelValue = true"> <img src="../../assets/images/icon/address_add.png" alt=""> <i>添加收货地址</i> </span></div> -->

            <!-- 地址列表 -->
            <div class="address_box">
                <Row>
                    <Col span="3"><span class="block_center address_box_title">收件人信息：</span></Col>
                    <Col span="21">
                    <div style="display:inline-block;position:relative;">
                        <ul class="address_box_list">
                            <li v-for="(items, index1) in addressData.addressList" :key="items.id">
                                <Row class="address_li_top">
                                    <Col span="12"><span>{{items.name}}</span> </Col>
                                    <Col span="12" class="text_right"><span >{{items.phone}}</span></Col>
                                </Row>
                                <p class="twoline_ellipsis">{{items.content}}</p>
                                <span class="address_li_adit">编辑</span>
                            </li>
                        </ul>
                        <span  class="address_btn" style="position:absolute;right:-120px;bottom:0px;" @click="addressData.addressModelValue = true"> <img src="../../assets/images/icon/address_add.png" alt=""> <i>添加收货地址</i> </span>
                    </div>

                        
                    </Col>
                </Row>
            </div>

            <!-- 订单添加地址弹框 -->
            <Modal v-model="addressData.addressModelValue" width="480" footer-hide >
                <div style="height:140px;line-height:140px;font-size:16px;" >
                    <p>确定从购物车中删除所选课程吗？</p>
                </div>
                <div style="padding: 0 0 20px 200px; "> 
                    <Button shape="circle" type="success" size="large" @click="deleteModelOk">确定删除</Button>
                    <span style="width:40px;display:inline-block;"></span>
                    <Button shape="circle" style="background:#a5a5a5;color:#fff;"  size="large" @click="addressData.addressModelValue = false">取消</Button>
                </div>
            </Modal>

        </div>

        <!-- 订单部分 -->
        <div class="shopping_cart_container">
            <div class="list_box" >

                <!-- 确认订单信息提示 #submitType#-->
                <div class="padding_top_30 font_12" v-if="submitType">
                    <div class="padding_bottom_30">
                        <div>手机号：{{personData.phone}}</div> 
                        <div class="padding_bottom_30"><img style="width:14px;position:relative;top:2px;" src="../../assets/images/icon/prompt_icon.png"  alt=""><span> 购买后不支持退款、转让，请确认开课时间或有效期后再提交订单。</span> </div>
                    </div>
                    <p class="font_16" style="line-height:40px;">确认订单信息</p>
                </div>

                <!-- 订单列表头部 #submitType#-->
                <div class="list_header padding_left_14" :style="{background: submitType ? '#fafafa':''}">
                    <Row>
                        <Col span="4"><div style="height:1px;"></div></Col>
                        <Col span="7"><span>课程名称</span></Col>
                        <Col span="3"><span class="block_center">单价（元）</span></Col>
                        <Col span="4"><span class="block_center">数量</span></Col>
                        <Col span="4"><span class="block_center">优惠（元）</span></Col>
                        <Col span="2"><span class="block_center">小计（元）</span></Col>
                    </Row>
                </div>
                
                <!-- 订单列表 -->
                <ul class="list_content" v-for="(items, index1) in cartDate.cartList" :key="items.id">
                    <li>
                        <div v-if="submitType" class="item_title padding_left_14"> {{items.itemTitle}} </div>
                        <ul class="item_list">
                            <!-- 列表 #submitType# 调整背景色-->
                            <li class="padding_left_14" v-for="(item, index2) in items.items" :key="item.id" v-bind:class="[ submitType ? '':'active']">
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
                                                    <p >{{item.describe}}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span="3"><span class="block_center">{{item.price}}</span></Col>
                                    <Col span="4">
                                        <div class="relative">
                                            <!-- 加减数量 -->
                                        <div class="number_add_reduce" >
                                            <span class="reduce"  @click="reduceNumber" onselectstart="return false" :data-index1="index1" :data-index2="index2"
                                            >-</span><b class="number_value">{{item.num}}</b><span class="add" @click="addNumber" onselectstart="return false" 
                                                :data-index1="index1" :data-index2="index2">+</span>
                                        </div> 
                                        </div>
                                        
                                    </Col>
                                    <!-- 优惠券  #submitType#-->
                                    <Col span="4">
                                        <!-- 可选状态 -->
                                        <span class="block_center item_coupon" style="line-height:20px;padding-top:45px;" v-if="submitType">        
                                            <i class="item_coupon" >{{item.itemCoupon}}  </i>                              
                                             <Select v-model="item.itemCoupon" size="small" style="width:100px">
                                                <Option v-for="itemC in item.itemCouponList" :value="itemC.value" :key="itemC.value">{{ itemC.label }}</Option>
                                            </Select>
                                        </span>
                                        <!-- 不可选状态 -->
                                        <span class="block_center item_list_describe" v-if="!submitType">        
                                            <p class="item_coupon" >{{item.itemCoupon}}  </p>                              
                                        </span>
                                    </Col>
                                    <!-- 小计 -->
                                    <Col span="2"><span class="block_center">{{items.itemTotal}}</span></Col>
                                </Row>
                            </li>
                        </ul>
                        <div class="item_total padding_right_24" v-bind:class="[ submitType ? '':'active']">小计： {{items.itemTotal}}</div>
                        <!-- 其他操作  #submitType#-->
                        <div class="item_shipping_methods padding_left_14" v-if="!submitType">配送方式： {{items.shippingMethods}}</div>
                    </li>
                </ul>
                <!-- 其他操作 #submitType#-->
                <div class="list_operate padding_left_14" v-if="!submitType">
                    <div class="all_total padding_right_24">
                        <h4>总计：<b class="font_16"> {{cartDate.listTotal}} </b></h4>
                    </div>
                </div>
            </div>
        </div>

        <!-- 提交订单块 -->
        <div class="sumbit_block">
            <div class="padding_right_24 font_18">实付金额：<b class="">{{cartDate.listTotal}}</b></div>
            <p class="padding_right_24"><Button shape="circle" type="warning" size="large" @click="submitOrderClick">提交订单</Button></p>
        </div>

    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            /*提交订单页面类型*/
            // true  : 去结算提交  解释：当页面为去结算提交时，可以修改数量，可以选择优惠券
            // false : 去结算后修改状态  解释：不可以修改数量，不可以选择优惠券，但是可以选择地址
            submitType: false,

            /*订单数据*/
            cartDate:{
                //全部列表状态
                listState: false,
                //全部删除状态
                listDeleteState: false,
                //总价格
                listTotal: 0.00,
                //大列表
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
                                itemCoupon: '限时优惠券省14元限时优惠券省12元限时优惠券省12元',
                                itemCouponList: [
                                {
                                    value: '限时优惠券省12元',
                                    label: '限时优惠券省12元'
                                },
                                ],

                                
                                imgSrc: require('../../assets/images/image/cart_book.png')
                            },
                            {
                                index2: 1,
                                state: false,
                                price: 101.01,
                                num: 1,
                                describe: '我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，',
                                itemCoupon: '限时优惠券省13元',
                                itemCouponList: [
                                {
                                    value: '限时优惠券省12元',
                                    label: '限时优惠券省12元'
                                },
                                ],
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
                                itemCoupon: '限时优惠券省12元',
                                itemCouponList: [
                                {
                                    value: '限时优惠券省16元',
                                    label: '限时优惠券省16元'
                                },
                                ],
                                imgSrc: require('../../assets/images/image/cart_book.png')
                            },
                            {
                                index2: 1,
                                state: false,
                                price: 101.01,
                                num: 1,
                                describe: '我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，我是多行文字，',
                                itemCoupon: '限时优惠券省18元',
                                itemCouponList: [
                                {
                                    value: '限时优惠券省12元',
                                    label: '限时优惠券省12元'
                                },
                                ],
                                imgSrc: require('../../assets/images/image/cart_book.png')
                            }
                        ]
                    }
                ],
            },   

            /*删除提示弹框对象*/
            modelDate:{
                //弹框开关
                deleteModelValue:false,
                //删除类型  删除单个 = a  删除选中 = b
                deleteType: 'a',
                //下标
                index1:0,
                index2:0
            },

            /*收货地址数据*/
            addressData:{
                //收货地址数据列表
                addressList:[
                {
                    id:'',
                    name:'律师之家',
                    phone:'15874252525',
                    content:'这里是地址，可能会有很多文字，很多文字好多行这里是地址，可能会有很多文字，很多文字好多行'
                }
                ],
                // 收货地址弹框
                addressModelValue: false,
                addressModelData:{

                }

            },

            /*个人信息*/
            personData:{
                phone: '15632145484'
            }
            
        }
        
    },
    methods: {

        /*加减小组件*/
        //加
        addNumber:function(e){

            // 获取商品下标
            let index1 =  e.target.getAttribute("data-index1"), 
                index2 =  e.target.getAttribute("data-index2"); 
            
            this.cartDate.cartList[index1].items[index2].num ++;

            //计算小计与合计
            this.calculatePrice();
        },
        //减
        reduceNumber:function(e){

            // 获取商品下标
            let index1 =  e.target.getAttribute("data-index1"), 
                index2 =  e.target.getAttribute("data-index2"); 

            if (this.cartDate.cartList[index1].items[index2].num<=1){

                this.$Message.warning('受不了啦，宝贝不能再减少啦')

                this.cartDate.cartList[index1].items[index2].num  = 1;

                return;

            }else {

                this.cartDate.cartList[index1].items[index2].num  -= 1

            }

            //计算小计与合计
            this.calculatePrice();

        },

        /*订单数据计算*/    
        //计算小计与合计
        calculatePrice(){

            //获取商品个数
            let m = this.cartDate.cartList.length;

            //计算小计
            for(let x = 0 ; x < m ; x++){
  
                let n = this.cartDate.cartList[x].items.length;

                //重置小计
                this.cartDate.cartList[x].itemTotal = 0;

                for(let i = 0 ; i < n ; i++){
                    
                    let item = this.cartDate.cartList[x].items[i];

                    this.cartDate.cartList[x].itemTotal += item.num * (item.price * 10000);

                }

                this.cartDate.cartList[x].itemTotal = (this.cartDate.cartList[x].itemTotal / 10000).toFixed(2);

            }

            //重置合计
            this.cartDate.listTotal = 0;
            
            //计算合计
            for(let i = 0 ; i < m ; i++){
                
                let item = this.cartDate.cartList[i];

                this.cartDate.listTotal += item.itemTotal *10000;

            }  

            this.cartDate.listTotal = (this.cartDate.listTotal / 10000).toFixed(2);

        },

        /*订单提交*/   
        submitOrderClick(){

        }
        

    }
}
</script>
<style scoped lang='less'>

    //引入订单共用less文件
    @import './shopCart.less'; 

    /**订单地址**/ 
    .order_address{
        margin-top:20px;
        background:#fff;

        .address_add{
            height: 120px;
            line-height: 120px;
            text-align: center;
        }
        .address_btn{
            &:hover{
                cursor: pointer;
                opacity: 0.8;}
            img{
                vertical-align: middle;
                margin-right: 5px;
            }
            i{
                position: relative;
                top: 2px;
            }
        }

        .address_box{
            height:196px;

            .address_box_title{
                padding-top:32px;
            }
            .address_box_list{
                display: inline-block;
                min-width: 320px;
                margin-top:22px;

                >li{
                    display: inline-block;
                    width:300px;
                    height:148px;
                    border:1px solid @color_e6e6e6;
                    padding: 0 12px;
                    border-radius: 4px;
                    box-shadow: 1px 1px 2px @color_e6e6e6;
                    cursor: pointer;
                    position: relative;
                    margin-right:20px;

                    &:hover{
                        box-shadow: 1px 1px 8px @color_e6e6e6;
                    }
                }
                .address_li_top{
                    border-bottom:1px dashed @color_e6e6e6;
                    line-height: 40px;
                }
                p{
                    line-height:20px;
                    margin-top:10px;
                }
                .address_li_adit{
                    position: absolute;
                    right:20px;
                    bottom:10px;
                    transition: 0.5s;

                    &:hover{
                        color: @color_f8cca4;
                    }
                }
            }
        }
    }

    /**订单容器**/ 
    .shopping_cart_container{
        margin-top:20px;
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
                .item_list_img img{
                    vertical-align: middle;
                    height: 100px;
                    width: 80px;
                    margin-left:30px;
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
        }
    }

    /**订单提交**/ 
    .sumbit_block{
        margin-top:20px;
        margin-bottom:80px;
        padding:30px 14px;
        background:#fff;
        text-align: right;
        div{
            line-height: 40px;
            color: @color_333;
            padding-bottom:10px;
        }
        b{
            color: @color_f09105;
        }
    }
    
</style>
