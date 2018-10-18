<template>
    <div class="">

        <div class="bg_f5 padding_bottom_120">
	        <div class="box_center_1200 padding_top_20">
	        	<div class="bg_white login_box">
	        		<Row>
	        			<Col span="14">
	        				<div class="padding_90 border_right">

	        					<Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="100">
							        <FormItem label="手机号码" prop="phone">
							            <Input v-model="formRight.phone" size="large" placeholder="请输入手机号码" style="width: 300px"></Input>
							        </FormItem>
							        <FormItem label="密码" prop="pwd">
							            <Input type="password" v-model="formRight.pwd" size="large" placeholder="请输入密码" style="width: 300px"></Input>
							        </FormItem>
							        <FormItem label="确认密码" prop="rePwd">
							            <Input type="password" v-model="formRight.rePwd" size="large" placeholder="请输入重复密码" style="width: 300px"></Input>
							        </FormItem>
							        <FormItem label="验证码" prop="code">
							            <Input v-model="formRight.code" size="large" placeholder="请输入手机验证码" style="width: 200px"></Input>
							            <Button @click="sendVerifyCiPhone()" :disabled="isSend" class="get_code"  size="large"> {{isSendText}} </Button>
							        </FormItem>
							        <FormItem>
							        	<div>
							        		<Checkbox v-model="isAgree">我已认真阅读并同意《XXXXX》</Checkbox>
							        	</div>
							            <Button @click="nextStep('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title margin_top_10" style="width: 200px">下一步</Button>
							        </FormItem>
							    </Form>

	        				</div>
	        			</Col>
	        			<Col span="10">
	        				<div class="padding_left_20 padding_right_20">

	        					<div v-for="item in 3" class="margin_top_10">
	        						<Row class="font_weight_bold">
		        						<Col span="3">问：</Col>
		        						<Col span="21">XXXXXXXXXXXXXX？</Col>
		        					</Row>
		        					<Row class="margin_top_5">
		        						<Col span="3">答：</Col>
		        						<Col span="21">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aeneaneuismod bibendum laoreet. Proin gravida dolor sit amet lacus </Col>
		        					</Row>
	        					</div>

	        				</div>
	        			</Col>
	        		</Row>
	        	</div>
	        </div>
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
              code: ''
          },
          //登录验证
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
              ]
          },
          //验证码按钮
          isSend: false,
          isSendText: '获取验证码',
          // 同意协议
          isAgree: false
        }
    },
    methods: {
    	//下一步
		  nextStep (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              // 阅读协议
              if(!this.isAgree){

                this.$Message.error('请阅读协议!');
                return;

              }
              let reg = new RegExp(/^1[3456789]\d{9}$/);

              // 正则验证手机号
              if( !reg.test(this.formRight.phone) ){

                this.$Message.error('请填写正确的手机号!');
                return;

              }
              let params = this.$Qs.stringify({ 'merchantPhone': this.formRight.phone, 'passWord': this.formRight.pwd, 'smsCode': this.formRight.code })
              this.$Spin.show()
              // 注册
              this.$api.addMerchantInfo( params )

                .then( (res) => {

                  console.log(res)

                  if(res.data.code == 200){
                    this.$Spin.hide()
                    this.$Message.success(res.data.message);
                    // 存储用户信息
                    sessionStorage.setItem("SupplierData", JSON.stringify(res.data.content));
                    // this.$store.commit('userData/saveSupplierData', res.data.content);
                    // console.log(this.$store.state.userData.SupplierData)
                    this.$router.push({path:'/supplier/approver'});

                  }else{
                    this.$Spin.hide()
                    this.$Message.warning(res.data.message);

                  }

                })
                .catch((error) => {

                  this.$Spin.hide()
                  console.log('发生错误！', error);

                });
            }
        })
      },
      // 发送短信验证码
      sendVerifyCiPhone(){

        // 正则验证手机号
        if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.formRight.phone ))){

          this.$Message.error('请填写正确的手机号!');
          return;

        }
        // 判断手机号是否已注册
        this.$api.verifyMerchantPhone( this.$Qs.stringify({ 'merchantPhone':  this.formRight.phone }) )

          .then( (res) => {

            // console.log(res)

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

                  }else {
                    this.$Message.error(res.data.message);
                  }

                })

            }

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
    }
}
</script>
<style scoped lang='less'>
	/*登录框样式*/
	.login_box{
		padding: 70px 0;
		.padding_left_90{padding-left: 90px;}
		.border_right{border-right: 2px solid #E6E6E6;}
		.padding_90{padding: 0 90px;}
	}
	.padding_bottom_120{padding-bottom: 120px;}
</style>
