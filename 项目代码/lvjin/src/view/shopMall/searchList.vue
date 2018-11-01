<template>
  <div>
    <!--热门推荐-->
    <div class="content">
      <div class="padding_top_30 padding_bottom_30">
        <div v-if="productList.length > 0 ">
          <div class="clearfix">
            <div v-for="item in productList" class="width_560px margin_top_20 margin_right_40 float_left clearfix">
              <div class="float_left videoBox" @click="toDetail(item.productCode)">
                <img :src="item.productProfileUrl" class="all_width all_height">
              </div>
              <div class="float_left width_290px height_170 padding_left_25">
                <p class="font_18 font_weight_bold">{{item.productTitle}}</p>
                <div class="twoline_ellipsis margin_top_10 color_666">{{item.productKeyWord}}</div>
                <div class="clearfix margin_top_10">
                  <div class="float_left">
                    <span class="font_20 color_title">￥{{item.productPrice}}</span>
                  </div>
                  <div class="float_right">
                    <span class="padding_left_25 color_999 line_height_30px text_ellipsis">{{item.lookCount}}人看过</span>
                  </div>
                </div>
                <div class="margin_top_15 clearfix">
                  <p @click="toDetail(item.productCode)" class="pointer float_left">
                    <Icon type="ios-headset-outline" size="26"/>
                    <span class="font_16 color_666 vertical_middle">试听</span>
                  </p>
                  <div class="float_left margin_left_10">
                    <Button type="warning" shape="circle" @click="addProductCart(item.productCode)">加入购物车</Button>
                    <Button type="success" shape="circle" class="margin_left_10 bg_title" @click="goBuy(item.productCode)">立即购买</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text_center">暂无无数据</div>
      </div>
      <!-- 订单分页 -->
      <div v-if="productList.length > 0" class="margin_80 text_center">
        <Page :total="total" :current="current"   :page-size="pageSize"
              @on-change="changeOrderPage" show-total show-elevator />
      </div>
    </div>
	</div>
</template>
<script>
import NavBar from '../../components/NavBar.vue'
import Banner from '../../components/Banner.vue'
export default {
    components : {
      NavBar,
      Banner
    },
    data() {
        return {
          value: 0,
          total: 0,
          current: 1,
          pageSize: 12,
          productList: [],
          searchValue: ''
        }

    },
    watch: {
      //监听参数变化
      $route(){
        this.searchValue = this.$route.query.searchVal
      },
      searchValue() {
        this.getProductList(1)
      }
    },
    mounted(){
      this.searchValue = this.$route.query.searchVal
      this.getProductList(1)
    },
    methods: {
      // 获取商品列表
      getProductList(page){
        this.$Spin.show()
        this.$api.getProductList( this.$Qs.stringify({'pageNo': page, 'pageSize': 12, 'searchKey': this.searchValue}) )

          .then( (res) => {
            console.log(res);
            if(res.data.code == 200){
              this.$Spin.hide()
              this.productList = res.data.content.list
              this.total = res.data.content.count

            }else {
              this.$Spin.hide()
              this.$Message.warning(res.data.message);
            }
          })
          .catch((error) => {
            this.$Spin.hide()
            console.log('发生错误！', error);
          });
      },
      /**分页**/
      //@param value 返回当前页码
      changeOrderPage(value){
        this.getProductList(value)
      },
      // 查看详情
      toDetail(productCode){
        this.$router.push({
          path:'/videoCourseDetail',
          query: {
            productCode: productCode,
            typeId: 3
          }
        })
      },
      /** 数据 **/
      // 添加商品到购物车 MT
      addProductCart(code){
        if(this.$store.state.userData.cicode == null || this.$store.state.userData.cicode == "null"){
          this.$Message.warning('您还没有登录，请登录后再尝试！');
          return ;
        }
        let param = {
          ciCode:this.$store.state.userData.cicode,
          productCode: code,
          productCount:1
        }
        // 存储商品信息
        this.$store.commit('cart/addToCart', param);
        this.$store.dispatch('cart/addCartTo', param);
      },
      // 立即购买
      goBuy(code){
        if(this.$store.state.userData.cicode == null || this.$store.state.userData.cicode == "null"){
          this.$Message.warning('您还没有登录，请登录后再尝试！');
          return ;
        }
        // 页面跳转
        this.$router.push({
          path:'/submitOrder',
          query: {
            productCode: code
          }
        })
      }
    }
}
</script>
<style>
  .text_ellipsis,.text_ellipsis p{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
  .twoline_ellipsis,.twoline_ellipsis p {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* autoprefixer: off*/
    -webkit-box-orient: vertical;
    /* autoprefixer: on*/
    white-space: normal;
  }
</style>
<style scoped lang='less'>
	.content{
		width:1200px;margin:0 auto;background: #fff;
    .width_48{width: 48%;}
    .videoBox{width: 270px;height: 170px;border:1px solid #999999;}
    .height_170{height: 170px;}
    .height_310px{height: 310px;}
    .height_88px{height: 88px;}
    .width_560px{width: 560px;}
    .width_290px{width: 290px;}
    .border{border:1px solid #999999;}
    /*商城模块*/
    .title{color: #00AA88;font-size: 18px;border-left: 3px solid #00AA88; padding-left: 10px;}
    .more{color: #999;line-height: 26px;}
    .more:hover{color: #00AA88;}
    .margin_80{padding: 80px;text-align: center}
	}
</style>
