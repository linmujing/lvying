<template>
    <!-- 提交订单页面 -->
    <div class="bg_f5 padding_top_30 padding_bottom_80" >
        <div class="box_center_1200" v-show="!addressData.addressPageShow">

            <!-- 订单地址 #submitType#-->
            <div class="order_address" >

                <!-- 添加地址 地址列表为空时展示-->
                <div class="address_add" v-if="addressData.addressList.length == 0"><span class="address_btn" @click="addressData.addressPageShow = true"> <img src="../../assets/images/icon/address_add.png" alt=""> <i>添加收货地址</i> </span></div>

                <!-- 地址列表 -->
                <div class="address_box" v-else>
                    <Row>
                        <Col span="3"><span class="block_center address_box_title">收件人信息：</span></Col>
                        <Col span="21">
                            <div style="display:inline-block;position:relative;">
                                <ul class="address_box_list">
                                    <li v-for="(items, index1) in addressData.addressList" :key="index1">
                                        <Row class="address_li_top">
                                            <Col span="12"><div class="text_ellipsis">{{items.name}}</div> </Col>
                                            <Col span="12" class="text_right"><span >{{items.phone}}</span></Col>
                                        </Row>
                                        <p class="twoline_ellipsis">{{items.province +" " + items.city +" " + items.county +" " + items.addressDetail}}</p>
                                        <span class="address_li_adit text_hover_color" @click="aditAddressItem(index1)" v-if="submitType">编辑</span>
                                    </li>
                                </ul>
                                <span  class="address_btn" style="position:absolute;right:-120px;bottom:0px;" @click="addressData.addressPageShow = true" v-if="submitType"> 
                                    <!-- <img src="../../assets/images/icon/address_add.png" alt="">  -->
                                    <i class="text_hover_color">修改收货地址</i> 
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>

                <!-- 订单添加地址弹框 -->
                <Modal v-model="addressData.addressModelValue" width="680" footer-hide >
                    <p slot="header" style="background:#f8f8f8;">
                        <span class="font_18" style="font-weight:400;">新增收货地址</span>
                    </p>
                    <!-- 地址信息输入框 -->
                    <div class="address_input">
                        <div class="input_box" >
                            <span class="input_box_span" >收件人：</span>
                            <Input v-model.trim="addressData.addressModelData.name"  size="large" clearable style="width: 280px" />
                        </div>
                        <div class="input_box" >
                            <span class="input_box_span" >手机号码：</span>
                            <Input v-model.trim="addressData.addressModelData.phone"  size="large" clearable style="width: 280px" />
                        </div>
                        <div class="input_box" >
                            <span class="input_box_span" >所在地区：</span>
                            <div class="input_box_select" >
                                <el-cascader
                                    v-model="addressValue"
                                    placeholder="请选择所在地区"
                                    :options="cityList"
                                    filterable
                                    style="width: 300px"
                                    @change="handleChange"
                                ></el-cascader>
                            </div>  
                        </div>
                        <div class="input_box" >
                            <span class="input_box_span" >详细地址：</span>
                            <Input v-model.trim="addressData.addressModelData.addressDetail"  size="large" clearable style="width: 480px" />
                        </div>
                    </div>
                    <div style="padding: 30px 0 20px 100px; "> 
                        <Button shape="circle" type="success" size="large" @click="addAddressItem">确认收货地址</Button>
                    </div>
                </Modal>

            </div>

            <!-- 订单部分 -->
            <div class="shopping_cart_container" style="position:relative;">
                <div v-if="!submitType" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:10;"></div>
                <div class="list_box" >

                    <!-- 订单列表头部 #submitType#-->
                    <div class="list_header padding_left_14" :style="{background: submitType ? '#fafafa':''}">
                        <Row>
                            <Col span="4"><div style="height:1px;"></div></Col>
                            <Col span="7"><span>课程名称</span></Col>
                            <Col span="5"><span class="block_center">单价（元）</span></Col>
                            <Col span="6"><span class="block_center">数量</span></Col>
                            <Col span="0"><span class="block_center">优惠（元）</span></Col>
                            <Col span="2"><span class="block_center">小计（元）</span></Col>
                        </Row>
                    </div>
                    
                    <!-- 订单列表  单一商品 -->
                    <ul class="list_content" v-for="(items, index1) in cartDate.cartList" :key="index1" v-if="!isGroup">
                        <li>
                            <div v-if="submitType" class="item_title padding_left_14"> {{items.itemTitle}} </div>
                            <ul class="item_list">
                                <!-- 列表 #submitType# 调整背景色-->
                                <li class="padding_left_14" v-for="(item, index2) in items.items" :key="index2" v-bind:class="[ submitType ? '':'active']">
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
                                        <Col span="5"><span class="block_center">{{item.price}}</span></Col>
                                        <Col span="6">
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
                                        <Col span="0">
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

                    <!-- 订单列表  组合单 -->
                    <ul class="list_content" v-for="(lists, index1) in cartDate.cartList" :key="index1" v-if="isGroup">
                        <li class="padding_left_14" style="line-height:48px;">我是一个组合包</li>
                        <li v-for="(items, index2) in lists.items" :key="index2">
                            <div v-if="submitType" class="item_title padding_left_14"> {{items.itemTitle}} </div>
                            <ul class="item_list">
                                <!-- 列表 #submitType# 调整背景色-->
                                <li class="padding_left_14" v-for="(item, index3) in items.items" :key="index3" v-bind:class="[ submitType ? '':'active']">
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
                                                        <p v-html="item.describe"></p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span="5"><span class="block_center">{{item.price}}</span></Col>
                                        <Col span="6"><span class="block_center">{{item.num}}</span></Col>
                                        <!-- 优惠券  #submitType#-->
                                        <Col span="0">
                                        </Col>
                                        <!-- 小计 -->
                                        <Col span="2"><span class="block_center">{{item.price}}</span></Col>
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
                <p class="padding_right_24"><Button shape="circle" type="warning" size="large" @click="submitOrderClick">{{submitType ? '确认订单' : '提交订单'}}</Button></p>
            </div>

        </div>

        <!-- 地址列表 -->
        <div class="box_center_1200" style="background:#fff;padding:0 0 20px 0;" v-show="addressData.addressPageShow">
            <!-- 标题    -->
            <div class="order_title font_16" >
                <span >选择地址</span>
                <i class="text_hover_color padding_right_20 float_right" @click="addressData.addressPageShow = false" >关闭</i>
            </div>
            <Address :pState="1" @hidebox="listenAddressChoose" ></Address>
        </div>
    </div>
