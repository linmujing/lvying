<template>
	<div class="address_box">
        <ul class="address_list">
            <li v-for="(items, index1) in addressData.addressList" :key="index1">
                <div>
                    姓名：<span  style="margin-right:100px;">{{items.name}}</span>电话：<span  >{{items.phone}}</span>
                </div>
                <div>
                    地址：<span >{{items.province.label +" " + items.city.label +" " + items.county.label +" " + items.addressDetail  }}</span><br/>
                    邮编：<span>{{items.postCode}}</span>
                </div>
                <p class="text_right">
                    <Button type="text" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0"
                        @click="aditAddressItem(index1)" >编辑</Button>
                    <Button type="text" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0;color:red;"
                        @click="deleteAddress(index1)" >删除</Button>
                    
                </p>
                <span class="choose_address" v-if="addressState == 1"> 
                    <Button type="success" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" @click="chooseAddressItem(index1)" >选择</Button>
                </span>

            </li>
            <li class="new_add">
                <Button type="text" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0"
                        @click="openAddressModel" >新增地址</Button>
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
                        <Select v-model="addressSelectData.province.value"  size="large" style="width:150px">
                            <Option v-for="item in addressSelectData.provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="addressSelectData.city.value"  size="large" style="width:150px">
                            <Option v-for="item in addressSelectData.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="addressSelectData.county.value"  size="large" style="width:150px">
                            <Option v-for="item in addressSelectData.countyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
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
	export default {
        props:['pState'],
		data() {
			return {
                
                //  页面状态 0: 地址页面  1：地址选择页面  都可以增删改地址
                addressState: 0,

                /*收货地址数据*/
                addressData:{
                    // 收货地址数据列表
                    addressList:[
                    {
                        id: 1,
                        name:'律师之家',
                        phone:'15874252525',
                        province: { value: '1', label: '湖南省'},
                        city: { value: '1', label: '长沙市'},
                        county: { value: '1', label: '芙蓉区'},
                        addressDetail: '芙蓉大道 中心街 23号',
                        postCode: '10010',
                    }
                    ],
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
                        province: { value: '1', label: '湖南省'},
                        city: { value: '1', label: '长沙市'},
                        county: { value: '1', label: '芙蓉区'},
                        addressDetail: '',
                        postCode: '',
                    },
                    //  删除弹框
                    deleteModel:{
                        Value: false ,
                        Index: 0
                    }

                },

                /*地址数据模型 省 市 县*/
                addressSelectData:{ 
                    province: { value: '', label: ''},
                    city: { value: '', label: ''},
                    county: { value: '', label: ''},
                    provinceList: [{ value: '1', label: '湖南'}],
                    cityList: [{ value: '1', label: '长沙'}],
                    countyList: [{ value: '1', label: '芙蓉区'}]
                },
			}
		},
		methods:{

            /*地址功能块*/
            //  新增地址
            addAddressItem(){
                
                // 获取地址数据模型
                let Data =  this.addressSelectData;
                // 收货地址弹框绑定值
                let modelData =  this.addressData.addressModelData;

                if( Data.county == "" ){     this.$Message.warning('地址填写不完整！'); return ;  };
                if( Data.name == "" ){     this.$Message.warning('收件人名不能为空'); return ;     }
                if( Data.addressDetail == "" ){     this.$Message.warning('地址详情不能为空！'); return ;     }

                // 设置收货地址弹框绑定值地址
                this.addressData.addressModelData.address = Data.province + " " + Data.city + " " + Data.county;

                // 判断是新增地址还是修改地址
                if(this.addressData.addOrAdit){

                    this.addressData.addressList.push({
                        id: 1,
                        name: modelData.name,
                        phone: modelData.phone,
                        province: { value: '1', label: '湖南省'},
                        city: { value: '1', label: '长沙市'},
                        county: { value: '1', label: '芙蓉区'},
                        addressDetail: modelData.addressDetail ,
                        postCode: modelData.postCode,
                    })
                    
                    this.$Message.success('新增成功！')

                }else{

                    let Index =  this.addressData.aditAddressIndex ;

                    // 编辑修改选择的地址
                    this.addressData.addressList[Index] = {
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
            //  新增打开地址
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

                this.addressSelectData.province = { value: '', label: ''};
                this.addressSelectData.city = { value: '', label: ''};
                this.addressSelectData.county = { value: '', label: ''}; 

                this.addressData.addressModelValue = true;
                
            },
            //  编辑打开地址
            aditAddressItem(index){

                // 设置编辑地址
                this.addressData.addOrAdit = false;

                this.addressData.aditAddressIndex =index;
        
                let Item = this.addressData.addressList[index];

                this.addressData.addressModelData = {
                    name: Item.name ,
                    phone: Item.phone,
                    province: Item.province,
                    city: Item.city,
                    county: Item.county,
                    addressDetail: Item.addressDetail,
                    postCode: Item.postCode,
                };

                //  地址设置
                this.addressSelectData.province = Item.province;
                this.addressSelectData.city = Item.city;
                this.addressSelectData.county = Item.county; 

                this.addressData.addressModelValue = true;

            },
            //  删除地址提示
            deleteAddress(index){

                this.addressData.deleteModel.Value = true ;
                this.addressData.deleteModel.Index = index ;

            },
            //  删除地址
            deleteAddressItem(){

                // 删除当前地址
                let Index = this.addressData.deleteModel.Index;

                this.addressData.addressList.splice(Index, 1);

                this.addressData.deleteModel.Value = false ;

            },
            // 选择地址到页面
            chooseAddressItem(index){

                // 将选中的值传递给父组件
                this.$emit('hidebox', this.addressData.addressList[index]);

            }
        },
        mounted(){

            // 页面判断
            this.addressState = this.pState;

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

                div{
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