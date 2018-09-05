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
	        					
	        					<p class="margin_top_30 font_18">
	        						还没有账号，
	        						<router-link tag="a" to="/user/userRegister">
										<span class="color_title">立即注册</span>
									</router-link>
	        					</p>
	        					<!--<p class="margin_top_30 font_18">
	        						已有，
	        						<router-link tag="a" to="/userLogin">
										<span class="color_title">立即登录</span>
									</router-link>
	        					</p>-->
	        					
	        					<div class="margin_top_50">
	        						<p class="font_16">使用合作账号登录</p>
	        					</div>
	        					<div class="margin_top_20">
	    							<div class="pointer">
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
	    
    	<Footer></Footer>
		
    </div>
</template>
<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
export default {
    components : {
        Header,
        Footer,
    },
    data() {
        return {
        	
        }
        
    },
    methods: {
    	
    }
}
</script>
<style type="text/css">
	.ivu-tabs-nav .ivu-tabs-tab-active,.ivu-tabs-nav .ivu-tabs-tab:hover{color: #00AA88;}
	.ivu-tabs-ink-bar{background: #00AA88;}
	.ivu-tabs-nav{width: 100%;}
	.ivu-tabs-nav .ivu-tabs-tab{width: 50%;text-align: center;font-size: 24px;}
</style>
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