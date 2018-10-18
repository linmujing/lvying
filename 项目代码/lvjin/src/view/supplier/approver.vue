<template>
    <div class="">

        <div class="bg_f5 padding_bottom_120">
	        <div class="box_center_1200 padding_top_20">
	        	<div class="bg_white login_box">
	        		<div class="padding_90">

						<el-form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" label-width="120px">
					        <el-form-item label="真实姓名" prop="name">
					            <el-input v-model="formRight.name" size="large" placeholder="请输入真实姓名" style="width: 300px"></el-input>
					        </el-form-item>
                  <el-form-item label="商户名称" prop="merchantName">
                    <el-input v-model="formRight.merchantName" size="large" placeholder="请输入商户名称" style="width: 300px"></el-input>
                  </el-form-item>
					        <el-form-item label="电子邮箱" prop="email">
					            <el-input v-model="formRight.email" size="large" placeholder="请输入电子邮箱" style="width: 300px"></el-input>
					        </el-form-item>
					        <el-form-item label="所在地区" prop="addr">
                    <el-cascader
                      v-model="formRight.addr"
                      placeholder="请选择所在地区"
                      :options="cityList"
                      filterable
                      style="width: 300px"
                      @change="handleChange"
                    ></el-cascader>
					        </el-form-item>
					        <el-form-item label="所在律所/机构" prop="orgName">
					            <el-input v-model="formRight.orgName" size="large" placeholder="请输入所在律所/机构" style="width: 300px"></el-input>
					        </el-form-item>
					        <el-form-item label="律所/机构电话" prop="orgTel">
					            <el-input v-model="formRight.orgTel" size="large" placeholder="请输入律所/机构电话" style="width: 300px"></el-input>
					        </el-form-item>
					        <el-form-item label="律所/机构地址" prop="orgAddr">
					            <el-input v-model="formRight.orgAddr" size="large" placeholder="请输入律所/机构地址" style="width: 300px"></el-input>
					        </el-form-item>
					        <el-form-item label="证件号" prop="idcard">
					            <el-input v-model="formRight.idcard" size="large" placeholder="请输入证件号" style="width: 300px"></el-input>
					            <div>
					            	<span class="font_12 color_999">律师身份请填写执业证号</span>
					            </div>
					        </el-form-item>
					        <el-form-item label="资质扫描件" style="width: 450px">
                    <Upload v-if="showMaterial" action="/api/system/file/upload"
                            :format="['jpg','gif','png']"
                            :show-upload-list="false"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :on-success="materialUrlSuccess"
                            :max-size="10240">
                      <Button>点击上传</Button>
                    </Upload>
                    <div v-else class="relative inline_block">
                      <img :src="materialUrl" width="100" @click="seeImg(materialUrl)" class="pointer">
                      <Icon type="ios-close-circle-outline" color="#00AA88" class="del" @click="delMaterialUrl"/>
                    </div>
							    <div>
							    	<span class="font_12 color_999">扫描件要清晰，支持jpg，png，gif格式，最大不超过10M</span>
							    </div>
					        </el-form-item>
					        <el-form-item label="个人资料" style="width: 420px">
                    <Upload v-if="showInfo" action="/api/system/file/upload"
                            :format="['jpg','gif','png']"
                            :show-upload-list="false"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :on-success="infoUrlSuccess"
                            :max-size="10240">
                      <Button>点击上传</Button>
                    </Upload>
                    <div v-else class="relative inline_block">
                      <img :src="personIntroduce" width="100" @click="seeImg(personIntroduce)" class="pointer">
                      <Icon type="ios-close-circle-outline" color="#00AA88" class="del" @click="delInfoUrl"/>
                    </div>
							    <div>
							    	<span class="font_12 color_999">您可上传个人资料，以便我们更好的了解您</span>
							    </div>
					        </el-form-item>
					        <el-form-item>
					        	<div>
					        		<Checkbox v-model="isAgree">我已认真阅读并同意《XXXXX》</Checkbox>
					        	</div>
					            <Button @click="submit('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title margin_top_10" style="width: 200px">提交</Button>
					        </el-form-item>
					    </el-form>

					</div>
	        	</div>
	        </div>
	    </div>
      <!--查看照片-->
      <Modal title="查看照片" v-model="viewModal">
        <div class="text_center">
          <img :src="viewUrl"/>
        </div>
        <div slot="footer">
          <Button  type="primary" @click="viewModal = false">关闭</Button>
        </div>
      </Modal>

    </div>
