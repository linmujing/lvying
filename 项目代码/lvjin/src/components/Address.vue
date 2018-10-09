<template>
    <!-- 地址页面 -->
	<div class="address_box">
        <ul class="address_list">
            <!-- 新增地址 -->
            <li class="new_add" v-if="addressList.length < 10">
                <Button type="text" shape="circle" style="width:80px;height:26px;line-height:20px;padding:0"
                        @click="openAddressModel" >新增地址</Button>
            </li>
            <!-- 地址列表 -->
            <li v-for="(items, index1) in addressList" :key="index1">
                <div>
                    姓名：<span  style="margin-right:100px;">{{items.name}}</span>电话：<span  >{{items.phone}}</span>
                </div>
                <div>
                    地址：<span >{{items.province +" " + items.city +" " + items.county +" " + items.addressDetail  }}</span><br/>
                    邮编：<span>{{items.postCode}}</span>
                </div>
                <div class="text_right" style="width:100%">

                    <div class="float_left" style="position:relative;" >
                        <div style="width:100%;height:100%;position:absolute;left:0top:0;z-index:10;" v-show="items.isDefalut" ></div>
                        <Checkbox v-model="items.isDefalut" label="设置默认地址" v-show="false"> 设置默认地址 </Checkbox>
                    </div>
                    <Button type="text" shape="circle" style="width:80px;height:26px;line-height:20px;padding:0"
                        @click="aditAddressItem(index1)" >编辑</Button>
                    <Button type="text" shape="circle" style="width:80px;height:26px;line-height:20px;padding:0;color:red;"
                        @click="deleteAddress(index1)" >删除</Button>
                    
                </div>
                <span class="choose_address" v-if="addressState == 1"> 
                    <Button type="success" shape="circle" style="width:80px;height:26px;line-height:20px;padding:0" @click="chooseAddressItem(index1)" >选择</Button>
                </span>

            </li>

        </ul>


        <!-- 订单添加地址弹框 -->
        <Modal v-model="addressData.addressModelValue" width="680" footer-hide >
            <p slot="header" style="background:#f8f8f8;">
                <span class="font_18" style="font-weight:400;" >新增收货地址</span>
            </p>
            <!-- 地址信息输入框 -->
            <div>
                <div class="input_box" >
                    <span class="input_box_span" >收件人：</span>
                    <Input v-model="addressData.addressModelData.name"  size="large" clearable style="width: 280px" />
                </div>
                <div class="input_box" >
                    <span class="input_box_span" >手机号码：</span>
                    <Input v-model="addressData.addressModelData.phone"  size="large" clearable style="width: 280px" />
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
                        <!-- <Select v-model="addressSelectData.province.value"  size="large" style="width:150px">
                            <Option v-for="item in addressSelectData.provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="addressSelectData.city.value"  size="large" style="width:150px">
                            <Option v-for="item in addressSelectData.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="addressSelectData.county.value"  size="large" style="width:150px">
                            <Option v-for="item in addressSelectData.countyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select> -->
                    </div>  
                </div>
                <div class="input_box" >
                    <span class="input_box_span" >详细地址：</span>
                    <Input v-model="addressData.addressModelData.addressDetail"  size="large" clearable style="width: 480px" />
                </div>
                <div class="input_box" >
                    <span class="input_box_span" >邮编：</span>
                    <Input v-model="addressData.addressModelData.postCode"  size="large" clearable style="width: 280px" />
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
            <div style="height:140px;line-height:140px;font-size:16px;" >
                <p>确定删除该地址吗？</p>
            </div>
            <div style="padding: 0 0 20px 200px; "> 
                <Button shape="circle" type="success" size="large" @click="deleteAddressItem">确定删除</Button>
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
                        postCode: '',
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
                    ciCode: ''
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
                if(modelData.phone == ""){
                    
                        this.$Message.warning('联系方式不能为空！');
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

                // 判断是新增地址还是修改地址
                if(this.addressData.addOrAdit){

                    // 新增地址
                    this.addAddressData();

                }else{

                    let Index =  this.addressData.aditAddressIndex ;

                    // 编辑修改选择的地址
                    this.addressList[Index] = {
                        id: 1,
                        name: modelData.name,
                        phone: modelData.phone,
                        province: modelData.province,
                        city: modelData.city,
                        county: modelData.county,
                        addressDetail: modelData.addressDetail ,
                        postCode: modelData.postCode,
                    };

                    this.addressData.addOrAdit = true;

                    this.$Message.success('修改成功！')

                }

                this.addressData.addressModelValue = false;

            },
            // 新增打开地址
            openAddressModel(){

                this.addressData.addressModelData = {
                    name: '' ,
                    phone: '',
                    province: { value: '', label: ''},
                    city: { value: '', label: ''},
                    county: { value: '', label: ''},
                    addressDetail: '',
                    postCode: '',
                };

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
                    postCode: Item.postCode,
                };

                this.addressData.addressModelValue = true;

            },
            // 删除地址提示
            deleteAddress(index){

                this.addressData.deleteModel.Value = true ;
                this.addressData.deleteModel.Index = index ;

            },
            // 删除地址
            deleteAddressItem(){

                // 删除当前地址
                let Index = this.addressData.deleteModel.Index;

                this.addressList.splice(Index, 1);

                this.addressData.deleteModel.Value = false ;

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

            /*地址数据*/
            // 获取地址列表
            getAddressData(){

                let param = this.$Qs.stringify({ 'pageNo': 1, 'pageSize': 10 , 'ciCode': this.userData.ciCode }) ;

                this.$Loading.start();

                this.$api.getAddressList( param )

                .then( (res) => {

                    console.log(res)

                    if(res.data.code == 200){

                        let data = res.data.content.list , arr = [];

                        for(let i = 0 ; i < data.length; i++){

                            arr.push({
                                id: data[i].id,
                                name:  data[i].addressPersonName,
                                phone:  data[i].addressPhone,
                                province:  data[i].province,
                                city:  data[i].city,
                                county:  data[i].zone,
                                addressDetail:  data[i].address,
                                postCode:  data[i].addressCode,
                                isDefalut:  data[i].isDefalut,
                            })

                        }

                        this.addressList = [];
                        this.addressList = arr;

                    }else{

                        this.$Message.warning(res.data.message);

                    }

                    this.$Loading.finish();

                })
                .catch((error) => {

                    this.$Loading.error();
                    console.log('发生错误！', error);

                });
            },
            // 新增地址
            addAddressData(){

                // 获取弹框数据
                let data = this.addressData.addressModelData;

                let param = this.$Qs.stringify({ 
                    "ciCode": this.userData.ciCode,
                    "addressCode": data.postCode,
                    "addressPersonName":data.name,
                    "addressPhone": data.phone,
                    "province": data.province,
                    "zone": data.county,
                    "city": data.city,
                    "address": data.addressDetail,
                    }) ;

                this.$Loading.start();

                this.$api.saveAddress( param )

                .then( (res) => {

                    console.log(res)

                    if(res.data.code == 200){

                        // 获取用户地址列表
                        this.getAddressData();

                        this.$Message.success('新增成功！')

                    }else{

                        this.$Message.warning(res.data.message);

                    }

                    this.$Loading.finish();

                })
                .catch((error) => {

                    this.$Loading.error();
                    console.log('发生错误！', error);

                });
            }
            
        },
        mounted(){

            // 订单选择地址页面判断
            this.addressState = this.pState;

            // 获取地址信息
            this.cityList = province();

            // 获取用户信息
            this.userData.ciCode = 12 ;//this.$store.state.userData.UserData.ciCode ;

            // 获取用户地址列表
            this.getAddressData();

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
</style>

<style lang='less' scoped>
    // 引入订单共用less文件
    @import '../view/shopCart/shopCart.less';

    .address_box{
        .address_list{
            color: #999;
            li{
                height:150px;
                border:1px solid @color_e6e6e6;
                margin: 20px 20px 0 20px;
                padding:15px 20px;
                line-height: 30px;
                position: relative;

                >div{
                    width:80%;
                }
                span{
                    color:#666;
                }

            }
            li:hover{
                box-shadow: 1px 1px 3px @color_e6e6e6;
            }
            .new_add{
                line-height:110px;
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