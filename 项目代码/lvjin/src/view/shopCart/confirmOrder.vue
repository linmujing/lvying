<template>
    <!-- 提交订单页面 -->
    <div class="bg_f5 padding_top_30 padding_bottom_80" >
        <div class="box_center_1200" >

            <!-- 订单部分 -->
            <div class="shopping_cart_container" style="position:relative;">
                <div class="list_box" >

                    <!-- 订单列表头部 #submitType#-->
                    <div class="list_header padding_left_14" :style="{background: submitType ? '#fafafa':''}">
                        <Row>
                            <Col span="4"><div style="height:1px;"></div></Col>
                            <Col span="7"><span>课程名称</span></Col>
                            <Col span="5"><span class="block_center">单价（元）</span></Col>
                            <Col span="6"><span class="block_center">数量</span></Col>
                            <Col span="2"><span class="block_center">小计（元）</span></Col>
                        </Row>
                    </div>

                    <!-- 订单列表 -->
                    <ul class="list_content" v-for="(items, index1) in cartDate.cartList" :key="index1">
                        <li>
                            <div class="item_title padding_left_14"> {{items.itemTitle}} </div>
                            <ul class="item_list">
                                <!-- 列表 #submitType# 调整背景色-->
                                <li class="padding_left_14" v-for="(item, index2) in items.items" :key="index2" v-bind:class="[ submitType ? '':'active']">
                                    <Row>
                                        <Col span="4">
                                            <span class="item_list_img pointer" @click="goDetail(item.productCode, item.productProperty)">
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
                                        <Col span="5"><span class="block_center">¥ {{item.price}}</span></Col>
                                        <Col span="6"><span class="block_center">×{{item.num}}</span></Col>
                                        <!-- 小计 -->
                                        <Col span="2"><span class="block_center">¥ {{ (item.num * item.price).toFixed(2)  }}</span></Col>
                                    </Row>
                                </li>
                            </ul>
                            <div class="item_total padding_right_24" v-bind:class="[ submitType ? '':'active']">小计： ¥ {{items.itemTotal}}</div>
                            <!-- 其他操作  -->
                            <div class="item_shipping_methods padding_left_14" >
                                <span style="display:inline-block;width:100px;">配送方式：</span>
                                <span>
                                    <el-select v-model="shippingMethods.value" size="mini" placeholder="请选择">
                                        <el-option
                                        v-for="(item, index) in shippingMethods.options"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </span>
                            </div>
                        </li>
                    </ul>

                    <!-- 组合包优惠券 -->
                    <div class="item_shipping_methods padding_left_14" >

                        <span style="display:inline-block;width:100px;">优惠券：</span>   
                        <el-select v-model="Coupon.value"  size="mini" :placeholder="Coupon.options.length > 0 ? '请选择' : '没有优惠券'"  @change="onCouponChange"  :disabled='Coupon.options.length > 0 ? false : true' >
                            <el-option
                            v-for="(item,index) in Coupon.options"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                    <!-- 其他操作 -->
                    <div class="list_operate padding_left_14" >
                        <div class="all_total padding_right_24">
                            <h4>总计：<b class="font_16"> ¥ {{cartDate.listTotal}} </b></h4>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 提交订单块 -->
            <div class="sumbit_block">
                <div class="padding_right_24 font_18">实付金额：<b class=""> ¥ {{cartDate.listTotal}}</b></div>
                <p class="padding_right_24"><Button shape="circle" type="warning" size="large" @click="submitOrderClick">提交订单</Button></p>
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

            /*提交订单页面类型*/
            //  true  :  确定订单页面 解释：当页面为去结算提交时，可以修改数量，可以选择地址
            //  false :   解释：可以选择优惠券
            submitType: false,

            /*订单数据*/
            cartDate:{
                // 固定价格
                allTotal: 0.00,
                // 总价格
                listTotal: 0.00,
                // 大列表
                cartList: []
            },

            // 配送方式
            shippingMethods:{
                value: '快递包邮',
                options:[]
            },

            // 优惠券
            Coupon:{
                value: '',
                options:[]
            },

            // 用户信息
            userData: {
                ciCode: this.$store.state.userData.cicode,
                phone:  this.$store.state.userData.ciphone
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
        // 监听优惠券改变
        onCouponChange(){

            if(this.Coupon.value != '' || this.Coupon.value != '暂无可用优惠券'){

                this.getOrderCouponTotal();

            }else{

                this.Coupon.value = '暂无可用优惠券'
            }

        },
        /*订单提交*/
        submitOrderClick(){

            localStorage.setItem("orderCode", this.$route.query.orderCode );
            localStorage.setItem("listTotal", this.cartDate.listTotal );
            // 去结算页面
            this.$router.push({ name: 'shopGoPay' })

        },

        /*点击打开详情*/
        //@param code 商品编号
        //@param attr 商品属性1-实物，2-音频 3-视频 4-文档 包含多个使用逗号链接
        goDetail(code, attr){
            console.log(attr)
          var arr = attr;
          if(attr.indexOf(',') != -1){ attr = attr.split(',') }
          // 包含多个跳转到动态管控详情页
          if(arr.length > 1  || arr == '4'){
            this.$router.push({
              path:'/industryDynamicDetail',
              query: {
                productCode: code,
                // hasBuy 购买后跳转过去的状态
                hasBuy: 1
              }
            })
          }else {
            // 1-实物，2-音频 3-视频
            switch (attr) {
              case '1':
                this.$router.push({
                  path:'/bookDetail',
                  query: {
                    productCode: code
                  }
                })
                break
              case '2':
                this.$router.push({
                  path:'/videoCourseDetail',
                  query: {
                    productCode: code,
                    // typeId 单独只有音频或视频时需传的参数 typeId：4-音频 3-视频
                    typeId: 4,
                    hasBuy: 1
                  }
                })
                break
              case '3':
                this.$router.push({
                  path:'/videoCourseDetail',
                  query: {
                    productCode: code,
                    typeId: 3,
                    hasBuy: 1
                  }
                })
                break
            }
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

                    this.cartDate.listTotal = (res.data.content.orderPayAmount).toFixed(2);
                    this.cartDate.allTotal = (res.data.content.orderPayAmount).toFixed(2);

                    // 获取订单可用优惠券
                    this.getOrderCoupon();

                }else{

                    this.$Message.warning(res.data.message);

                }

            })
        },
        // 获取订单可用优惠券
        getOrderCoupon(){

            let param = this.$Qs.stringify({ 'ciCode': this.userData.ciCode, 'orderCode': this.$route.query.orderCode ,'orderAmount': this.cartDate.allTotal }) ;

            this.$api.getOrderCoupon( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content , arr = [];

                    for(let item of data){

                        arr.push({ value: item.couponCode, label: item.couponInfo.couponTitle })
                    }

                    this.Coupon.options = arr;

                }else{

                    this.$Message.warning(res.data.message);

                }

            })

        },
        // 获取选择优惠券后的价格
        getOrderCouponTotal(){

            let param = this.$Qs.stringify({ 'couponCode': this.Coupon.value, 'orderCode': this.$route.query.orderCode ,'orderAmount': this.cartDate.listTotal }) ;
            console.log(param)
            this.$api.getOrderCouponAmount( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content ;

                    this.cartDate.listTotal = (res.data.content).toFixed(2);

                }else{

                    this.$Message.warning(res.data.message);

                    this.Coupon.value = '暂无可用优惠券'

                    this.cartDate.listTotal =this.cartDate.allTotal;

                }

                this.$Spin.hide();

            })

        },

    },

    mounted(){

        // 获取订单详情
        this.getOrderProduct(this.$route.query.orderCode);

    }
}
</script>
<style scoped>

    .ivu-modal .ivu-modal-content{
        border-radius: 0;
    }
    .ivu-modal-close .ivu-icon-ios-close{
        top:5px;
    }
    .el-input--mini .el-input__inner{
        color: #f09105;
    }
    .el-select-dropdown__item.selected{
        color: #f09105;
    }
</style>
<style scoped lang='less'>

    // 引入订单共用less文件
    @import './shopCart.less';


    /**订单地址**/
    .order_address{
        background:#fff;

        .address_add{
            height: 120px;
            line-height: 120px;
            text-align: center;
        }
        .address_btn{
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
                    margin-right: 10px;
                    vertical-align: middle;

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
                }
            }
        }
    }

    /**订单容器**/
    .shopping_cart_container{
        margin-top:20px;
        background:#fff;

        //  订单盒子
        .list_box{
            margin: 0 16px;

            //  头部
            .list_header{
                height: 60px;
                line-height: 60px;

                *{
                    color: @color_666;
                }
            }

            //  订单列表
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
                    width: 100px;
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

            //  订单列表操作
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
