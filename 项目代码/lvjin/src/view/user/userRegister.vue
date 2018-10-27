<template>
    <div class="">
        <div class="margin_top_30">
    		<Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="100">
		        <!-- <FormItem label="用户名" prop="name">
		            <Input v-model="formRight.name" size="large" placeholder="请输入用户名" style="width: 300px"></Input>
		        </FormItem> -->
		        <FormItem label="手机号码" prop="phone">
		            <Input v-model="formRight.phone" size="large" placeholder="请输入手机号码" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="密码" prop="pwd">
		            <Input v-model="formRight.pwd" type="password" size="large" placeholder="请输入密码" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="确认密码" prop="rePwd">
		            <Input v-model="formRight.rePwd" type="password" size="large" placeholder="请输入重复密码" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="验证码" prop="code">
		            <Input v-model="formRight.code" size="large" placeholder="请输入手机验证码" style="width: 200px"></Input>
		            <Button @click="sendVerifyCiPhone" :disabled="isSend" class="get_code"  size="large"> {{isSendText}} </Button>
		        </FormItem>
		        <FormItem>
		        	  <Checkbox v-model="isAgree">我已认真阅读并同意</Checkbox>
                <span class="pointer" @click="modal1 = true">《用户注册协议》</span>
		            <Button @click="clickRegister('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title margin_top_10" style="width: 260px">完成并登录</Button>
		        </FormItem>
		    </Form>
    	</div>
      <Modal
        v-model="modal1"
        title="用户注册协议"
        width="80%%"
        @on-ok="确定">
        在此特别提醒您在注册成为用户之前,请认真阅读本《用户注册协议》(以下简称“本协议”),确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。您同意并点击确认本协议条款且完成注册程序后,才能成为注册用户,并享受购买相关商品、获得相关服务的权利。您的注册、登录、使用等行为将视为对本协议的完全同意,并自愿接受本协议各项条款的约束。若您不同意本协议,或对本协议中的条款存在任何疑问,请您立即停止注册。本协议条款是北京律瀛教育咨询有限公司（以下称“平台公司”）与用户之间达成购买平台公司产品的协议，请您务必仔细阅读。
        【平台介绍】
        正胜法律风险管控平台（以下简称“平台”。“平台公司”与“平台”被理解为同一法律主体）是为国家机关、企事业单位、个人提供法律风险防控和深度学习法律知识的平台。
        平台追求的目标是：把法律工作的重点放到预防阶段，不要到打官司时才想起律师，为国家机关依法行政献力，为企事业单位合法经营管理保驾护航，为个人有效防控法律风险出谋划策，为全面依法治国提供一点力所能及的力量。
        平台提供的各类法律风险防控产品，涉及到国家机关、企事业单位、个人各个层级的法律需求，无论是依法行政、行权标准化管理、人力资源管理、合同管理、财务管理、招投标管理、公司治理、股权管理、诉讼管理、婚姻家庭、交通事故、继承析产、债权债务等领域，涉及到的法律问题在事前、事中、事后寻找到相关的风险提示、预防措施，在使用中，所涉及到的合同文本、制度、流程，表单、使用说明书、可视化管理图、岗位标准化图、合同履行自检表、法律风险点防控手册等独创的文本资料，可以下载使用，在使用中对每一份资料都有详细的音频、视频解读，易看、易学、易懂、易用。是注册用户防控法律风险有效、省力、省钱的好平台。
        【权利义务】
        您必须全部同意并接受以下条款，才能够注册为用户，如果不全部同意本协议条款，请您立即停止注册。
        第一条	自愿申请成为用户，并承诺遵守平台规则和各种管理
        规定。
        第二条 注册用户注册以后，并未获得相关产品的使用权，需要通过购买而获得。
        第三条 平台产品众多，用户只对自己已经购买的产品享有使用权，对未购买的产品不享有任何权利。
        第四条 用户购买的商品，是智力成果的电子化形式，用户付款后，系统自动开通用户购买商品的可以查看、阅读权限，只要具有可以查看、阅读的权限，即视为购买商品已经交付，用户是否实际查看、阅读、下载，与平台无关。
        第五条 除律瀛商城的商品以外，其他商品属于电子数据表现商品，一律不退不换，介意的，请勿注册、请勿购买。

        第六条 平台提供的所有商品所涉及到的咨询解答意见、法律风险诊断、评估、解决措施与方案，音视频课程的意见、观点、方法，合同、制度、流程、文本、表单等等文件，全部仅供用户参考，不作为法律依据，不作为用户免责的法律依据，用户自己独立的决定是否参考使用，用户一旦采用，产生的一切法律后果由用户自己承担。
        第七条 用户购买商品后，商品具体内容仅限于用户自己使用，不得用作其他任何目的；用户不得对外传播、披露、出版、发行，不得在公开场合进行宣传；用户不得对购买的商品进行售卖、赠与、转让、许可任何单位和个人；用户不得以盈利为目的对平台商品编辑、改编，否则，一旦发现上述行为之一的，立即关闭用户使用权限并终止本协议，已付购买商品价款不退。造成平台损失，依法追究法律责任。
        第八条 在任何情况下，本平台的内容、意见、观点、方法不得为用户及用户之外的其他任何人所依赖或援引，或者将本平台的内容、意见、观点、方法作为自身履行法定职责的依据，或用以证明自己勤勉尽责及减免法律责任目的，或用于任何可能不符合现行中国法律之处。
        第九条 用户购买商品后，在发生以下情况时，商品查阅、观看权利关闭，服务停止，用户已付款项不退：
        9.1 不可抗力导致平台关闭；
        9.2 由于法律法规、政府相关部门、司法部门要求平台关闭；
        9.3 平台公司经营不善、资不抵债，无法继续经营；
        9.4 平台公司破产；
        9.5 电信、金融、第三方支付及其他第三方原因导致平台无法继续运营；
        9.6 遭到病毒、黑客攻击平台系统无法恢复的；
        第十条 用户购买音、视频课程两年后，平台有权单方决定下架，届时用户无法再观看。
        第十一条 平台会为注册用户提供专门的账号和密码，用户要严格保管密码，由于密码保管不善，造成损失，由用户自己承担相应后果。帐号仅限于用户本人使用,严禁将您的帐号允许第三人使用,否则平台有权立即终止本协议，用户应承担由此产生的全部责任。
        第十二条 行业动态管控系统、法律动态管控系统所有文件、资料，用户要严格保密，绝对禁止向任何第三方披露、销售或者授权第三方使用，一旦发现用户向平台支付已付款双倍金额的违约金。
        第十三条 音、视频内容只能在线观看和听，禁止用户对平台音、视频内容进行拷贝、翻录，一旦发现，立即关闭用户权限、终止本协议，用户应向平台支付人民币贰佰万元违约金。
        第十四条 用户在平台下载的文件资料，不得在平台原有成果基础上进行改编和再创作后对外传播、出版、发行。
        第十五条 平台有权基于单方独立判断，在其认为可能发生危害交易安全等情形时，不经通知而先行暂停、中断或关闭终止用户，并将注册资料移除或删除，且无需对用户承担任何责任。前述情形包括但不限于：
        15.1 用户注册资料不真实，提供虚假注册信息，冒用其他单位或者个人名义注册；
        15.2 本平台发现用户目的是为了窃取平台资料、文件；
        15.3 本平台发现注册用户是同行业或者类似行业竞争对手；
        15.4 本平台认为用户的账户涉嫌洗钱、套现、传销、被冒用或其他平台认为有风险之情形；
        15.5 本平台认为用户已经违反本协议中规定的各类规则及损害平台利益时。
        第十六条 基于互联网的特殊性，平台无法保证本平台的服务不会中断，对于包括但不限于平台及相关第三方的设备、系统存在缺陷，电力系统、电信系统、计算机发生故障、遭到病毒、黑客攻击或其他非平台技术能力范围内的事因等造成的服务中断、用户数据丢失、出现乱码、错误接收、无法接收、迟延接收、不能有效上传、下载、修改信息、平台事先在网站公告系统停机维护、用户银行的原因导致的服务中断或延迟的、或者发生地震、海啸、等不可抗力而造成服务中断或因此给用户造成的损失，平台不承担任何责任，有关损失由用户自担。
        第十七条 平台合作的第三方机构向用户提供的服务由第三方机构自行负责，平台不对此等服务承担任何责任。
        第十八条 用户注册时，必须提供真实姓名、身份证号码、电子邮箱、通讯地址，并绑定验证手机号，用户在注册时向本平台提交的姓名、身份证号码、手机号、电子邮箱、用户名、密码是用户在本平台的识别信息。用户注册成功后，应当妥善保管用户名和密码，并对自己的用户名、密码安全性负责，不得将用户名、密码，转让、赠与或授权给第三方使用。用户确认使用用户名和密码登陆本平台后在本平台的一切行为以及以用户在本平台注册时提交的电子邮箱发送邮件的行为均为用户本人操作，并承担相应的法律后果，本平台不承担任何责任。
        第十九条 平台的所有内容，包括但不限于思路、流程、方案、网站结构与布局、网站基准色调、文本、数据、图片、音频、视频、源代码和其他所有信息，均由平台享有全部知识产权。未经本平台事先书面同意，不得复制、模仿、改编、传播、公布、展示或以任何其他方式侵犯本平台的知识产权。未经本平台书面同意,用户不得将本平台的任何产品、任何内容发布到任何其他平台或者服务器，包括用户提供的商品。任何未经授权对本平台内容的使用均属于违法行为，平台有权停止、关闭用户资格，并追究法律责任。
        第二十条 用户不得对平台或其内容进行转售或商业利用；不得收集和利用动态管控逻辑关系、商品类别、目录、说明和价格；不得对平台或其内容进行任何衍生利用；不得为其他商业利益而下载或拷贝账户信息或使用任何数据采集、收集和摘录工具。未经平台的书面许可，严禁对平台的内容进行系统获取以直接或间接创建或编辑文集、汇编、数据库或人名地址录（无论是否通过Robots、Spiders、自动仪器、手工操作或者其他手段），严禁为任何未经本协议明确允许的目的而使用平台上的内容和材料。
        第二十一条 本协议在履行中产生争议，平台公司与用户友好协商解决，协商不成向北京仲裁委员会提起仲裁解决。
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

			formRight: {
                phone: '',
                pwd: '',
                rePwd: '',
                code: '',
            },

            //密码登录验证
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
                ],
            },

            //验证码按钮
            isSend: false,
            isSendText: '获取验证码',
            // 同意协议
            isAgree: false,
            modal1: false
        }

    },
    methods: {

		// 点击注册
		clickRegister (name) {
          this.$refs[name].validate((valid) => {
            if (valid) {

              let reg = new RegExp(/^1(3|4|5|7|8)\d{9}$/);

              // 正则验证手机号
              if( !reg.test(this.formRight.phone) ){

                this.$Message.error('请填写正确的手机号!');
                return;

              }

              // 验证密码
              if(this.formRight.pwd == ""){

                this.$Message.error('密码不能为空!');
                return;

              }
              if(this.formRight.rePwd == ""){

                this.$Message.error('请确认密码!');
                return;

              }
              if( this.formRight.pwd != this.formRight.rePwd  ){

                this.$Message.error('密码输入不一致，请重新输入!');
                return;

              }

              // 确认验证码
              if(this.formRight.code == ""){
                console.log(1111)
                this.$Message.error('验证码不能为空!');
                return;

              }
              // 阅读协议
              if(!this.isAgree){

                this.$Message.error('请阅读协议!');
                return;

              }

              // 判断手机号是否已被注册
              this.$api.verifyCiPhone( this.$Qs.stringify({ 'ciPhone': this.formRight.phone }) )

                .then( (res) => {

                  console.log(res)

                  if(res.data.code == 200){

                    this.$Message.warning('该帐号已经注册!');
                    return;

                  }else if (res.data.code == 500){
                    // 注册
                    this.registerFn();

                  }
                })
                .catch((error) => {

                  console.log('发生错误！', error);

                });
            }
          })
        },

        // 注册
        registerFn (){

            let params = this.$Qs.stringify({ 'ciPhone': this.formRight.phone, 'passWord': this.formRight.pwd, 'smsCode': this.formRight.code, merchantCode: '' })

            // 注册
            this.$api.addCustomerInfo( params )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    this.loginFn( this.formRight.phone, this.formRight.pwd, '');
                    // this.$Message.success(res.data.message);

                }else{

                    this.$Message.warning(res.data.message);

                }

                this.$Spin.hide();

            })
            .catch((error) => {

                console.log('发生错误！', error);

            });

        },

        // 发送短信验证码
        sendVerifyCiPhone(){

            // 正则验证手机号
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.formRight.phone ))){

                this.$Message.error('请填写正确的手机号!');
                return;

            }

            // 判断手机号是否已注册
            this.$api.verifyCiPhone( this.$Qs.stringify({ 'ciPhone':  this.formRight.phone }) )

            .then( (res) => {

                console.log(res)

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

        // 登录
        //@param ciPhone 电话号码
        //@param passWord 密码
        //@param smsCode 手机验证码
        loginFn( ciPhone, passWord){
            this.$Spin.show();
            this.$api.login( this.$Qs.stringify({ 'ciPhone': ciPhone, 'passWord': passWord }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){
                    this.$Spin.hide();
                    this.$Message.success(res.data.message);

                    // 存储用户信息
                    this.$store.commit('userData/saveUserData', res.data.content);
                    // console.log(this.$store.state.userData.UserData)
                    // this.$router.push({ name: '', params: {id: id}})

                    //跳转函数*************************************************
                    this.$router.push({ name: 'shopMallIdex'})

                }else{
                    this.$Spin.hide();
                    this.$Message.warning(res.data.message);

                }

            })
            .catch((error) => {

                this.$Spin.hide();
                console.log('发生错误！', error);

            });

        },


    }
}
</script>
<style scoped lang='less'>
	/*获取验证码*/
	.get_code{background: #E6E6E6;display: inline-block;width: 97px;text-align: center;}
</style>
