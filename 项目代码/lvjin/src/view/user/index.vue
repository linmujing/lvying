<template>
    <div class="container">

    	<Header :isLogin='0'></Header>

    	<div class="bg_f5 padding_bottom_120">
	        <div class="box_center_1200 padding_top_20">
	        	<div class="bg_white login_box">
	        		<Row>
	        			<Col span="14">
	        				<div class="padding_90 border_right">

	        					<router-view></router-view>

	        				</div>
	        			</Col>
	        			<Col span="10">
	        				<div class="padding_90 text_center">

	        					<p v-if="show" class="margin_top_30 font_18">
	        						还没有账号，
	        						<router-link tag="a" to="/user/userRegister">
                        <span class="color_title">立即注册</span>
                      </router-link>
	        					</p>
	        					<p v-else class="margin_top_30 font_18">
	        						已有，
	        						<router-link tag="a" to="/user/userLogin">
                        <span class="color_title">立即登录</span>
                      </router-link>
	        					</p>

	        					<div class="margin_top_50">
	        						<p class="font_16">使用合作账号登录</p>
	        					</div>
	        					<div class="margin_top_20">
	    							<div class="pointer" @click="wxLogin">
	    								<img src="../../assets/images/icon/wx.png"/>
	    								<p class="font_18">微信</p>
	    							</div>
	    						</div>
	        				</div>
	        			</Col>
	        		</Row>
	        	</div>
	        </div>
	    </div>

			<!--扫码登录弹框 -->
			<Modal v-model="loginModel"  width="680" footer-hide >
					<p slot="header" >
							<span class="font_18" style="font-weight:400;">微信登录</span>
					</p>
					<div style="width:648px;height:450px;position:relative;">
							<div  style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:300px;height:450px;" >
									<iframe :src="loginUrl"  height="450" frameborder="0" ></iframe>
							</div>
					</div>
			</Modal>

    	<Footer></Footer>
		<Bindphone></Bindphone>

    </div>
</template>
<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import Bindphone from '../../components/Bindphone.vue'
export default {
    components : {
        Header,
		Footer,
		Bindphone
    },
    data() {

        return {
          	show: true,
			name: '',
			loginModel: false,
			loginUrl:'https://open.weixin.qq.com/connect/qrconnect?appid=wxf3264a02ac5f662f&redirect_uri=http://flgk.yohez.com/user/userLogin&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect',
        }

    },
    watch: {
      //监听参数变化
      $route(){
        this.name = this.$route.name
      },
      name() {
        this.show = this.$route.name !== 'userRegister';
      },
    },
    mounted(){

		this.show = this.$route.name !== 'userRegister';
		
		if(this.GetQueryString('code')){
			this.codeLogin();
		}

    },
    methods: {

		// 微信信登陆
		wxLogin(){
			this.loginModel = true;
		},

		// 获取地址栏参数
		GetQueryString(name){
		　　var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		　　var r = window.location.search.substr(1).match(reg);
		　　if(r!=null)
			{
				return unescape(r[2]);
			}
			return null;
		},

		// 通过code登录
		codeLogin(){
			console.log(this.GetQueryString('code'))
			this.$Spin.show();

			let param = this.$Qs.stringify({ 
				'code': this.GetQueryString('code') 
			}) ;
				
			this.$api.pcUserInfo( param )

			.then( (res) => {

				console.log(res)
				this.$Spin.hide();

				if(res.data.code == 200){

					// 存储用户信息
					this.$store.commit('userData/saveUserData', res.data.content);

					//跳转函数*************************************************
					this.$router.push({ name: 'shopMallIdex'})
										
				}else{
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
	/*登录框样式*/
	.login_box{
		padding: 70px 0;
		.padding_left_90{padding-left: 90px;}
		.border_right{border-right: 2px solid #E6E6E6;}
		.padding_90{padding: 0 90px;}
		/*获取验证码*/
		.get_code{background: #E6E6E6;display: inline-block;width: 97px;text-align: center;cursor: pointer;}
	}
	.padding_bottom_120{padding-bottom: 120px;}
</style>
