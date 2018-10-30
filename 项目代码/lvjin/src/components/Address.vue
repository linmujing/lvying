<template>
    <!-- 地址页面 -->
	<div class="address_box">
        <ul class="address_list">
            <!-- 新增地址 -->
            <li class="new_add" v-if="addressList.length < 10">
                <Button type="text" shape="circle" style="width:80px;height:26px;line-height:20px;padding:0"
                        @click="openAddressModel" >+ 新增地址</Button>
            </li>
            <!-- 地址列表 -->
            <li v-for="(items, index1) in addressList" :key="index1">
                <Row>
                    <Col span="19">
                        <div>
                            姓名：<span  style="margin-right:100px;">{{items.name}}</span>电话：<span  >{{items.phone}}</span>
                        </div>
                        <div>
                            地址：<span >{{items.province +" " + items.city +" " + items.county +" " + items.addressDetail  }}</span><br/>
                        </div>  
                    </Col>
                    <Col span="5">
                        <div class="text_right" style="padding-top:60px;">
                            <div class="float_left" style="position:relative;" >
                                <div style="width:100%;height:100%;position:absolute;left:0top:0;z-index:10;" v-show="items.isDefalut" ></div>
                                <Checkbox v-model="items.isDefalut" label="设置默认地址" v-show="false"> 设置默认地址 </Checkbox>
                            </div>
                            <Button type="text" shape="circle" style="width:80px;height:26px;line-height:20px;padding:0"
                                @click="aditAddressItem(index1)" >编辑</Button>
                            <Button type="text" shape="circle" style="width:80px;height:26px;line-height:20px;padding:0;color:red;"
                                @click="deleteAddress(index1)" >删除</Button>
                            
                        </div>
                    </Col>
                </Row>


                <span class="choose_address" v-if="addressState == 1"> 
                    <Button type="success" shape="circle" style="width:80px;height:26px;line-height:20px;padding:0" @click="chooseAddressItem(index1)" >选择</Button>
                </span>

            </li>

        </ul>


        <!-- 订单添加地址弹框 -->
        <Modal v-model="addressData.addressModelValue" width="680" footer-hide >
            <p slot="header" >
                <span class="font_18" style="font-weight:400;" >编辑收货地址</span>
            </p>
            <!-- 地址信息输入框 -->
            <div>
                <div class="input_box" >
                    <span class="input_box_span" >收件人：</span>
                    <Input v-model.trim="addressData.addressModelData.name"  size="large" clearable style="width: 280px" :maxlength="20"/>
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
                    <Input v-model.trim="addressData.addressModelData.addressDetail"  size="large" clearable style="width: 480px" :maxlength="100"/>
                </div>
                <div class="input_box" v-show="false">
                    <span class="input_box_span" >默认地址：</span>
                    <Checkbox v-model="addressData.addressModelData.isDefalut" label="设置默认地址" ></Checkbox>
                </div>
            </div>
            <div style="padding: 30px 0 20px 100px; "> 
                <Button shape="circle" type="success" size="large" @click="addAddressItem">确认收货地址</Button>
            </div>
        </Modal>

        <!-- 删除弹框 -->
        <Modal v-model="addressData.deleteModel.Value" width="480" footer-hide >
            <p slot="header" >
                <span class="font_18" style="font-weight:400;" >提示</span>
            </p>
            <div style="height:100px;line-height:100px;font-size:16px;" >
                <p>确定删除该地址吗？</p>
            </div>
            <div style="padding: 0 0 20px 200px; "> 
                <Button shape="circle" type="success" size="large" @click="deleteAddressData">确定删除</Button>
                <span style="width:40px;display:inline-block;"></span>
                <Button shape="circle" style="background:#a5a5a5;color:#fff;"  size="large" @click="addressData.deleteModel.Value = false">取消</Button>
            </div>
        </Modal>

	</div>
