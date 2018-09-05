<template>
    <div class="">
        <Tabs value="psdLogin">
			<!--密码登录-->
	        <TabPane label="密码登录" name="psdLogin">
	        	<div class="margin_top_50">
	        		<Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="100">
				        <FormItem label="用户名" prop="name">
				            <Input v-model="formRight.name" size="large" placeholder="请输入用户名" style="width: 300px"></Input>
				        </FormItem>
				        <FormItem label="密码" prop="pwd">
				            <Input v-model="formRight.pwd" size="large" placeholder="请输入密码" style="width: 300px"></Input>
			            	<router-link tag="a" to="/user/forgotPwd" class="padding_left_10">忘记密码？</router-link>
				        </FormItem>
				        <FormItem style="width: 260px">
				            <Button @click="pwdSubmit('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title">登录</Button>
				        </FormItem>
				    </Form>
	        	</div>
	        </TabPane>
	        <!--验证码登录-->
	        <TabPane label="手机验证码登录" name="codeLogin">
	        	<div class="margin_top_50">
	        		<Form ref="formValidate1" :model="formRight1" :rules="ruleValidate1" label-position="right" :label-width="100">
				        <FormItem label="手机号" prop="phone">
				            <Input v-model="formRight.name" size="large" placeholder="请输入手机号" style="width: 300px"></Input>
				        </FormItem>
				        <FormItem label="验证码" prop="code">
				            <Input v-model="formRight.code" size="large" placeholder="请输入手机验证码" style="width: 200px"></Input>
				            <Button @click="getCode(60)" :disabled="getCodeDisabled" class="get_code"  size="large">获取验证码</Button>
				        </FormItem>
				        <FormItem style="width: 260px">
				            <Button @click="codeSubmit('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title">登录</Button>
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
       		formRight: {
                name: '',
                pwd: ''
            },
            //密码登录验证
            ruleValidate: {
                name: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                pwd: [
                	{ required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            //手机验证登录
            formRight1: {
                phone: '',
                code: ''
            },
            //密码登录验证
            ruleValidate1: {
                phone: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                code: [
                	{ required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            //验证码按钮
            getCodeDisabled: true
        }
        
    },
    methods: {
    	//密码登录
		pwdSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        //手机验证登录
		codeSubmit (name) {
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
	/*获取验证码*/
	.get_code{background: #E6E6E6;display: inline-block;width: 97px;text-align: center;}
	.padding_bottom_120{padding-bottom: 120px;}
</style>
