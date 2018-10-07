<template>
    <div class="">
        <Tabs value="psdLogin">
			<!--密码登录-->
	        <TabPane label="密码登录" name="psdLogin">
	        	<div class="margin_top_50">
	        		<Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="100">
				        <FormItem label="手机号" prop="name">
				            <Input v-model="formRight.name" size="large" placeholder="请输入手机号" style="width: 300px"></Input>
				        </FormItem>
				        <FormItem label="密码" prop="pwd">
				            <Input v-model="formRight.pwd" type="password" size="large" placeholder="请输入密码" style="width: 300px"></Input>
			            	<router-link tag="a" to="/user/forgotPwdStep" class="padding_left_10">忘记密码？</router-link>
				        </FormItem>
				        <FormItem style="width: 260px">
				            <Button @click="pwdSubmit(true)" size="large" type="success" shape="circle" class="all_width bg_title">登录</Button>
				        </FormItem>
				    </Form>
	        	</div>
	        </TabPane>
	        <!--验证码登录-->
	        <TabPane label="手机验证码登录" name="codeLogin">
	        	<div class="margin_top_50">
	        		<Form ref="formValidate1" :model="formRightCode" :rules="ruleValidate1" label-position="right" :label-width="100">
				        <FormItem label="手机号" prop="phone">
				            <Input v-model="formRightCode.phone" size="large" placeholder="请输入手机号" style="width: 300px"></Input>
				        </FormItem>
				        <FormItem label="验证码" prop="code">
				            <Input v-model="formRightCode.code" size="large" placeholder="请输入手机验证码" style="width: 200px"></Input>
				            <Button @click="sendVerifyCiPhone" :disabled="isSend" class="get_code"  size="large"> {{ isSendText }} </Button>
				        </FormItem>
				        <FormItem style="width: 260px">
				            <Button @click="pwdSubmit(false)" size="large" type="success" shape="circle" class="all_width bg_title">登录</Button>
				        </FormItem>
				    </Form>
	        	</div>
	        </TabPane>
	    </Tabs>
    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {
            // 是否为密码登录
            isPassWord: false,
            // 密码登录
       		formRight: {
                name: '',
                pwd: ''
            },
            //密码登录验证
            ruleValidate: {
                name: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' }
                ],
                pwd: [
                	{ required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            //手机验证登录
            formRightCode: {
                phone: '',
                code: ''
            },
            //密码登录验证
            ruleValidate1: {
                phone: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' }
                ],
                code: [
                	{ required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            //验证码按钮
            isSend: false,
            isSendText: '获取验证码'
        }
        
    },
    methods: {

        // 点击登录
        //@param isPassWord Boolean 是否为密码登录 
		pwdSubmit (isPassWord) {

            this.isPassWord = isPassWord ;
            
            let phone = isPassWord ? this.formRight.name : this.formRightCode.phone ;

            let reg = new RegExp(/^1(3|4|5|7|8)\d{9}$/);
 
            // 正则验证手机号
            if( !reg.test(phone) ){

                this.$Message.error('请填写正确的手机号!');
                return;

            }

            // 验证密码
            if(isPassWord){
                
                if(this.formRight.pwd == ""){

                    this.$Message.error('密码不能为空!');
                    return;

                }

            }else{

                if(this.formRightCode.code == ""){

                    this.$Message.error('验证码不能为空!');
                    return;

                }

            }

            this.$Loading.start();

            // 判断手机号是否已被注册
            this.$api.verifyCiPhone( this.$Qs.stringify({ 'ciPhone': phone }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 500){

                    this.$Loading.finish();
                    this.$Message.error('该帐号还没有注册!');
                    return;

                }else if (res.data.code == 200){
                    
                    if(isPassWord){
   
                        this.loginFn(this.formRight.name, this.formRight.pwd, '');

                    }else{

                        this.loginFn(this.formRightCode.phone, '', this.formRightCode.code);

                    }

                }

            })

        },

        // 登录
        //@param ciPhone 电话号码
        //@param passWord 密码
        //@param smsCode 手机验证码
        loginFn( ciPhone, passWord, smsCode){

            let param = this.isPassWord ? this.$Qs.stringify({ 'ciPhone': ciPhone, 'passWord': passWord }) : this.$Qs.stringify({ 'ciPhone': ciPhone, 'smsCode': smsCode }) ;

            this.$api.login( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    this.$Message.success(res.data.message);

                    // 存储用户信息
                    this.$store.commit('userData/saveUserData', res.data.content);
                    // console.log(this.$store.state.userData.UserData)
                    // this.$router.push({ name: '', params: {id: id}})

                    //跳转函数*************************************************

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

        // 发送短信验证码
        sendVerifyCiPhone(){

            // 正则验证手机号
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.formRightCode.phone ))){

                this.$Message.error('请填写正确的手机号!');
                return;

            }

            // 判断手机号是否已注册
            this.$api.verifyCiPhone( this.$Qs.stringify({ 'ciPhone':  this.formRightCode.phone }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 500){

                    this.$Message.error('该帐号还未注册!');
                    return;

                }else if(res.data.code == 200){

                    // 发送验证码
                    this.$api.sendSms( this.$Qs.stringify({ 'phoneNo': this.formRightCode.phone, 'type': '3' }) )

                    .then( (res) => {

                        cconsole.log(res)

                        if(res.data.code == 200){

                            this.sendTimeOut();

                        }

                    })

                }

            })

        },

        // 发送短信计时器
        sendTimeOut(){

            let timer = 60;

            this.isSend = true;

            let t = null;

            t = setInterval(()=>{ 

                if(timer > 0){

                    timer-- ;
                    this.isSendText = timer + 'S';
                    
                }else{

                    this.isSendText = '重新获取';
                    this.isSend = false;
                    clearInterval(t);
                    return ;

                }
                    
            },1000)

        }

    }
}
</script>
<style type="text/css">
	.container .ivu-tabs-nav .ivu-tabs-tab-active,.container .ivu-tabs-nav .ivu-tabs-tab:hover{color: #00AA88;}
	.container .ivu-tabs-ink-bar{background: #00AA88;}
	.container .ivu-tabs-nav{width: 100%;}
	.container .ivu-tabs-nav .ivu-tabs-tab{width: 50%;text-align: center;font-size: 24px;}
</style>
<style scoped lang='less'>
	/*获取验证码*/
	.get_code{background: #E6E6E6;display: inline-block;width: 97px;text-align: center;}
	.padding_bottom_120{padding-bottom: 120px;}
</style>
