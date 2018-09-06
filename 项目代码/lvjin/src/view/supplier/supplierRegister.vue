<template>
    <div class="">
        <div>
        	
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
		naxtStep (name) {
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
	
</style>
