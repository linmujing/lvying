<template>
			<!-- 绑定手机号弹框 -->
			<Modal v-model="bindModel" width="580" footer-hide >
				<p slot="header" >
					<span class="font_18" style="font-weight:400;" >绑定手机号</span>
				</p>
				<!-- 输入框 -->
				<div>
					<Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="100">
						<FormItem label="手机号码" prop="phone">
							<Input v-model="formRight.phone" size="large" placeholder="请输入手机号码" style="width: 300px"></Input>
						</FormItem>
						<FormItem label="密码" prop="pwd" v-if="pwdShow">
							<Input v-model="formRight.pwd" type="password" size="large" placeholder="请输入密码" style="width: 300px"></Input>
						</FormItem>
						<FormItem label="确认密码" prop="rePwd" v-if="pwdShow">
							<Input v-model="formRight.rePwd" type="password" size="large" placeholder="请输入重复密码" style="width: 300px"></Input>
						</FormItem>
						<FormItem label="验证码" prop="code">
							<Input v-model="formRight.code" size="large" placeholder="请输入手机验证码" style="width: 200px"></Input>
							<Button @click="sendVerifyCiPhone" :disabled="isSend" class="get_code"  size="large"> {{isSendText}} </Button>
						</FormItem>
					</Form>
                    <p  v-if="pwdShow" style="font-size:10px;color:red;padding:0 100px 20px 50px;">提示：绑定手机号后可以用手机号登录平台！</p>
				</div>
				<div style="margin:0 auto; width:100px; "> 
					<Button shape="circle" type="success" size="large" @click="bindPhone">确定</Button>
				</div>
			</Modal>

</template>
<script>

export default {
    props:['unionId'],
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
        }
        return {
          	// 绑定手机号
			bindModel: true,
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

            // 微信是否已注册
            passwordShow: false,

            //验证码按钮
            isSend: false,
            isSendText: '获取验证码',

            // 对未注册的手机号添加密码登录
            pwdShow: false,
        }
        
    },
    mounted(){

    },
    methods: {
        // 绑定手机号
        bindPhone(){

            let reg1 = new RegExp(/^1(3|4|5|7|8)\d{9}$/);

            // 正则验证手机号
            if( !reg1.test(this.formRight.phone) ){

                this.$Message.warning('请填写正确的手机号!');
                return;

            }
            

            if( this.formRight.code == '' ){

                this.$Message.warning('请输入验证码!');
                return;

            }


            let params = { 'ciPhone': this.formRight.phone, 'smsCode':this.formRight.code , 'unionId': this.unionId } ;

            // 假如需要输入密码，则需要做个密码验证
            if(this.pwdShow){

                if( this.formRight.pwd != this.formRight.rePwd ){

                    this.$Message.warning('请输入正确的密码!');
                    return;

                }

                if( this.formRight.pwd == '' ){

                    this.$Message.warning('请输入密码!');
                    return;

                }

                params.passWord = this.formRight.pwd
            }

            this.$Spin.show();

            // 绑定手机号
            this.$api.bindingCustomerInfo( this.$Qs.stringify(params) )

            .then( (res) => {

                console.log(res)
                this.$Spin.hide()

                if(res.data.code == 200){

                    this.$Message.success('绑定成功!');
                    
                    localStorage.setItem("ciphone", this.formRight.phone);
                    
                    return;

                }else{
                    
                    this.$Message.error(res.data.message);
                    
                }

            })
            .catch((error) => {

                this.$Spin.hide();
                console.log('发生错误！', error);

            });
        },
        
		// 发送短信验证码
		sendVerifyCiPhone(){
            

			// 正则验证手机号
			if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.formRight.phone ))){

				this.$Message.error('请填写正确的手机号!');
				return;

			}

			// 判断手机号是否已注册
			this.$api.verifyCiPhone( this.$Qs.stringify({ 'ciPhone':  this.formRight.phone }) )

			.then( (res) => {

				console.log(res)

                // 未注册需要输入密码
				if(res.data.code == 200){
                    this.pwdShow = false;
				}else if(res.data.code == 500){
                    this.pwdShow = true;
                }
                
                // 发送验证码
                this.$api.sendSms( this.$Qs.stringify({ 'phoneNo': this.formRight.phone, 'type': '1' }) )

                .then( (res) => {

                    console.log(res)

                    if(res.data.code == 200){
                        this.$Message.success(res.data.message);
                        this.sendTimeOut();

                    }else {
                    this.$Message.error(res.data.message);
                    }

                })

			})
			.catch((error) => {

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

    },		
    computed: {
        // 关闭绑定框
        getBindState() {
            return this.$store.state.personCenter.bindState ;
        },
    },
    watch: {
        // 监听弹框变化
        getBindState:function (val){
            this.bindStateModel =  val == 1  ? false : true ;
        },
    }
}
</script>

<style>
 
</style>
<style lang="less" scoped>


</style>