</template>
<script>

    import province from '../assets/js/province'

	export default {
        props:['pState'],
		data() {
			return {
                
                //  页面状态 0: 地址页面  1：地址选择页面  都可以增删改地址
                addressState: 0,

                /*收货地址数据*/
                addressData:{
                    // 收货地址弹框
                    addressModelValue: false,
                    // 收货地址新增或者编辑
                    addOrAdit:true,
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
                        isDefalut: false
                    },
                    //  删除弹框
                    deleteModel:{
                        Value: false ,
                        Index: 0
                    }

                },

                // 收货地址数据列表
                addressList:[],

                /*地址数据模型 省 市 县  暂时无用*/
                addressSelectData:{ 

                    province: '',
                    city: '',
                    county:  '',
                    provinceList: [{ value: '1', label: '湖南'}],
                    cityList: [{ value: '1', label: '长沙'}],
                    countyList: [{ value: '1', label: '芙蓉区'}]
                },

                // 地址城市列表
                cityList: [ { value: '天津',label: '天津' }, ],
                // 选中的城市数组
                addressValue:[],

                // 用户信息
                userData: {
                    ciCode: this.$store.state.userData.cicode
                },
                
			}
		},
		methods:{

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
            // 新增打开地址
            openAddressModel(){

                this.addressData.addressModelData = {
                    name: '' ,
                    phone: '',
                    province: '',
                    city: '',
                    county: '',
                    addressDetail: '',
                    addressCode: ''
                };

                this.addressValue = [];

                this.addressData.addressModelValue = true;
                
            },
            // 编辑打开地址
            aditAddressItem(index){

                // 设置编辑地址
                this.addressData.addOrAdit = false;

                this.addressData.aditAddressIndex =index;
        
                let Item = this.addressList[index];

                this.addressData.addressModelData = {
                    name: Item.name ,
                    phone: Item.phone,
                    province: Item.province,
                    city: Item.city,
                    county: Item.county,
                    addressDetail: Item.addressDetail,
                    addressCode: Item.addressCode
                };

                this.addressValue = [Item.province, Item.city, Item.county];

                this.addressData.addressModelValue = true;

            },
            // 删除地址提示
            deleteAddress(index){

                this.addressData.deleteModel.Value = true ;
                this.addressData.deleteModel.Index = index ;

            },
            // 选择地址到页面
            chooseAddressItem(index){

                // 将选中的值传递给父组件
                this.$emit('hidebox', this.addressList[index]);

            },
            // 选择城市
            handleChange(value){

                this.addressData.addressModelData.province = value[0];
                this.addressData.addressModelData.city = value[1];
                this.addressData.addressModelData.county = value[2];

            },

            /**地址数据**/
            // 获取地址列表
            getAddressData(){

                let param = this.$Qs.stringify({ 'pageNo': 1, 'pageSize': 10 ,'ciCode': this.userData.ciCode }) ;
         
                this.$Spin.show();

                this.$api.getAddressList( param )

                .then( (res) => {

                    console.log(res)

                    if(res.data.code == 200){

                        let data = res.data.content.list , arr = [];

                        for(let i = 0 ; i < data.length; i++){

                            arr.push({
                                addressCode: data[i].addressCode,
                                name:  data[i].addressPersonName,
                                phone:  data[i].addressPhone,
                                province:  data[i].province,
                                city:  data[i].city,
                                county:  data[i].zone,
                                addressDetail:  data[i].address,
                                isDefalut:  data[i].isDefalut,
                            })

                        }

                        this.addressList = arr;

                        // 全局监听用户地址列表变化
                        this.$store.commit('personCenter/setAddressState', data.length > 0 ? 1 : 0);

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

                console.log(param)

                this.$Spin.show();

                this.$api.saveAddress( this.$Qs.stringify(param) )

                .then( (res) => {

                    console.log(res)

                    if(res.data.code == 200){

                        // 获取用户地址列表
                        this.getAddressData();

                        this.$Message.success(res.data.message)

                        this.addressData.addressModelValue = false;

                        this.addressData.addOrAdit = true;

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
            // 删除地址
            deleteAddressData(){

                let param = this.$Qs.stringify({ "addressCode":  this.addressList[this.addressData.deleteModel.Index].addressCode }) ;

                this.$Spin.show();

                this.$api.deleteAddress( param )

                .then( (res) => {

                    console.log(res)

                    if(res.data.code == 200){

                        // 获取用户地址列表
                        this.getAddressData();

                        this.$Message.success('删除成功！')

                    }else{

                        this.$Message.warning(res.data.message);

                    }

                    this.$Spin.hide();

                })
                .catch((error) => {

                    this.$Spin.hide();
                    console.log('发生错误！', error);

                });

                this.addressData.deleteModel.Value = false ;
            }
            
        },
        mounted(){

            // 订单选择地址页面判断
            this.addressState = this.pState;

            // 获取地址信息
            this.cityList = province();

            // 获取用户地址列表
            this.getAddressData();

        }
	}
</script>



<style lang='less' scoped>
    // 引入订单共用less文件
    @import '../view/shopCart/shopCart.less';

    .address_box{
        .address_list{
            color: #999;
            li{
                height:120px;
                border:1px solid @color_e6e6e6;
                margin: 20px 20px 0 20px;
                padding:15px 20px;
                line-height: 30px;
                position: relative;

                span{
                    color:#666;
                }

            }
            li:hover{
                box-shadow: 1px 1px 3px @color_e6e6e6;
            }
            .new_add{
                line-height:80px;
                text-align: center;
            }
            .choose_address{
                position: absolute;
                right:20px;
                top:20px;
            }

        }

    }
    .input_box{
        height:40px;
        line-height:40px;
        font-size:16px;
        margin-top:20px;
    }
    .input_box_span{
        display:inline-block;
        width:100px;
        text-align:right;
        padding-right:10px;
        font-size: 16px;
    }
    .input_box_select{
        display: inline-block;
    }
</style>