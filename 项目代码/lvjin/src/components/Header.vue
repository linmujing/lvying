<template>
	<div class="content">
		<div class="header">
			<div class="top">
				<div class="center clearfix">
					<div class="float_left">

						<div v-if="phone=='null' || phone==null">
							<router-link tag="a" to="/user/userLogin">
								<span class="color_title">亲，请登录</span>
							</router-link>
							<router-link tag="a"  to="/user/userRegister" class="padding_left_25">注册</router-link>
						</div>
						<div v-else>
								欢迎您，亲爱的<span  class="color_title"> {{user!='null' && user!=null ? user : phone}} </span> <span class="pointer" style="color:red;" @click="quitLogin">退出</span>
						</div>
					</div>
					<div class="float_right">
						<ul class="list_unstyled ul_inline clearfix">
							<li>
								<!--<router-link tag="a"  to="/personCenter/myCourse">我的中心</router-link>-->
                <a @click="toMyCourse('/personCenter/myCourse')">我的中心</a>
							</li>
							<li>
								<!--<router-link tag="a"  to="/shoppingCart">购物车</router-link>-->
								<a @click="toMyCourse('/shoppingCart')">购物车</a>
							</li>
							<li>
                <Poptip v-model="visible" trigger="hover">
                  <a>手机公众号</a>
                  <div slot="content">
                    <img src="../assets/images/image/wx.jpg" width="260">
                  </div>
                </Poptip>
							</li>
							<li>
								<router-link tag="a"  to="/lvyingMall">律瀛商城</router-link>
							</li>
							<li>
								<router-link tag="a"  to="/supplier/supplierLogin">提供商入口</router-link>
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
					<div v-if="loginStatus == 1">
						<Input v-model="searchVal" search placeholder="视频/音频/合同" class="search_box" @on-search="search"/>
					</div>
					<div v-else-if="loginStatus === 0" class="margin_top_10">
						<Button @click="login" shape="circle" class="width_80px">登录</Button>
						<Button @click="register" type="success" shape="circle" class="margin_left_10 bg_title width_80px">注册</Button>
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
				loginStatus: this.isLogin,
				visible:false,
				navigationList: [],
				user: null,
				phone: null,
        searchVal: ''
			}
		},
    mounted(){
			// this.getNavigationList()


    },
		methods:{
      // 获取上导航展示
      getNavigationList(){
        this.$api.getNavigationList( this.$Qs.stringify({'navigationName': '1'}) )

          .then( (res) => {
            console.log(res);
            if(res.data.code == 200){
              this.navigationList = res.content

            }else if (res.data.code == 500){

              this.$Message.warning(res.data.message);

            }

          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
			//logo链接到首页
			jump() {
					this.$router.push({path:'/'})
			},
      // 跳转判断
      toMyCourse(path){
        if(this.$store.state.userData.cicode == null || this.$store.state.userData.cicode == "null"){
          this.$Message.warning('您还没有登录，请登录后再尝试！');
          return ;
        }
        this.$router.push({path: path})
      },
			//登录按钮
			login() {
					this.$router.push({path:'/user/userLogin'})
			},
			//注册按钮
			register() {
					this.$router.push({path:'/user/userRegister'})
			},
			//退出登录
			quitLogin(){

				this.$Modal.confirm({
					title: '提示',
					content: '<p>确定要退出吗？</p>',
					onOk: () => {

						localStorage.setItem("ciphone", null)
						localStorage.setItem("ciname", null)
						localStorage.setItem("cicode", null)
						localStorage.setItem("ciProfileUrl", null)
						localStorage.setItem("ciSex", null)
						localStorage.setItem("ciIntroduce", null)

						this.$store.commit('userData/saveUserData', {
							"ciPhone": null,
							"ciName": null,
							"ciCode": null,
							"ciProfileUrl": null,
							"ciSex": null,
							"ciIntroduce": null
						});

						//跳转函数
						this.$router.push({ name: 'shopMallIdex'})

					},
					onCancel: () => {

					}
				});

			},
      // 搜索
      search(value){
        this.$router.push({
          path:'/searchList',
          query: {
            searchVal: value,
          }
        })
      }
		},
		computed: {
			// 监听登录状态变化 修改页面值
			getLoginChange() {

				this.user = this.$store.state.userData.ciname;

				this.phone = this.$store.state.userData.ciphone;

				return this.$store.state.userData.ciname;

			}
		},
		watch: {
			// 监听登录状态变化 修改页面值
			getLoginChange:function (val){

			}
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
