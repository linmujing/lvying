<template>
    <div class="">
        <div class="login">
        	<img src="../../assets/images/image/loginBg.png" class="all_width min_height_400px"/>
        	<div class="login_box">
        		<div class="box_center_1200">
        			<div class="login_cont">
	        			<Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="60">
					        <FormItem label="手机号" prop="phone">
					            <Input v-model="formRight.phone" size="large" placeholder="请输入手机号码" style="width: 270px"></Input>
					        </FormItem>
					        <FormItem label="密码" prop="pwd">
					            <Input v-model="formRight.pwd" size="large" placeholder="请输入密码" style="width: 270px"></Input>
				            	<div>
				            		<router-link tag="a" to="/supplier/supplierForgotPwd" class="padding_left_10">
				            			<span class="color_link">忘记密码？</span>
				            		</router-link>
				            	</div>
					        </FormItem>
					        <FormItem class="text_center" style="width: 300px">
					            <Button @click="submit('formValidate')" size="large" type="success" shape="circle" class="bg_title width_50">登录</Button>
					        </FormItem>
					    </Form>
					    <div class="text_center color_999">
					    	还没有加盟？
					    	<router-link tag="a" to="/supplier/supplierRegister" class="padding_left_10">
		            			<span class="color_title">立即注册</span>
		            		</router-link>
					    </div>
					    <div class="text_center margin_top_10"> 
					    	<span class="line"></span>
					    	<span class="inline_block">使用合作账号登录</span>
					    	<span class="line"></span>
					    </div>
					    <div class="margin_top_10">
							<div class="pointer text_center">
								<img src="../../assets/images/icon/wx.png" width="30" height="30"/>
								<p class="color_999">微信</p>
							</div>
						</div>
	        		</div>
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
                pwd: ''
            },
            //密码登录验证
            ruleValidate: {
                phone: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' }
                ],
                pwd: [
                	{ required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
    	//密码登录
		submit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
    }
}
</script>
<style scoped lang='less'>
	.login{
		position: relative;
		margin-bottom: 130px;
		.min_height_400px{min-height: 420px;}
		.login_box{
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			margin-top: 15px;
			.login_cont{
				width: 400px;
				float: right;
				border-radius: 4px;
				padding: 40px 20px 20px 20px;
				background: #fff;
			}
			.line{
				width: 80px;
				height: 1px;
				display: inline-block;
				background: #EFEFEF;
				line-height: 20px;
				vertical-align: middle;
				margin: 0 5px;
			}
		}
	}
</style>
