<template>
  <div>
      <NavBar :nowIndex="typeId" :showItem='true' :catCode="catCode"></NavBar>
    <!--banner-->
    <div>
      <Carousel  radius-dot v-model="value" autoplay loop>
        <CarouselItem v-for="(item,index) in banner" :key="index">
          <div class="carousel">
            <img :src="item.src" class="all_width block" style="max-height: 500px">
          </div>
        </CarouselItem>
      </Carousel>
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
                <p class="font_18 font_weight_bold">{{item.productTitle}}</p>
                <div class="twoline_ellipsis margin_top_10 color_666" v-html="item.productDesc"></div>
                <div class="clearfix margin_top_10">
                  <div class="float_left">
                    <span class="font_20 color_title">￥{{item.productPrice}}</span>
                  </div>
                  <div class="float_right">
                    <span class="padding_left_25 color_999 line_height_30px">{{item.saleCount}}人看过</span>
                  </div>
                </div>
                <div class="margin_top_15 clearfix">
                  <p class="pointer float_left">
                    <Icon type="ios-headset-outline" size="26"/>
                    <span class="font_16 color_666 vertical_middle">试听</span>
                  </p>
                  <div class="float_left margin_left_10">
                    <Button type="warning" shape="circle">加入购物车</Button>
                    <Button type="success" shape="circle" class="margin_left_10 bg_title">立即购买</Button>
                  </div>
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
            <div class="float_left font_weight_bold font_18">{{item.productTitle}}</div>
            <div class="float_right color_999 line_height_25px">{{item.saleCount}}人看过</div>
          </div>
          <div class="all_width twoline_ellipsis color_666 margin_top_10 height_40px" v-html="item.productDesc"></div>
          <div class="text_right margin_top_5"><span class="color_title" @click="toDetail(item.productCode)">查看详情》</span></div>
          <div class="margin_top_15 clearfix">
            <div class="pointer float_left">
              <p class="float_left inline_block"><span class="font_20 color_title">￥{{item.productPrice}}</span></p>
              <p class="float_left pointer margin_left_30 padding_top_3">
                <Icon type="ios-headset-outline" size="26"/>
                <span class="font_16 color_666 vertical_middle">试听</span>
              </p>
            </div>
            <div class="float_right">
              <Button type="warning" shape="circle">加入购物车</Button>
              <Button type="success" shape="circle" class="margin_left_10 bg_title">立即购买</Button>
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
          typeId: parseInt(this.$route.query.typeId),
          typeName: '',
          catCode: this.$route.query.catCode,
          hotArr:[],
          laborArr:[],
          banner: [],
          value: 0,
        }

    },
    watch: {
      //监听参数变化
      $route(){
        this.typeId = this.$route.query.typeId
      },
      typeId() {
        if(this.$route.query.typeId === 2){
          this.getCaseProduct(4)
        }else {
          this.getCaseProduct(5)
        }
      },
    },
    mounted(){
      console.log(this.$route.query.typeId)
      if(this.$route.query.typeId === 2){
        this.getCaseProduct(4)
        this.typeName = '视频课程'
      }else {
        this.getCaseProduct(5)
        this.typeName = '音频课程'
      }
    },
    methods: {
      //获取推荐商品
      getCaseProduct(pageLocat){

        var that=this;
        this.$api.getProductShowCaseList(this.$Qs.stringify({appType:1, pageLocat: pageLocat})).then((res)=>{

          if(res.data.code == 200){
            let {content}=res.data;
            // 保存轮播数据
            this.banner = eval(res.data.content[2].caseUrl)
            for(let item of content){
              if(item.caseName=="劳动推荐"){
                that.laborArr.push({productCode:item.productCode,productSortBy:item.productSortBy});

              }else if(item.caseName=="热门推荐"){

                that.hotArr.push({productCode:item.productCode,productSortBy:item.productSortBy});

              }else{

                console.log("没数据!");

              }
            }

            return Promise.resolve([that.laborArr,that.hotArr]);
          }
        }).then((res)=>{
          // console.log(res);
          let arr=[];
          for(let item of res){
            // console.log(item);
            for(let item2 of item){
              // console.log(item2);
              let params=this.$Qs.stringify(item2);
              // console.log(params);

              var that=this;
              this.$api.getProductShowCase(params).then((res)=>{
                if(res.data.code=="200"){
                  let {content}=res.data;
                  console.log(res.data)
                  arr.push(content);
                  return Promise.resolve(arr);
                }

              }).then((arry)=>{
                console.log(arry)
                if(arry.length===2){
                  that.laborArr=arry[0];
                  that.hotArr=arry[1];
                }
              })
            }
          }
        })
      },
      // 点击更多跳转
      moreList(){
        var navTitle = JSON.parse(sessionStorage.getItem("NavTitle"))
        // console.log(navTitle)
        for(var i=0;i<navTitle.length;i++){
          if(navTitle[i].catName == this.typeName){
            this.$router.push({
              path:'/videoCourseList',
              query: {
                catName: this.typeName,
                catCode: navTitle[i].catCode
              }
            })
          }
        }
      },
      // 查看详情
      toDetail(productCode){
        this.$router.push({
          path:'/videoCourseDetail',
          query: {
            productCode: productCode
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
