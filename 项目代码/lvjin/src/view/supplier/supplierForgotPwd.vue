<template>
    <div class="">
        <div class="margin_top_50">
    		<Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="100">
		        <FormItem label="手机号" prop="phone">
		            <Input v-model="formRight.phone" size="large" placeholder="请输入手机号" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="验证码" prop="code">
		            <Input v-model="formRight.code" size="large" placeholder="请输入验证码" style="width: 200px"></Input>
		            <span class="get_code">验证码</span>
		            <span class="font_12 pointer color_638CE3 padding_left_5">看不清？换一张</span>
		        </FormItem>
		        <FormItem style="width: 260px">
		            <Button @click="nextStep('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title">下一步</Button>
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
                	{ required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
        
    },
    methods: {
    	//下一步
		nextStep (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$router.push({path:'/user/forgotPwdStep'});
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
	.get_code{background: #E6E6E6;display: inline-block;width: 97px;text-align: center;cursor: pointer;border: 1px solid #999;}
	.padding_bottom_120{padding-bottom: 120px;}
	.color_638CE3{color: #638CE3;}
</style>
