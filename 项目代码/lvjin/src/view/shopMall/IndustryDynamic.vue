<template>
  <div>
    <NavBar nowIndex="0" :showNav="true" :catCode="typeId"></NavBar>
    <!--banner-->
    <div v-if="banner.length > 0">
      <div v-if="banner.length === 1">
        <img :src="banner[0].src" class="all_width block" style="max-height: 500px">
      </div>
      <div v-else>
        <Carousel radius-dot v-model="value" autoplay loop>
          <CarouselItem v-for="(item,index) in banner" :key="index">
            <div class="carousel">
              <img :src="item.src" class="all_width block" style="max-height: 500px">
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
    <!--热门推荐-->
    <div class="content">
      <div class="padding_top_30 padding_bottom_30">
        <div class="">
          <div class="clearfix">
            <div class="float_left">
              <span class="title">热门推荐</span>
            </div>
            <div class="float_right more pointer" @click="moreList">更多》</div>
          </div>
          <div class="clearfix">
            <div v-for="item in hotArr" class="width_560px margin_top_20 margin_right_40 float_left clearfix">
              <div class="float_left videoBox" @click="toDetail(item.productCode)">
                <img :src="item.productProfileUrl" class="all_width all_height">
              </div>
              <div class="float_left width_290px height_170 padding_left_25">
                <p class="font_18 font_weight_bold text_ellipsis">{{item.productTitle}}</p>
                <div class="twoline_ellipsis margin_top_10 color_666">{{item.productKeyWord}}</div>
                <div class="text_right margin_top_5">
                  <span class="color_title pointer" @click="toDetail(item.productCode)">查看详情》</span>
                </div>
                <div class="clearfix">
                  <div class="float_left">
                    <span class="font_20 color_title">￥{{item.productPrice}}</span>
                  </div>
                  <div class="float_right">
                    <span class="padding_left_25 color_999 line_height_30px text_ellipsis">{{item.lookCount}}人看过</span>
                  </div>
                </div>
                <div class="margin_top_5">
                  <Button type="warning" shape="circle" @click="addProductCart(item.productCode)">加入购物车</Button>
                  <Button type="success" shape="circle" class="margin_left_10 bg_title" @click="goBuy(item.productCode)">立即购买</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--劳动推荐-->
    <div class="content padding_top_30 padding_bottom_30">
      <div class="clearfix">
        <div class="float_left">
          <span class="title">劳动推荐</span>
        </div>
        <div class="float_right more pointer" @click="moreList">更多》</div>
      </div>
      <ul class="list_unstyled ul_inline clearfix">
        <li class="width_560px margin_top_30 margin_right_40" v-for="item in laborArr">
          <div class="width_560px height_310px border" @click="toDetail(item.productCode)">
            <img :src="item.productProfileUrl" class="all_width all_height">
          </div>
          <div class="clearfix margin_top_15">
            <div class="float_left width_70 font_weight_bold font_18 text_ellipsis">{{item.productTitle}}</div>
            <div class="float_right width_30 color_999 line_height_25px text_ellipsis text_right">
              <span>{{item.lookCount}}人看过</span>
            </div>
          </div>
          <div class="all_width twoline_ellipsis color_666 margin_top_10 height_40px">{{item.productKeyWord}}</div>
          <div class="text_right margin_top_5"><span class="color_title pointer" @click="toDetail(item.productCode)">查看详情》</span></div>
          <div class="margin_top_15 clearfix">
            <p class="pointer float_left">
              <span class="font_20 color_title">￥{{item.productPrice}}</span>
            </p>
            <div class="float_right">
              <Button type="warning" shape="circle" @click="addProductCart(item.productCode)">加入购物车</Button>
              <Button type="success" shape="circle" class="margin_left_10 bg_title" @click="goBuy(item.productCode)">立即购买</Button>
            </div>
          </div>
        </li>
      </ul>
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
          typeId: 1,
          typeName: '行业动态管控',
          hotArr:[],
          laborArr:[],
          banner: [],
          value: 0,
        }

    },
    watch: {

    },
    mounted(){
      this.getCaseProduct(2)
      this.getNavTitle()
    },
    methods: {
      // 获取导航标题
      getNavTitle(){
        this.$api.getProductCatList( this.$Qs.stringify({'parentId': '0'}) )

          .then( (res) => {

            if(res.data.code == 200){

              // 导航标题信息
              sessionStorage.setItem("NavTitle", JSON.stringify(res.data.content));

            }else{

              this.$Message.warning(res.data.message);

            }
          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
      //获取橱窗对象
      getCaseProduct(pageLocat){
        this.$Spin.show()
        this.$api.getProductShowCaseList(this.$Qs.stringify({appType:1, pageLocat: pageLocat})).then((res)=>{

          if(res.data.code == 200){
            this.$Spin.hide()
            let {content}=res.data;
            // 保存轮播数据
            if(!res.data.content[2].caseUrl == null || !res.data.content[2].caseUrl == ''){
              this.banner = eval(res.data.content[2].caseUrl)
            }
            for(let item of content){
              if(item.caseName=="劳动推荐"){
                this.getProductShowCase(item.productCode, item.productSortBy, 1)
              }else if(item.caseName=="热门推荐"){
                this.getProductShowCase(item.productCode, item.productSortBy, 2)
              }
            }
          }else{
            this.$Spin.hide()
            this.$Message.warning(res.data.message);

          }
        })
          .catch((error) => {
            this.$Spin.hide()
            console.log('发生错误！', error);
          });
      },
      //获取推荐商品
      getProductShowCase(productCode, productSortBy, type){
        this.$Spin.show()
        var params = this.$Qs.stringify({'productCode': productCode, 'productSortBy': productSortBy})
        this.$api.getProductShowCase( params )

          .then( (res) => {

            if(res.data.code == 200){
              this.$Spin.hide()
              switch (type) {
                case 1:
                  this.laborArr = res.data.content
                  break
                case 2:
                  this.hotArr = res.data.content
                  break
              }

            }else{
              this.$Spin.hide()
              this.$Message.warning(res.data.message);

            }
          })
          .catch((error) => {
            this.$Spin.hide()
            console.log('发生错误！', error);
          });
      },
      // 点击更多跳转
      moreList(){
        var navTitle = JSON.parse(sessionStorage.getItem("NavTitle"))
        // console.log(navTitle)
        for(var i=0;i<navTitle.length;i++){
          if(navTitle[i].catName == this.typeName){
            this.$router.push({
              path:'/industryDynamicList',
              query: {
                catName: this.typeName,
                catCode: navTitle[i].id,
                typeId: this.typeId
              }
            })
          }
        }
      },
      // 查看详情
      toDetail(productCode){
        this.$router.push({
          path:'/industryDynamicDetail',
          query: {
            productCode: productCode,
            typeId: this.typeId
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
	}
</style>
