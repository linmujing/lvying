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
							            <Input v-model="formRight.pwd" size="large" placeholder="请输入密码" style="width: 300px"></Input>
							        </FormItem>
							        <FormItem label="确认密码" prop="rePwd">
							            <Input v-model="formRight.rePwd" size="large" placeholder="请输入重复密码" style="width: 300px"></Input>
							        </FormItem>
							        <FormItem label="验证码" prop="code">
							            <Input v-model="formRight.code" size="large" placeholder="请输入手机验证码" style="width: 200px"></Input>
							            <Button @click="getCode(60)" :disabled="getCodeDisabled" class="get_code"  size="large">获取验证码</Button>
							        </FormItem>
							        <FormItem>
							        	<div>
							        		<Checkbox>我已认真阅读并同意《XXXXX》</Checkbox></a>
							        	</div>
							            <Button @click="naxtStep('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title margin_top_10" style="width: 200px">下一步</Button>
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
            getCodeDisabled: true
        }
    },
    methods: {
    	//密码登录
		naxtStep (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$router.push({path:'/supplier/approver'});
                } else {
                    this.$Message.error('Fail!');
                }
            })
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
