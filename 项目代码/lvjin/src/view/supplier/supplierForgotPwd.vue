<template>
    <div class="">
      <div class="bg_f5 padding_bottom_120">
        <div class="box_center_1200 padding_top_20">
          <div class="bg_white login_box">
            <Row>
              <Col span="14">
                <div class="padding_90 border_right">

                  <div class="margin_top_50">
                    <Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="100">
                      <FormItem label="手机号" prop="phone">
                        <Input v-model="formRight.phone" size="large" placeholder="请输入手机号" style="width: 300px"></Input>
                      </FormItem>
                      <FormItem label="验证码" prop="code">
                        <Input v-model="formRight.code" size="large" placeholder="请输入验证码" style="width: 200px"></Input>
                        <span class="get_code">验证码</span>
                        <span class="font_12 pointer color_link padding_left_5">看不清？换一张</span>
                      </FormItem>
                      <FormItem style="width: 260px">
                        <Button @click="nextStep('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title">下一步</Button>
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
        return {
       		formRight: {
                phone: '',
                code: ''
           	},
            ruleValidate: {
                phone: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                code: [
                	{ required: true, message: '验证码不能为空', trigger: 'blur' }
                ]
            }
        }
        
    },
    methods: {
    	//下一步
		nextStep (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$router.push({path:'/supplier/supplierForgotPwdStep'});
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
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
