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
							            <Input type="password" v-model="formRight.pwd" size="large" placeholder="请输入密码" style="width: 300px"></Input>
							        </FormItem>
							        <FormItem label="确认密码" prop="rePwd">
							            <Input type="password" v-model="formRight.rePwd" size="large" placeholder="请输入重复密码" style="width: 300px"></Input>
							        </FormItem>
							        <FormItem label="验证码" prop="code">
							            <Input v-model="formRight.code" size="large" placeholder="请输入手机验证码" style="width: 200px"></Input>
							            <Button @click="sendVerifyCiPhone()" :disabled="isSend" class="get_code"  size="large"> {{isSendText}} </Button>
							        </FormItem>
							        <FormItem>
							        	<div>
							        		<Checkbox v-model="isAgree">我已认真阅读并同意</Checkbox>
                          <span class="pointer" @click="modal1 = true">《提供商注册协议》</span>
							        	</div>
							            <Button @click="nextStep('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title margin_top_10" style="width: 200px">下一步</Button>
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
      <Modal
        v-model="modal1"
        title="提供商注册协议"
        width="80%%"
        @on-ok="确定">
        <p style="text-align: justify;line-height:28px;">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在此特别提醒您在注册成为提供商之前,请认真阅读本《提供商注册协议》(以下简称“本协议”),确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。您同意并点击确认本协议条款且完成注册程序后,才能成为提供商注册用户,并享受提供商的提供产品上架销售和分配销售款项的权利。您的注册、登录、使用等行为将视为对本协议的完全同意,并自愿接受本协议各项条款的约束。若您不同意本协议,或对本协议中的条款存在任何疑问,请您立即停止注册提供商用户。本协议条款是北京律瀛教育咨询有限公司（以下称“平台公司”）与提供商之间达成提供智力成果进行销售的权利义务约定，请您务必仔细阅读。
        <br><br> <b>【平台介绍】</b>
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正胜法律动态管控平台（以下简称“平台”。“平台公司”与“平台”被理解为同一法律主体）是为国家机关、企事业单位、个人提供法律风险防控系统和深度学习法律知识的平台。法律风险管理分为行业风险管理和法律风险管理，风险管理的第一大特点是系统、全面管控某一领域、某一板块、某一风险点，根据不同的内容，涉及到相应的制度、流程、文本、表单、保密模板、使用说明可以下载，对每一环节、文本进行详细的音视频加文字解读；风险管理的第二大特点是按照独创的研发流程与步骤，结合人工智能技术逐步实现全程、动态防控法律风险。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有丰富经验的资深律师并在某一法律业务领域有独到见解的，可以申请作为平台的提供商（以下简称“提供商”），按照本平台统一研发的方法、流程、步骤，将智力成果变成可复制的法律产品，上传本平台经审核通过后，面向国家机关、企事业单位、个人，法务、律师进行销售，并按照一定比例获得报酬。
        <br><br> <b>【权利义务】</b>
        <br>您必须全部同意并接受以下条款，才能够注册为提供商，如果不全部同意本协议条款，请您立即停止注册。
        <br>第一条	自愿申请成为提供商，并承诺遵守平台规则和各种管理规定。
        <br>第二条 提供商提供的法律智力成果（以下简称“商品”）平台与提供商双方共同享有著作权，商品在平台进行销售，享有按实际销售金额的20%获得报酬的权利，在20年内，提供商不得单方提出下架停止销售。2020年1月1日以后提供商的分配比例会减低，但平台另行书面承诺的情况除外。
        <br>第三条 提供商不提供商品的，也可以销售其他提供商的商品，提供商销售自己的商品或者其他提供商的商品，享有按实际销售金额的20%获得报酬的权利。
        <br>第四条 提供商提供的商品，平台有权单方决定销售价格、上架销售、下架终止销售，平台在未通知提供商的情况下有权直接决定并采取上述行为。
        <br>第五条 提供商同意并配合平台进行各种不同形式促销打折，同意平台对不同提供商的商品进行组合降价销售。
        <br>第六条 提供商提供的商品不得侵犯其他任何单位和个人的合法权利，一旦发现，平台立即下架，提供商从平台获得的提成金额双倍返还给平台，造成平台损失的，包括直接损失和名誉损失，应当赔偿。
        <br>第七条 提供商提供的商品要求具有独创性、价值性、合法性、准确性。提供的音视频内容应当易看、易学、易懂、易用，录制的声音、图像清晰；提供的合同、制度、流程、文本、表单行文流畅、简单易用、通俗易懂，没有错别字和病句。
        <br>第八条 所有音频课程应当编辑加上平台提供的开头和结尾。
        <br>第九条 提供商提供行业管控或者法律管控产品研发的，平台给予技术指导，按平台独创的研发流程和逻辑关系进行研发，商品上架销售后，提供商要与时俱进的升级和完善，力求做到独创、合法、准确、有深度、高质量，提供商对自己提供的产品质量负责。
        <br>第十条 平台判定提供商提供的产品存在需要完善、升级时，平台发出短信或者系统内消息提醒，发出提醒后15日内，产品未完善、升级的，平台将寻求其他专业律师进行完善、升级，这种情况一旦发生，提供商分配比例每次在通知后未进行完善、升级的将会降低减少1%的分配比例，但最低不低于2%。
        <br>第十一条 平台会为注册为提供商的用户提供专门的账号和密码，提供商账号可以绑定银行卡，绑定的银行卡，可以用于销售分成款项提现，提供商要严格保管密码，由于密码保管不善，造成损失，由提供商自己承担相应后果。帐号仅限于提供商本人使用,严禁将您的帐号允许第三人使用,否则平台有权单方决定是否终止本协议，提供商应承担由此产生的全部责任,并与实际使用人承担连带责任。
        <br>第十二条 每次销售，系统会自动将销售分配金额同步划转到提供商账号下，提供商随时可以通过绑定的银行卡提现。提供商发出提现申请后48小时内，平台会操作向提供商绑定的银行卡转账。
        <br>第十三条 平台系统会自动为提供商生成专属的销售二维码或者特定的链接，能够自动识别提供商销售业绩，并将实际销售获得的分配金额同步转到提供商账户名下，并可以随时发出提现申请，提供商发出提现申请后48小时内，平台会操作向提供商绑定的银行卡转账。
        <br>第十四条 提供商一旦提供商品，在20年内，不得单方暂停、中断或终止本协议，提供商不得在其他平台低于本平台的价格进行销售。否则按商品标价每天销售一件商品乘以剩余天数所得金额的30%向平台支付违约金。
        <br>第十五条 平台有权基于单方独立判断，在其认为可能发生危害交易安全等情形时，不经通知而先行暂停、中断或终止提供商的商品下架，并将注册资料移除或删除，且无需对提供商承担任何责任。前述情形包括但不限于：
        <br>15.1本平台认为提供商提供的相关资料不具有真实性、有效性或完整性；
        <br>15.2 本平台发现异常交易或有疑义或有违法之虞时；
        <br>15.3 本平台认为提供商的账户涉嫌洗钱、套现、传销、被冒用或其他平台认为有风险之情形；
        <br>15.4 提供商提供的商品被司法机关、政府相关部门责令下架的；
        <br>15.5 商品存在合法性瑕疵或者严重质量问题，经提醒不完善、升级的；
        <br>15.6 本平台认为提供商已经违反本协议中规定的各类规则及损害平台利益时。
        <br><br><b>【免责声明】</b>
        <br>第十六条 基于互联网的特殊性，平台无法保证本平台的服务不会中断，对于包括但不限于平台及相关第三方的设备、系统存在缺陷，电力系统、电信系统、计算机发生故障、遭到病毒、黑客攻击或其他非平台技术能力范围内的事因等造成的服务中断、提供商数据丢失、出现乱码、错误接收、无法接收、迟延接收、不能有效上传、下载、修改信息、平台事先在网站公告系统停机维护、提供商银行的原因导致的服务中断或延迟的、或者发生地震、海啸、等不可抗力而造成服务中断或因此给用户造成的损失，平台不承担任何责任，有关损失由提供商自担。
        <br>第十七条 平台合作的第三方机构向提供商提供的服务由第三方机构自行负责，平台不对此等服务承担任何责任。
        <br>第十八条 提供商注册时，必须提供真实姓名、身份证号码、电子邮箱、通讯地址，并绑定验证手机号，提供商在注册时向本平台提交的姓名、身份证号码、手机号、电子邮箱、用户名、密码是提供商在本平台的识别信息。提供商注册成功后，应当妥善保管用户名和密码，并对自己的用户名、密码安全性负责，不得将用户名、密码，转让、赠与或授权给第三方使用。提供商确认使用用户名和密码登陆本平台后在本平台的一切行为以及以提供商在本平台注册时提交的电子邮箱发送邮件的行为均为提供商本人操作，并承担相应的法律后果，本平台不承担任何责任。
        <br><br><b>【知识产权】</b>
        <br>第十九条 平台的所有内容，包括但不限于思路、流程、方案、网站结构与布局、网站基准色调、文本、数据、图片、音频、视频、源代码和其他所有信息，均由平台享有全部知识产权。未经本平台事先书面同意，不得复制、模仿、改编、传播、公布、展示或以任何其他方式侵犯本平台的知识产权。未经本平台书面同意,提供商不得将本平台的任何产品、任何内容发布到任何其他平台或者服务器，包括提供商提供的商品。任何未经授权对本平台内容的使用均属于违法行为，平台有权追究法律责任。提供商未经平台的明确书面同意不许下载（除了页面缓存）或修改平台或其任何部分。
        <br>第二十条 提供商不得对平台或其内容进行转售或商业利用；不得收集和利用产品目录、说明和价格；不得对平台或其内容进行任何衍生利用；不得为其他商业利益而下载或拷贝账户信息或使用任何数据采集、收集和摘录工具。未经平台的书面许可，严禁对平台的内容进行系统获取以直接或间接创建或编辑文集、汇编、数据库或人名地址录（无论是否通过Robots、Spiders、自动仪器、手工操作或者其他手段），严禁为任何未经本协议明确允许的目的而使用平台上的内容和材料。
        <br><br><b>【争议解决】</b>
        <br>第二十一条 本协议在履行中产生争议，平台公司与提供商友好协商解决，协商不成向北京仲裁委员会提起仲裁解决。
        <br>第二十二条 提供商提供的商品被第三方侵权的，由平台对第三方提起侵权救济，必要时提起诉讼。
        </p>
      </Modal>
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
          modal1: false,
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
          isSend: false,
          isSendText: '获取验证码',
          // 同意协议
          isAgree: false
        }
    },
    methods: {
    	//下一步
		  nextStep (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              // 阅读协议
              if(!this.isAgree){

                this.$Message.error('请阅读协议!');
                return;

              }
              let reg = new RegExp(/^1[3456789]\d{9}$/);

              // 正则验证手机号
              if( !reg.test(this.formRight.phone) ){

                this.$Message.error('请填写正确的手机号!');
                return;

              }
              let params = this.$Qs.stringify({ 'merchantPhone': this.formRight.phone, 'passWord': this.formRight.pwd, 'smsCode': this.formRight.code })
              this.$Spin.show()
              // 注册
              this.$api.addMerchantInfo( params )

                .then( (res) => {

                  console.log(res)

                  if(res.data.code == 200){
                    this.$Spin.hide()
                    this.$Message.success(res.data.message);
                    // 存储用户信息
                    sessionStorage.setItem("SupplierData", JSON.stringify(res.data.content));
                    // this.$store.commit('userData/saveSupplierData', res.data.content);
                    // console.log(this.$store.state.userData.SupplierData)
                    this.$router.push({path:'/supplier/approver'});

                  }else{
                    this.$Spin.hide()
                    this.$Message.warning(res.data.message);

                  }

                })
                .catch((error) => {

                  this.$Spin.hide()
                  console.log('发生错误！', error);

                });
            }
        })
      },
      // 发送短信验证码
      sendVerifyCiPhone(){

        // 正则验证手机号
        if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.formRight.phone ))){

          this.$Message.error('请填写正确的手机号!');
          return;

        }
        // 判断手机号是否已注册
        this.$api.verifyMerchantPhone( this.$Qs.stringify({ 'merchantPhone':  this.formRight.phone }) )

          .then( (res) => {

            // console.log(res)

            if(res.data.code == 200){

              this.$Message.error('该帐号已经注册!');
              return;

            }else if(res.data.code == 500){

              // 发送验证码
              this.$api.sendSms( this.$Qs.stringify({ 'phoneNo': this.formRight.phone, 'type': '1' }) )

                .then( (res) => {

                  console.log(res)

                  if(res.data.code == 200){
                    this.$Message.success(res.data.message);
                    this.sendTimeOut();

                  }else {
                    this.$Message.error(res.data.message);
                  }

                })

            }

          })
          .catch((error) => {

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
