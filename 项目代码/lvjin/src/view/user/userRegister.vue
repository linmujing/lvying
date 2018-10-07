<template>
    <div class="">
        <div class="margin_top_30">
    		<Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="100">
		        <!-- <FormItem label="用户名" prop="name">
		            <Input v-model="formRight.name" size="large" placeholder="请输入用户名" style="width: 300px"></Input>
		        </FormItem> -->
		        <FormItem label="手机号码" prop="phone">
		            <Input v-model="formRight.phone" size="large" placeholder="请输入手机号码" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="密码" prop="pwd">
		            <Input v-model="formRight.pwd" type="password" size="large" placeholder="请输入密码" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="确认密码" prop="rePwd">
		            <Input v-model="formRight.rePwd" type="password" size="large" placeholder="请输入重复密码" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="验证码" prop="code">
		            <Input v-model="formRight.code" size="large" placeholder="请输入手机验证码" style="width: 200px"></Input>
		            <Button @click="sendVerifyCiPhone" :disabled="isSend" class="get_code"  size="large"> {{isSendText}} </Button>
		        </FormItem>
		        <FormItem>
		        	<Checkbox v-model="isAgree">我已认真阅读并同意《XXXXX》</Checkbox></a>
		            <Button @click="clickRegister()" size="large" type="success" shape="circle" class="all_width bg_title margin_top_10" style="width: 260px">完成并登录</Button>
		        </FormItem>
		    </Form>
    	</div>
    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
    	const passwordSure = (rule, value, callback) => {
            let self = this;
            if (value != self.formRight.pwd ){
                callback(new Error('密码不一致'))
            } else {
                callback();
            }
        };
        return {

			formRight: {
                phone: '',
                pwd: '',
                rePwd: '',
                code: '',
            },

            //密码登录验证
            ruleValidate: {
                phone: [
                    { required: true, message: '手机号码不能为空!', trigger: 'blur' }
                ],
                pwd: [
                	{ required: true, message: '密码不能为空!', trigger: 'blur' },
                	{type:'string',min:6,message: '请输入6-20位数字、字母、标点符号组合密码!', trigger: 'blur'},
                ],
                rePwd: [
                    { required: true, message: '确认密码不能为空!', trigger: 'blur' },
                    {validator:passwordSure,trigger: 'blur'}
                ],
                code: [
                    { required: true, message: '验证码不能为空!', trigger: 'blur' }
                ],
            },
 
            //验证码按钮
            isSend: false,
            isSendText: '获取验证码',
            // 同意协议
            isAgree: false
        }
        
    },
    methods: {

		// 点击注册
		clickRegister () {
            
            // 阅读协议
            if(!this.isAgree){

                this.$Message.error('请阅读协议!');
                return;

            }

            let reg = new RegExp(/^1(3|4|5|7|8)\d{9}$/);
 
            // 正则验证手机号
            if( !reg.test(this.formRight.phone) ){

                this.$Message.error('请填写正确的手机号!');
                return;

            }

            // 验证密码
            if(this.formRight.pwd == ""){

                this.$Message.error('密码不能为空!');
                return;

            }
            if(this.formRight.rePwd == ""){

                this.$Message.error('请确认密码!');
                return;

            }
            if( this.formRight.pwd != this.formRight.rePwd  ){

                this.$Message.error('密码输入不一致，请重新输入!');
                return;

            }

            // 确认验证码
            if(this.formRight.pwd == ""){

                this.$Message.error('验证码不能为空!');
                return;

            }

            this.$Loading.start();

            // 判断手机号是否已被注册
            this.$api.verifyCiPhone( this.$Qs.stringify({ 'ciPhone': this.formRight.phone }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    this.$Loading.finish();
                    this.$Message.warning('该帐号已经注册!');
                    return;

                }else if (res.data.code == 500){
                    
                    // 注册 
                    this.registerFn();

                }

            })
            .catch((error) => {

                this.$Loading.error();
                console.log('发生错误！', error);

            });

        },

        // 注册
        registerFn (){

            let params = this.$Qs.stringify({ 'ciPhone': this.formRight.phone, 'passWord': this.formRight.pwd, 'smsCode': this.formRight.code })

            // 注册
            this.$api.addCustomerInfo( params )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    this.loginFn( this.formRight.phone, this.formRight.pwd, '');
                    this.$Message.success(res.data.message);

                }else{

                    this.$Loading.finish();

                    this.$Message.warning(res.data.message);

                }

              
            })
            .catch((error) => {

                this.$Loading.error();
                console.log('发生错误！', error);

            });

        },

        // 发送短信验证码
        sendVerifyCiPhone(){
            
            this.$Loading.start();

            // 正则验证手机号
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.formRight.phone ))){

                this.$Message.error('请填写正确的手机号!');
                return;

            }
            this.sendTimeOut();

            // 判断手机号是否已注册
            this.$api.verifyCiPhone( this.$Qs.stringify({ 'ciPhone':  this.formRight.phone }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    this.$Message.error('该帐号已经注册!');
                    return;

                }else if(res.data.code == 500){

                    // 发送验证码
                    this.$api.sendSms( this.$Qs.stringify({ 'phoneNo': this.formRight.phone, 'type': '1' }) )

                    .then( (res) => {

                        console.log(res)

                        if(res.data.code == 200){

                            this.sendTimeOut();

                        }

                    })

                }

                this.$Loading.finish();

            })
            .catch((error) => {

                this.$Loading.error();
                console.log('发生错误！', error);

            });

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

        },

        // 登录
        //@param ciPhone 电话号码
        //@param passWord 密码
        //@param smsCode 手机验证码
        loginFn( ciPhone, passWord, smsCode){

            this.$api.login( this.$Qs.stringify({ 'ciPhone': ciPhone, 'passWord': passWord, 'smsCode': smsCode  }) )

            .then( (res) => {

                cconsole.log(res)

                if(res.data.code == 200){

                    this.$Message.success(res.data.message);

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


    }
}
</script>
<style scoped lang='less'>
	/*获取验证码*/
	.get_code{background: #E6E6E6;display: inline-block;width: 97px;text-align: center;}
</style>