</template>
<script>

import Address from '../../components/Address.vue'
import province from '../../assets/js/province'

export default {
    components : {
        Address
    },
    data() {
        return {

            /*提交订单页面类型*/
            //  true  : 去结算提交  解释：当页面为去结算提交时，可以修改数量，可以选择优惠券
            //  false : 去结算后修改状态  解释：不可以修改数量，不可以选择优惠券，但是可以选择地址
            submitType: false,

            /*订单数据*/
            cartDate:{
                // 全部列表状态
                listState: false,
                // 全部删除状态
                listDeleteState: false,
                // 总价格
                listTotal: 0.00,
                // 大列表
                cartList: []
            }, 

            // 是否为组合包
            isGroup: false,

            /*收货地址数据*/
            addressData:{
                // 地址列表隐藏与展示
                addressPageShow: false,

                // 收货地址数据列表
                addressList:[],
                // 收货地址弹框
                addressModelValue: false,
                // 编辑时地址下标
                aditAddressIndex: 0,
                // 收货地址弹框绑定值
                addressModelData:{
                    name: '' ,
                    phone: '',
                    province: '',
                    city: '',
                    county: '',
                    addressDetail: '',
                    addressCode:''
                }

            },

            // 地址城市列表 new
            cityList: [ { value: '天津',label: '天津' }, ],
            // 选中的城市数组
            addressValue:[],
            
            // 用户信息
            userData: {
                ciCode: '',
                phone: '',
                name:''
            },
            
        }
        
    },
    methods: {

        /*加减小组件*/
        // 加
        addNumber:function(e){

            //  获取商品下标
            let index1 =  e.target.getAttribute("data-index1"), 
                index2 =  e.target.getAttribute("data-index2"); 
            
            this.cartDate.cartList[index1].items[index2].num ++;

            // 计算小计与合计
            this.calculatePrice();
        },
        // 减
        reduceNumber:function(e){

            //  获取商品下标
            let index1 =  e.target.getAttribute("data-index1"), 
                index2 =  e.target.getAttribute("data-index2"); 

            if (this.cartDate.cartList[index1].items[index2].num<=1){

                this.$Message.warning('受不了啦，宝贝不能再减少啦')

                this.cartDate.cartList[index1].items[index2].num  = 1;

                return;

            }else {

                this.cartDate.cartList[index1].items[index2].num  -= 1

            }

            // 计算小计与合计
            this.calculatePrice();

        },

        /*订单数据计算*/    
        // 计算小计与合计
        calculatePrice(){

            // 获取商品个数
            let m = this.cartDate.cartList.length;

            if(!this.isGroup){

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

                // 重置合计
                this.cartDate.listTotal = 0;
                
                // 计算合计
                for(let i = 0 ; i < m ; i++){
                    
                    let item = this.cartDate.cartList[i];

                    this.cartDate.listTotal += item.itemTotal *10000;

                }  

            }else{

                // 组合包
                for(let lists of this.cartDate.cartList){

                    for(let items of lists.items){

                        for(let item of items.items){
                            
                            lists.itemTotal += item.num * (item.price * 10000);
                        }
                    }

                    this.cartDate.listTotal += lists.itemTotal;
                }

            }

            this.cartDate.listTotal = (this.cartDate.listTotal / 10000).toFixed(2);

            this.$Spin.hide()

        },

        /*地址功能块*/
        //  新增地址
        addAddressItem(){

            // 收货地址弹框绑定值
            let modelData =  this.addressData.addressModelData;

            if(modelData.name == ""){
                
                    this.$Message.warning('姓名不能为空！');
                    return ;

            }
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            if(!reg.test(modelData.phone)){
                
                    this.$Message.warning('请输入正确的手机号！');
                    return ;
                    
            }
            if(modelData.province == ""){
                
                    this.$Message.warning('地址不能为空！');
                    return ;
                    
            }
            if(modelData.addressDetail == ""){
                
                    this.$Message.warning('详细地址不能为空！');
                    return ;
                    
            } 

            // 新增地址
            this.addAddressData();

        },
        //  编辑打开地址
        aditAddressItem(){

            let data = this.addressData.addressList[0];
            console.log(data)
            this.addressData.addressModelData = {
                name: data.name ,
                phone: data.phone,
                province: data.province,
                city: data.city,
                county: data.county,
                addressDetail: data.addressDetail,
                addressCode: data.addressCode
            };
            
            this.addressValue = [data.province, data.city, data.county ];

            this.addressData.addressModelValue = true;

        },

        // 监听地址选择
        listenAddressChoose(data){

            this.addressData.addressList = [];
            this.addressData.addressList.push(data);

            this.addressData.addressPageShow = false;

        },

        // 选择城市
        handleChange(value){

            this.addressData.addressModelData.province = value[0];
            this.addressData.addressModelData.city = value[1];
            this.addressData.addressModelData.county = value[2];

        },


        /*订单提交 生成订单*/   
        submitOrderClick(){   
            
            if(this.addressData.addressList.length == 0){
                
                this.$Message.warning("请先填写好订单地址！");
                return;

            }

            this.$Spin.show();

            let param = this.getOrderParam();
            console.log(param)

            this.$api.addOrderInfo(  this.$Qs.stringify(param) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    // 去结算页面
                    this.$router.push({ path: '/confirmOrder', query: { orderCode: res.data.content} })


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
        // 获取创建订单参数
        getOrderParam(){

            let productCodeAndCount = '';

            if(!this.isGroup){

                for(let lists of this.cartDate.cartList){

                    for(let items of lists.items){
    
                            productCodeAndCount +=  productCodeAndCount=='' ? items.productCode + '-'+ items.num : ','+  items.productCode + '-'+ items.num;

                    }

                }
            }else{

                productCodeAndCount =  this.cartDate.cartList[0].productCode + '-'+ this.cartDate.cartList[0].num;

            }

            let param = {
                ciCode: this.userData.ciCode,
                ciName: this.userData.name,
                orderSource: 1,
                orderForm: this.$route.query.sourceType != 'cart' ? 1:0,
                productCodeAndCount: productCodeAndCount,
                addressCode: this.addressData.addressList[0].addressCode,
            }

            return param;
            
        },

        /**获取产品提交订单的数据**/
        // 获取产品详情数据
        getProductDetailData(productCode){

            this.$Spin.show()

            let param = {'productCode': productCode}

            this.$api.getProductInfo(  this.$Qs.stringify(param) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content , arr = [];

                    if (data == null || data.length == 0) { return ;}

                    // 单个商品
                    if(data.productType != '2'){

                        // 压入商户
                        arr.push({
                            id: '',
                            itemState: false,
                            itemTitle: data.merchantNm,
                            itemCode: data.merchantCode,
                            itemTotal: 0.00,
                            //小列表
                            items:[]
                        });

                        // 压入商品
                        arr[0].items.push({
                            id: data.id,
                            productCode: data.productCode,
                            state: false,
                            price: data.productPrice,
                            num: data.productNum,
                            name: data.productName,
                            describe: data.productDesc,
                            imgSrc: data.productProfileUrl
                        })

                    }else{

                        // 组合包商品
                        // 压入组合包
                        arr.push({
                            id: '',
                            itemType: data.productType ,
                            itemState: false,
                            itemTitle: data.productTitle,
                            itemTotal: 0.00,
                            productCode: data.productCode,
                            num: 1,
                            productSubCode: data.productSubCode,
                            //小列表
                            items:[]
                        });

                        // 是否为组合包
                        this.isGroup = true;

                    }

                    // 压入到商品列表
                    this.cartDate.cartList = arr;

                    // 判断是否为组合包
                    this.isGroup ? this.getGroupCartItem() : this.calculatePrice();    

                }else{

                    this.$Spin.hide()
                    this.$Message.warning(res.data.message);  
                    
                }
                

            })
            .catch((error) => {

                this.$Spin.hide();
                console.log('发生错误！', error);

            });
        },
        // 获取多个产品数据
        getProductCartData(productCode){

            let cartString = productCode.split(','), cartCode = [], cartNun = [], codeStr = '';

            for(let item of cartString){

                cartCode.push(item.split('-')[0]);
                cartNun.push(item.split('-')[1]);
                codeStr += codeStr== '' ? item.split('-')[0] : ',' + item.split('-')[0];
            }

            this.$Spin.show()
              
            this.$api.getProductShowCase( this.$Qs.stringify({ 'productCode': codeStr }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let Data = res.data.content ;

                    // 对组合包里的商品进行商户分类
                    let arr2 = [], merchantArr2 = [] ;

                    for(let child of Data){

                        let childIndex = merchantArr2.indexOf(child.merchantCode);

                        if(childIndex == -1){

                            merchantArr2.push(child.merchantCode);

                            arr2.push({
                                id: '',
                                itemTitle: child.merchantNm,
                                itemTotal: 0.00,
                                //小列表
                                items:[]
                            })

                            childIndex = merchantArr2.indexOf(child.merchantCode);

                            // 压入商品
                            arr2[childIndex].items.push({
                                productCode: child.productCode,
                                price: child.productPrice,
                                num: 1, //child.productNum,
                                productTitle: child.productTitle,
                                describe: child.productDesc,
                                imgSrc: child.productProfileUrl
                            })

                        }else{

                            // 压入商品
                            arr2[childIndex].items.push({
                                productCode: child.productCode,
                                price: child.productPrice,
                                num: 1,//child.productNum,
                                productTitle: child.productTitle,
                                describe: child.productDesc,
                                imgSrc: child.productProfileUrl
                            })

                        }

                    } 

                    // 压入到商品列表
                    this.cartDate.cartList = arr2;    
                    this.calculatePrice();        
                   
                }else{

                    this.$Spin.show();

                    this.$Message.warning(res.data.message);

                }

            })
            .catch((error) => {

                this.$Spin.hide();
                console.log('发生错误！', error);

            });

        },
        // 组合包数据加载
        getGroupCartItem(){

            // 获取商品列表一次加载列表
            let CartList = this.cartDate.cartList ;

            for(let i = 0; i < CartList.length; i++ ){

                if(CartList[i].itemType == '2'){

                    // 获取组合包商品
                    this.$api.getProductShowCase( this.$Qs.stringify({ 'productCode': CartList[i].productSubCode }) )

                    .then( (res) => {

                        console.log(res)

                        if(res.data.code == 200){

                            let Data = res.data.content ;

                            // 对组合包里的商品进行商户分类
                            let arr2 = [], merchantArr2 = [] ;

                            for(let child of Data){

                                let childIndex = merchantArr2.indexOf(child.merchantCode);

                                if(childIndex == -1){

                                    merchantArr2.push(child.merchantCode);

                                    arr2.push({
                                        id: '',
                                        itemTitle: child.merchantNm,
                                        itemTotal: 0.00,
                                        //小列表
                                        items:[]
                                    })

                                    childIndex = merchantArr2.indexOf(child.merchantCode);

                                    // 压入商品
                                    arr2[childIndex].items.push({
                                        productCode: child.productCode,
                                        price: child.productPrice,
                                        num: 1, //child.productNum,
                                        productTitle: child.productTitle,
                                        describe: child.productDesc,
                                        imgSrc: child.productProfileUrl
                                    })

                                }else{

                                    // 压入商品
                                    arr2[childIndex].items.push({
                                        productCode: child.productCode,
                                        price: child.productPrice,
                                        num: 1,//child.productNum,
                                        productTitle: child.productTitle,
                                        describe: child.productDesc,
                                        imgSrc: child.productProfileUrl
                                    })

                                }

                            } 

                            CartList[i].items = arr2;

                            this.calculatePrice();
                        
                        }else{

                            this.$Spin.hide()

                            this.$Message.warning(res.data.message);

                        }

                    })

                }
      
            }    

           this.cartDate.cartList = CartList;

        },      

        /**数据**/
        // 获取地址列表
        getAddressData(){

            let param = this.$Qs.stringify({ 'pageNo': 1, 'pageSize': 10 ,'ciCode': this.userData.ciCode }) ;

            this.$api.getAddressList( param )

            .then( (res) => {

                //console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content.list , arr = [];

                    if(data.length == 0){ this.addressData.addressList = []; return ;}

                    if(this.addressData.addressModelData.addressCode == ""){

                        arr.push({
                            addressCode: data[0].addressCode,
                            name:  data[0].addressPersonName,
                            phone:  data[0].addressPhone,
                            province:  data[0].province,
                            city:  data[0].city,
                            county:  data[0].zone,
                            addressDetail:  data[0].address,
                            isDefalut:  data[0].isDefalut,
                        })

                    }else{

                        for(let item of data){

                            if(this.addressData.addressModelData.addressCode == item.addressCode){

                                arr.push({
                                    addressCode: data[0].addressCode,
                                    name:  data[0].addressPersonName,
                                    phone:  data[0].addressPhone,
                                    province:  data[0].province,
                                    city:  data[0].city,
                                    county:  data[0].zone,
                                    addressDetail:  data[0].address,
                                    isDefalut:  data[0].isDefalut,
                                })

                            }

                        }

                    }

                    this.addressData.addressList = arr;

                }else{

                    this.$Message.warning(res.data.message);

                }

            })
            .catch((error) => {

                console.log('发生错误！', error);

            });
        },
        // 新增地址
        addAddressData(){

            // 获取弹框数据
            let data = this.addressData.addressModelData;

            let param = { 
                "ciCode": this.userData.ciCode,
                "addressPersonName":data.name,
                "addressPhone": data.phone,
                "province": data.province,
                "zone": data.county,
                "city": data.city,
                "address": data.addressDetail,
                };

            // 判断是保存还是新增地址
            this.addressData.addOrAdit ? '' : param.addressCode = data.addressCode ;

            this.$api.saveAddress(  this.$Qs.stringify(param) )

            .then( (res) => {

                //console.log(res)

                if(res.data.code == 200){

                    // 获取用户地址列表
                    this.getAddressData();

                    this.$Message.success(res.data.message)

                    this.addressData.addressModelValue = false;

                    this.addressData.addOrAdit = true;

                }else{

                    this.$Message.warning(res.data.message);

                }

                this.addressData.addressModelValue = false;

            })
            .catch((error) => {

                this.$Spin.hide();
                this.addressData.addressModelValue = false;
                console.log('发生错误！', error);

            });

        },


    },

    computed: {
        // 监听地址增删， 及时更新地址
        listenAddressList() {  return this.$store.state.personCenter.addressState  }
    },
    watch: {
        // 监听地址增删
        listenAddressList:function (val){  this.getAddressData()  }
    },
    mounted(){

        // 获取页面类型
        this.submitType = true;//this.$route.params.type;

        // 获取地址信息
        this.cityList = province();

        // 获取用户信息
        this.userData.ciCode = this.$store.state.userData.cicode ;
        this.userData.phone = this.$store.state.userData.ciphone ;
        this.userData.name = this.$store.state.userData.ciname ;

        // 获取用户地址列表
        this.getAddressData();

        // 获取页面数据来源 
        if(this.$route.query.productCode.split(',').length == 1){

            this.getProductDetailData(this.$route.query.productCode);

        }else{

            this.getProductCartData(this.$route.query.productCode);

        }
        

    }
}
</script>
<style >
     .ivu-modal .ivu-modal-header {
        border-bottom:0;
        padding: 10px 16px;
        height:60px;
        line-height: 50px;
        background: #f8f8f8;
    }  
    .ivu-modal .ivu-modal-content{
        border-radius: 0;
    }
    .ivu-modal-close .ivu-icon-ios-close{
        top:5px;
    } 
    .address_input .input_box{
        height:40px;
        line-height:40px;
        font-size:16px;
        margin-top:20px;
    }
    .address_input .input_box_span{
        display:inline-block;
        width:100px;
        text-align:right;
        padding-right:10px;
        font-size: 16px;
    }
    .address_input .input_box_select{
        display: inline-block;
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
        padding-top: 20px;
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
