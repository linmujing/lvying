<template>
    <div class="">
      <div class="bg_f5 padding_bottom_120">
        <div class="box_center_1200 padding_top_20">
          <div class="bg_white login_box">
            <Row>
              <Col span="14">
                <div class="padding_90 border_right">

                  <div class="margin_top_30">
                    <Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="100">
                      <FormItem label="手机号" prop="phone">
                        <Input v-model="formRight.phone" size="large" placeholder="请输入手机号" style="width: 300px"></Input>
                      </FormItem>
                      <FormItem label="手机验证码" prop="code">
                        <Input v-model="formRight.code" size="large" placeholder="请输入手机验证码" style="width: 200px"></Input>
                        <Button @click="sendVerifyCiPhone" :disabled="isSend" class="get_code"  size="large"> {{isSendText}} </Button>
                      </FormItem>
                      <FormItem label="新密码" prop="pwd">
                        <Input type="password" v-model="formRight.pwd" size="large" placeholder="请输入密码" style="width: 300px"></Input>
                      </FormItem>
                      <FormItem label="确认密码" prop="rePwd">
                        <Input type="password" v-model="formRight.rePwd" size="large" placeholder="请输入重复密码" style="width: 300px"></Input>
                      </FormItem>
                      <FormItem style="width: 260px">
                        <Button @click="nextStep('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title">完成并登陆</Button>
                      </FormItem>
                    </Form>
                  </div>

                </div>
              </Col>
              <Col span="10">
                <div class="padding_90 text_center">

                  <p class="margin_top_30 font_18">
                    还没有账号，
                    <router-link tag="a" to="/supplier/supplierRegister">
                      <span class="color_title">立即注册</span>
                    </router-link>
                  </p>

                  <div class="margin_top_50">
                    <p class="font_16">使用合作账号登录</p>
                  </div>
                  <div class="margin_top_20">
                    <div class="pointer">
                      <img src="../../assets/images/icon/wx.png"/>
                      <p class="font_18">微信</p>
                    </div>
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
      var validateMobilePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else {
          if (value !== '') {
            var reg=/^1[3456789]\d{9}$/;
            if(!reg.test(value)){
              callback(new Error('请输入有效的手机号码'));
            }
          }
          callback();
        }
      };
      return {
        formRight: {
          phone: '',
          code: '',
          pwd: '',
          rePwd: '',
        },
        ruleValidate: {
          phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            {validator: validateMobilePhone, trigger: 'blur'}
          ],
          code: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '密码不能为空!', trigger: 'blur' },
            {type:'string',min:6,message: '请输入6-20位数字、字母、标点符号组合密码!', trigger: 'blur'},
          ],
          rePwd: [
            { required: true, message: '确认密码不能为空!', trigger: 'blur' },
            {validator:passwordSure,trigger: 'blur'}
          ]
        },
        //验证码按钮
        isSend: false,
        isSendText: '获取验证码',
      }
        
    },
    methods: {
    	//下一步
		  nextStep (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let params = this.$Qs.stringify({ 'merchantPhone': this.formRight.phone, 'passWord': this.formRight.pwd, 'smsCode': this.formRight.code });
            this.$Loading.start();
            // 商户密码找回
            this.$api.merchantResetPassWord( params )

              .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                  this.$Message.success(res.data.message);
                  // 完成并登陆
                  this.loginFn(this.formRight.phone, this.formRight.pwd)

                }else if (res.data.code == 500){

                  this.$Message.warning(res.data.message);

                }
                this.$Loading.finish();

              })
              .catch((error) => {

                this.$Loading.error();
                console.log('发生错误！', error);

              });
          }
        })
      },
      // 发送短信验证码
      sendVerifyCiPhone(){
        // 正则验证手机号
        if(!(/^1[3456789]\d{9}$/.test(this.formRight.phone ))){

          this.$Message.error('请填写正确的手机号!');
          return;

        }
        this.$Loading.start();
        // 判断手机号是否已注册
        this.$api.verifyMerchantPhone( this.$Qs.stringify({ 'merchantPhone':  this.formRight.phone }) )

          .then( (res) => {

            console.log(res)

            if(res.data.code == 200){

              // 发送验证码
              this.$api.sendSms( this.$Qs.stringify({ 'phoneNo': this.formRight.phone, 'type': '2' }) )

                .then( (res) => {

                  console.log(res)

                  if(res.data.code == 200){

                    this.sendTimeOut();

                  }

                })
              return;

            }else if(res.data.code == 500){

              this.$Message.error('该帐号尚未注册!');

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
      //@param merchantPhone 电话号码
      //@param passWord 密码
      loginFn( merchantPhone, passWord){

        let params = this.$Qs.stringify({ 'merchantPhone': merchantPhone, 'passWord': passWord });
        this.$Loading.start();
        // 商户登陆
        this.$api.merchantLogin( params )

          .then( (res) => {

            console.log(res)

            if(res.data.code == 200){

              this.$Message.success(res.data.message);

              //跳转函数*************************************************

            }else if (res.data.code == 500){

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
  /*登录框样式*/
  .login_box{
    padding: 70px 0;
    .padding_left_90{padding-left: 90px;}
    .border_right{border-right: 2px solid #E6E6E6;}
    .padding_90{padding: 0 90px;}
    /*获取验证码*/
    .get_code{background: #E6E6E6;display: inline-block;width: 97px;text-align: center;cursor: pointer;}
  }
  .padding_bottom_120{padding-bottom: 120px;}
</style>
