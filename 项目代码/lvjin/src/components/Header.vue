<template>
	<div class="content">
		<div class="header">
			<div class="top">
				<div class="center clearfix">
					<div class="float_left">
						<router-link tag="a" target="_blank" to="/userLogin" class="color_title">亲，请登录</router-link>
						<router-link tag="a" target="_blank" to="/userRegister" class="padding_left_25">注册</router-link>
					</div>
					<div class="float_right">
						<ul class="list_unstyled ul_inline clearfix">
							<li>
								<router-link tag="a" target="_blank" to="/personCenter">我的中心</router-link>
							</li>
							<li>
								<router-link tag="a" target="_blank" to="/shoppingCart">购物车</router-link>
							</li>
							<li>
								<router-link tag="a" target="_blank" to="">手机XXX</router-link>
							</li>
							<li>
								<router-link tag="a" target="_blank" to="">律瀛商城</router-link>
							</li>
							<li>
								<router-link tag="a" target="_blank" to="">提供商入口</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="center clearfix search">
				<div class="float_left pointer">
					<img src="../assets/logo.png" @click="jump"/>
				</div>
				<div class="float_right padding">
					<div v-if="loginStatus > 0">
						<Input search placeholder="视频/音频/合同" class="search_box"/>
					</div>
					<div v-else-if="loginStatus === 0" class="margin_top_10">
						<Button shape="circle" class="width_80px">登录</Button>
						<Button type="success" shape="circle" class="margin_left_10 bg_title width_80px">注册</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props:['isLogin'],
		data() {
			return {
				//登录页面
				loginStatus: this.isLogin
			}
		},
		methods:{
			jump() {
                this.$router.push({path:'/'})
            },
		},
		mounted(){
			
		}
	}
</script>
<style lang='less' scoped>
	.content{
		background:#fff;
		.width_80px{width: 80px;}
	}
	.center{
		width:1200px;margin:0 auto;font-size: 12px;min-width: 1200px;
	}
	.top{
		background: #F5F5F5;padding: 11px 0;width: 100%;
		li{margin-left: 40px;}
	}
	.search{
		padding: 20px 0;
		.padding{padding-top: 6px;}
		.search_box{
			width: 580px;
		}
	}
</style>
