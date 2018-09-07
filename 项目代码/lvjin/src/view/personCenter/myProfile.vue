<template>
    <!-- 我的资料 -->
    <div class="order_box padding_bottom_30">

        <!-- 资料标题    -->
        <div class="order_title font_16 border_bottom_1" >
            <span :class="[profileState == 0 ? 'active': '']" @click="changePage(0)" >我的资料</span>
            <span :class="[profileState == 1 ? 'active': '']" @click="changePage(1)" >收货地址</span>
        </div>

        <!-- 个人资料 -->
        <div class="profile_box" v-if="profileState == 0">
            <div class="input_box">
                <span>我的名字：</span>
                <Input v-model="profileData.name" size="large" placeholder="请输入昵称" style="width:200px;padding-right:10px;" />
            </div>
            <div class="input_box">
                <span>手机号码：</span>
                <Input v-model="profileData.phone" size="large" placeholder="请输入手机号" style="width:200px;padding-right:10px;" />
            </div>
            <div class="input_box">
                <span style="vertical-align:top;">头像：</span>
                <div style="display:inline-block;">
                    <p class="head_img" :style="{ backgroundImage: profileData.headImg }"></p>
                    <Upload action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="success" shape="circle" size="small" ghost style="width:90px;" >修改头像</Button>
                        <span class="padding_left_20 font_12 color_999">扫描件要清晰，支持jpg，png，gif格式，最大不超过10M</span>
                    </Upload>
                </div>

            </div>
            <div class="input_box">
                <span>性别：</span>
                <RadioGroup v-model="profileData.sex">
                    <Radio label="男">
                        <span class="padding_right_20">男</span>
                    </Radio>
                    <Radio label="女">
                        <span  class="padding_right_20">女</span>
                    </Radio>
                    <Radio label="保密">
                        <span  class="padding_right_20">保密</span>
                    </Radio>
                </RadioGroup>
            </div>
            <div class="input_box">
                <span style="vertical-align:top;">个人介绍：</span>
                <Input v-model="profileData.personal" type="textarea" placeholder="请输入关键字" :rows="6"  style="width:400px;padding-right:10px;" />
            </div>
            <div style="padding:50px 0 0 50px;">
                 <Button type="success" size="large" shape="circle" style="width:100px;" >提交</Button>
            </div>
        </div>

        <div  v-if="profileState == 1">
            <Address :pState="0"></Address>
        </div>
    </div>
</template>

<script>
import Address from '../../components/Address.vue'
export default {
    components : {
        Address
    },
    data() {
        return {

            // 判断页面是资料页面还是收货地址 0：我的资料  1：收货地址
            profileState: 1,

            /*资料对象*/
            profileData:{
                name: '',
                phone:'',
                headImg: require('../../assets/images/icon/head_img_icon.png'),
                sex:'',
                personal:''
            
            }

        }
        
    },
    methods: {
        
        /*切换页面组件*/
        changePage(state){

            this.profileState = state;

        }



    },
    mounted(){

       

    }
}
</script>


<style scoped lang='less'>

    //引入资料共用less文件
    @import '../shopCart/shopCart.less'; 

    // 资料标题  
    .order_title{
        span{
            border-bottom:0;
            cursor: pointer;
        }
        .active{
            border-bottom: 2px solid #00aa88;
        }
    }

    // 个人资料
    .input_box{
        padding-top:30px;

        >span{
            display: inline-block;
            width: 120px;
            text-align: right;
        }
        
    }

    .head_img{
        display: inline-block;
        width:90px;
        height:90px;
        background-image: url('../../assets/images/icon/head_img_icon.png') ;
        background-position: center center;
        background-size: 60%;
        background-repeat: no-repeat;
        border: 1px solid @color_e6e6e6;
        margin-bottom:10px;
    }

    
</style>