</template>
<script>
import province from '../../assets/js/province'
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
            merchantName: '',
            email: '',
            orgRegin: '',
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
            merchantName: [
              { required: true, message: '商户名称不能为空!', trigger: 'blur' }
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
        // 商户资料
        SupplierData: {},
        // 资质扫描件
        materialUrl: '',
        showMaterial: true,
        // 个人资料
        personIntroduce: '',
        showInfo: true,
        // 同意协议
        isAgree: false,
        // 查看照片模态框
        viewModal: false,
        viewUrl: ''
      }
    },
    mounted(){
      // 获取商户信息
      this.SupplierData = JSON.parse(sessionStorage.getItem("SupplierData"))
      console.log(this.SupplierData)
      this.getSupplierData()
      // 地区数据
      this.cityList = province()
      // console.log(this.cityList)
    },
    methods: {
      getSupplierData(){
        var data = this.SupplierData
        data.realName !== '' ? this.formRight.name = data.realName : this.formRight.name = ''
        data.merchantNm !== '' ? this.formRight.merchantName = data.merchantNm : this.formRight.merchantName = ''
        data.email !== '' ? this.formRight.email = data.email : this.formRight.email = ''
        data.orgRegin !== '' ? this.formRight.orgRegin = data.orgRegin : this.formRight.orgRegin = ''
        data.orgName !== '' ? this.formRight.orgName = data.orgName : this.formRight.orgName = ''
        data.orgTel !== '' ? this.formRight.orgTel = data.orgTel : this.formRight.orgTel = ''
        data.orgAddress !== '' ? this.formRight.orgAddr = data.orgAddress : this.formRight.orgAddr = ''
        data.lawerRegistrationNo !== '' ? this.formRight.idcard = data.lawerRegistrationNo : this.formRight.idcard = ''

        if(!data.orgRegin == ''){
          this.formRight.addr = data.orgRegin.split(' ')
          console.log(this.addr)
        }
        if(!data.materialUrl == '' || !data.materialUrl == null || !data.materialUrl == undefined){
          this.materialUrl = data.materialUrl
          this.showMaterial = false
        }
        if(!data.personIntroduce == '' || !data.personIntroduce == null || !data.personIntroduce == undefined){
          this.personIntroduce = data.personIntroduce
          this.showInfo = false
        }
      },
    	//提交
		  submit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // 阅读协议
            if(!this.isAgree){

              this.$Message.error('请阅读协议!');
              return;

            }
            // 资质扫描件验证
            if( this.materialUrl === '' ){

              this.$Message.error('请上传资质扫描件验证');
              return;

            }
            let params = this.$Qs.stringify({ 'merchantCode': this.SupplierData.merchantCode, 'realName': this.formRight.name, 'merchantNm': this.formRight.merchantName, 'email': this.formRight.email, 'orgTel': this.formRight.orgTel, 'orgName': this.formRight.orgName, 'orgRegin': this.formRight.orgRegin, 'orgAddress': this.formRight.orgAddr, 'lawerRegistrationNo': this.formRight.idcard, 'materialUrl': this.materialUrl, 'personIntroduce': this.personIntroduce });
            this.$Spin.show()
            // 商户资料完善
            this.$api.saveMerchantInfo( params )

              .then( (res) => {

                console.log(res)

                if(res.data.code == 200){
                  this.$Spin.hide()
                  this.$Message.success(res.data.message);
                  // 存储用户信息
                  sessionStorage.setItem("SupplierData", JSON.stringify(res.data.content));
                  // this.$store.commit('userData/saveSupplierData', res.data.content);
                  this.$router.push({path:'/supplier/approverStatus'});

                }else{
                  this.$Spin.hide()
                  this.$Message.warning(res.data.message);
                }
              })
              .catch((error) => {
                this.$Spin.hide()
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
      },
      //图片上传成功
      materialUrlSuccess (res, file) {
        this.materialUrl = res.content
        this.showMaterial = false
      },
      // 删除图片
      delMaterialUrl(){
        this.materialUrl = ''
        this.showMaterial = true
      },
      // 查看图片
      seeImg(url){
		    this.viewModal = true
        this.viewUrl = url
      },
      // 个人资料图片上传成功
      infoUrlSuccess (res, file) {
        this.personIntroduce = res.content
        this.showInfo = false
      },
      // 删除个人资料
      delInfoUrl(){
        this.personIntroduce = ''
        this.showInfo = true
      },
      // 选择城市
      handleChange(value){
        console.log(value)
		    var str = ''
        for(var i=0;i<value.length;i++){
          str += value[i] + ' '
        }
        this.formRight.orgRegin = str
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
  .del{
    position: absolute;
    top: -12px;
    right: -12px;
    cursor: pointer;
    font-size: 20px;
  }
</style>
