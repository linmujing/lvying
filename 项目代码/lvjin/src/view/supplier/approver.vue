<template>
    <div class="">
    	
        <div class="bg_f5 padding_bottom_120">
	        <div class="box_center_1200 padding_top_20">
	        	<div class="bg_white login_box">
	        		<div class="padding_90">
	        					
						<Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="100">
					        <FormItem label="真实姓名" prop="name">
					            <Input v-model="formRight.name" size="large" placeholder="请输入真实姓名" style="width: 300px"></Input>
					        </FormItem>
					        <FormItem label="电子邮箱" prop="email">
					            <Input v-model="formRight.email" size="large" placeholder="请输入电子邮箱" style="width: 300px"></Input>
					        </FormItem>
					        <FormItem label="所在地区" prop="addr">
					             <Select v-model="formRight.addr" size="large" filterable style="width: 300px">
					                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					            </Select>
					        </FormItem>
					        <FormItem label="所在律所/机构" prop="orgName">
					            <Input v-model="formRight.orgName" size="large" placeholder="请输入所在律所/机构" style="width: 300px"></Input>
					        </FormItem>
					        <FormItem label="律所/机构电话" prop="orgTel">
					            <Input v-model="formRight.orgTel" size="large" placeholder="请输入律所/机构电话" style="width: 300px"></Input>
					        </FormItem>
					        <FormItem label="律所/机构地址" prop="orgAddr">
					            <Input v-model="formRight.orgAddr" size="large" placeholder="请输入律所/机构地址" style="width: 300px"></Input>
					        </FormItem>
					        <FormItem label="证件号" prop="idcard">
					            <Input v-model="formRight.idcard" size="large" placeholder="请输入证件号" style="width: 300px"></Input>
					            <div>
					            	<span class="font_12 color_999">律师身份请填写执业证号</span>
					            </div>
					        </FormItem>
					        <FormItem label="资质扫描件" style="width: 420px">
					             <Upload action="//jsonplaceholder.typicode.com/posts/" 
					             		:format="['jpg','gif','png']"
					             		:on-format-error="handleFormatError"
					             		:on-exceeded-size="handleMaxSize"
        								:max-size="10240">
							        <Button>点击上传</Button>
							    </Upload>
							    <div>
							    	<span class="font_12 color_999">扫描件要清晰，支持jpg，png，gif格式，最大不超过10M</span>
							    </div>
					        </FormItem>
					        <FormItem label="个人资料" style="width: 420px">
					             <Upload action="//jsonplaceholder.typicode.com/posts/" 
					             		:format="['jpg','gif','png']"
					             		:on-format-error="handleFormatError"
					             		:on-exceeded-size="handleMaxSize"
        								:max-size="10240">
							        <Button>点击上传</Button>
							    </Upload>
							    <div>
							    	<span class="font_12 color_999">您可上传个人资料，以便我们更好的了解您</span>
							    </div>
					        </FormItem>
					        <FormItem>
					        	<div>
					        		<Checkbox v-model="isAgree">我已认真阅读并同意《XXXXX》</Checkbox>
					        	</div>
					            <Button @click="submit('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title margin_top_10" style="width: 200px">提交</Button>
					        </FormItem>
					    </Form>
						
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
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请正确填写邮箱'));
        } else {
          if (value !== '') {
            var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(!reg.test(value)){
              callback(new Error('请输入有效的邮箱'));
            }
          }
          callback();
        }
      };
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('机构电话不可为空'));
        } else {
          if (value !== '') {
            var reg =/^((0\d{2,3}-\d{7,8})|(1[345678]\d{9}))$/;
            if(!reg.test(value)){
              callback(new Error('请输入正确的手机号或者座机号格式为：0000-0000000'));
            }
          }
          callback();
        }
      };
      return {
        formRight: {
            name: '',
            email: '',
            addr: [],
            orgName: '',
            orgTel: '',
            orgAddr: '',
            idcard: ''
        },
        //资料验证
        ruleValidate: {
            name: [
              { required: true, message: '姓名不能为空!', trigger: 'blur' }
            ],
            email: [
              { required: true, message: '邮箱不能为空!', trigger: 'blur' },
              { validator: validateEmail, trigger: 'blur' }
            ],
            addr: [
              { required: true, message: '请选择所在地区', trigger: 'blur' }
            ],
            orgName: [
              { required: true, message: '律所/机构不能为空!', trigger: 'blur' }
            ],
            orgTel: [
              { required: true, message: '律所/机构电话不能为空!', trigger: 'blur' },
              { validator: validatePhone, trigger: 'blur' }
            ],
            orgAddr: [
              { required: true, message: '律所/机构所在地址不能为空!', trigger: 'blur' }
            ],
            idcard: [
              { required: true, message: '证件号不能为空!', trigger: 'blur' }
            ]
        },
        //验证码按钮
        getCodeDisabled: true,
        //城市列表
        cityList: [
            {
                value: '天津',
                label: '天津'
            },
            {
                value: '长沙',
                label: '长沙'
            }
        ],
        // 商户编号
        merchantCode: '',
        // 资质扫描件
        materialUrl: '',
        // 个人资料
        personIntroduce: '',
        // 同意协议
        isAgree: false
      }
    },
    mounted(){
      console.log(this.$store.state.userData.SupplierData)
    },
    methods: {
    	//密码登录
		  submit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // 阅读协议
            if(!this.isAgree){

              this.$Message.error('请阅读协议!');
              return;

            }
            // 资质扫描件验证
            if( materialUrl !== '' ){

              this.$Message.error('请上传资质扫描件验证');
              return;

            }
            let params = this.$Qs.stringify({ 'merchantCode': this.merchantCode, 'realName': this.formRight.name, 'email': this.formRight.email, 'orgTel': this.formRight.orgTel, 'orgName': this.formRight.orgName, 'orgRegin': this.formRight.addr, 'orgAddress': this.formRight.orgAddr, 'lawerRegistrationNo': this.formRight.idcard, 'materialUrl': this.formRight.materialUrl, 'personIntroduce': this.formRight.personIntroduce });
            this.$Loading.start();
            // 商户资料完善
            this.$api.saveMerchantInfo( params )

              .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                  this.$Message.success(res.data.message);
                  // this.$router.push({path:'/supplier/approverStatus'});

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
          } else {
            this.$Message.error('请完善信息');
          }
        })
      },
      //图片格式
      handleFormatError (file) {
        this.$Message.warning({
          content: '图片格式只能为jpg、png、gif!'
        });
      },
      //图片上传尺寸
      handleMaxSize (file) {
        this.$Message.warning({
          content: '上传图片过大，最大不能超过10M'
        });
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
	}
	.padding_bottom_120{padding-bottom: 120px;}
</style>
