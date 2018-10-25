<template>
	<div>
		<div class="footer">
			<div style="max-width: 1200px;margin: 0 auto;min-width: 1200px;">
				<div class="link">
					<Row style="font-size: 16px;">
						<Col span="6">
							<!--<router-link tag="a" target="_blank" to="">-->
								<!--<span class="color_999">关于我们</span>-->
							<!--</router-link>-->
						</Col>
						<Col span="6">
							<!--<router-link tag="a" target="_blank" to="">-->
								<!--<span class="color_999">联系我们</span>-->
							<!--</router-link>-->
						</Col>
						<Col span="6">
							<!--<router-link tag="a" target="_blank" to="">-->
								<!--<span class="color_999">帮助中心</span>-->
							<!--</router-link>-->
						</Col>
						<Col span="6">
							<!--<router-link tag="a" target="_blank" to="">-->
								<!--<span class="color_999">使用协议</span>-->
							<!--</router-link>-->
						</Col>
					</Row>
				</div>
				<!--<div>公司地址：上海市闵行区紫星路588号2幢2062室  客服热线：400-838-5616</div>-->
				<!--<div class="line padding_20">信息网络传播视听节目许可证1908287号  |  互联网直播服务备案号：沪ILS备201708210007   沪网文【2016】6034-453号沪ICP备13027243号-3  沪公网安备 31011502005603号</div>-->
				<!--<div class="padding_20">-->
					<!--<div>Copyright © 2012-2018 www.ximalaya.com lnc.ALL Rights Reserved</div>-->
					<!--<div class="margin_top_10">上海证大喜马拉雅网络科技有限公司 版权所有</div>-->
				<!--</div>-->
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		mounted(){
      // this.getNavigationList()
		},
    methods:{
      // 获取下导航展示
      getNavigationList(){
        this.$api.getNavigationList( this.$Qs.stringify({'navigationName': '2'}) )

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

    }
	}
</script>
<style lang='less' scoped>
	.footer{
		background: #232323;
		color:#999999;
		text-align: center;
		.link{
			padding: 60px 0;
		}
		.line{
			border-bottom: 1px solid #999999;
		}
		.padding_20{
			padding: 20px 0;
		}
	}
</style>
