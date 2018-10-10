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
                <span>手机号码：</span>
                <i>{{profileData.phone}}</i>
            </div>
            <div class="input_box">
                <span style="vertical-align:top;">头像：</span>
                <div style="display:inline-block;">
                    <p class="head_img" ><img :src="profileData.headImg" alt=""></p>
                    <Upload
                        action="/api/system/file/upload"
                        :format="['jpg','gif','png']"
                        :show-upload-list="false"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :on-success="materialUrlSuccess"
                        :on-error="this.$Loading.finish()"
                        :max-size="10240">
                        <Button type="success" shape="circle" size="small" ghost style="width:90px;" >修改头像</Button>
                        <span class="padding_left_20 font_12 color_999">图片要清晰，支持jpg，png，gif格式，最大不超过10M</span>
                    </Upload>
                </div>

            </div>
            <div class="input_box">
                <span>性别：</span>
                <RadioGroup v-model="profileData.sex">
                    <Radio label="0">
                        <span class="padding_right_20">男</span>
                    </Radio>
                    <Radio label="1">
                        <span  class="padding_right_20">女</span>
                    </Radio>
                </RadioGroup>
            </div>
            <div class="input_box">
                <span style="vertical-align:top;">个人介绍：</span>
                <Input v-model="profileData.personal" type="textarea" placeholder="请输入关键字" :rows="6"  style="width:400px;padding-right:10px;" />
            </div>
            <div style="padding:50px 0 0 50px;">
                 <Button type="success" size="large" shape="circle" style="width:100px;"  @click="saveProfile">提交</Button>
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
                headImg: '',
                sex:'',
                personal:''
            
            }

        }
        
    },
    methods: {
        
        /*切换页面组件*/
        changePage(state){

            this.profileState = state;

        },
        //图片格式
        handleFormatError (file) {

            this.$Message.warning({  content: '图片格式只能为jpg、png、gif!'  });

        },
        //图片上传尺寸
        handleMaxSize (file) {

            this.$Message.warning({ content: '上传图片过大，最大不能超过10M'  });

        },
        //图片上传成功
        materialUrlSuccess (res, file) {
            
            if(res.code == 200){

                this.profileData.headImg = res.content;

            }else{

                this.$Message.warning({ content: '图片上传失败，请重新上传'  });

            }

            this.$Loading.finish();
            
        },

        /**数据**/
        // 保存个人信息
        saveProfile(){

            this.$Loading.start();	

            let param = this.$Qs.stringify({ 'ciCode': 1, 'ciSex': 1, 'ciIntroduce': 1, 'ciProfileUrl': 1 }) ;

            this.$api.saveCustomerInfo( param )

            .then( (res) => {

                console.log(res)

                this.$Loading.finish();

                if(res.data.code == 200){

                    // 存储用户信息
                    this.$store.commit('userData/saveUserData', res.data.content);

                    this.$Message.warning(res.data.message);
                   
                }else{

                    this.$Message.warning(res.data.message);

                }


            })
            .catch((error) => {

                this.$Loading.error();
                console.log('发生错误！', error);

            });
 
        },

    },
    mounted(){
    
        // 获取个人信息
        this.profileData.phone = this.$store.state.userData.ciphone;
        this.profileData.headImg = this.$store.state.userData.ciProfileUrl || require('../../assets/images/icon/head_img_icon.png');
        this.profileData.sex = this.$store.state.userData.ciSex;
        this.profileData.personal = this.$store.state.userData.ciIntroduce || '';


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
        background-position: center center;
        background-size: 60%;
        background-repeat: no-repeat;
        border: 1px solid @color_e6e6e6;
        margin-bottom:10px;

        img{
            width:90px;
            height:90px;
        }
    }

    
</style>
