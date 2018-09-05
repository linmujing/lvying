<template>
    <div class="">
        <div class="">
    		<Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="100">
    			<FormItem label="用户名" prop="name">
		            <Input v-model="formRight.name" size="large" placeholder="请输入用户名" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="手机号" prop="phone">
		            <Input v-model="formRight.phone" size="large" placeholder="请输入手机号" style="width: 300px"></Input>
		        </FormItem>
		         <FormItem label="验证码" prop="code">
		            <Input v-model="formRight.code" size="large" placeholder="请输入手机验证码" style="width: 200px"></Input>
		            <Button :disabled="getCodeDisabled" class="get_code"  size="large">获取验证码</Button>
		        </FormItem>
		        <FormItem label="新密码" prop="pwd">
		            <Input v-model="formRight.pwd" size="large" placeholder="请输入密码" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="确认密码" prop="rePwd">
		            <Input v-model="formRight.rePwd" size="large" placeholder="请输入重复密码" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem style="width: 260px">
		            <Button @click="submit('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title">完成并登录</Button>
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
       			name: '',
                phone: '',
                code: '',
                pwd: '',
                rePwd: '',
           	},
            ruleValidate: {
                name: [
                    { required: true, message: '用户名不能为空!', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号不能为空!', trigger: 'blur' }
                ],
                code: [
                	{ required: true, message: '验证码不能为空!', trigger: 'blur' }
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
            getCodeDisabled: true
        }
        
    },
    methods: {
    	//下一步
		submit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
    }
}
</script>
<style scoped lang='less'>
	/*验证码*/
	.get_code{background: #E6E6E6;display: inline-block;width: 97px;text-align: center;}
	.padding_bottom_120{padding-bottom: 120px;}
	.color_638CE3{color: #638CE3;}
</style>
