<template>
    <div class="bg_white">
    <!--导航栏-->
    <div class="nav" style="z-index: 10">
      <ul class="list_unstyled ul_inline clearfix font_18 navbar box_center_1200">
        <li class="pointer" v-for="(item,index) in navTitle" :key="index" @click='tabClick(item.id,index)'>
          <span class="color_fff listItem">{{item.name}}</span>
        </li>
      </ul>
    </div>
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
    <!--视频推荐-->
		<div class="content">
			<div class="padding_top_30 padding_bottom_30 clearfix">
				<div class="float_left width_48">
					<div class="clearfix">
						<div class="float_left">
							<span class="title">视频推荐</span>
						</div>
						<div class="float_right more pointer">
							<a @click="moreList('视频课程',3)">更多》</a>
						</div>
					</div>
					<div v-for="item in videoArr" class="margin_top_20 clearfix">
						<div class="float_left videoBox" @click="toDetail(item.productCode,3)"><img :src="item.productProfileUrl" alt=""></div>
						<div class="float_left height_170 padding_left_25 margin_top_15">
							<p class="font_18 font_weight_bold">{{item.productTitle}}</p>
							<p class="color_999 margin_top_10">{{item.createBy}}</p>
							<div class="margin_top_10">
								<span class="font_20 color_title">￥{{item.productPrice}}</span>
								<span class="padding_left_25 color_999">{{item.saleCount}}人看过</span>
							</div>
							<div class="margin_top_15 clearfix">
								<p class="pointer float_left">
									<Icon type="ios-headset-outline" size="30"/>
									<span class="font_16 color_666 vertical_middle" @click="toDetail(item.productCode,3)">试听</span>
								</p>
								<div class="float_left margin_left_20">
									<Button type="warning" shape="circle" @click="addProductCart(item.productCode)">加入购物车</Button>
									<Button type="success" shape="circle" class="margin_left_10 bg_title" @click="goBuy(item.productCode)">立即购买</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="float_right width_48">
					<div class="clearfix">
						<div class="float_left">
							<span class="title">音频推荐</span>
						</div>
						<div class="float_right more pointer">
              <a @click="moreList('音频课程',4)">更多》</a>
						</div>
					</div>
					<div v-for="item in musicArr" class="margin_top_20 clearfix">
						<div class="float_left videoBox" @click="toDetail(item.productCode,4)"><img :src="item.productProfileUrl" alt=""></div>
						<div class="float_left height_170 padding_left_25 margin_top_15">
							<p class="font_18 font_weight_bold">{{item.productTitle}}</p>
							<p class="color_999 margin_top_10">{{item.createBy}}</p>
							<div class="margin_top_10">
								<span class="font_20 color_title">￥{{item.productPrice}}</span>
								<span class="padding_left_25 color_999">{{item.saleCount}}人看过</span>
							</div>
							<div class="margin_top_15 clearfix">
								<p class="pointer float_left">
									<Icon type="ios-headset-outline" size="30"/>
									<span class="font_16 color_666 vertical_middle" @click="toDetail(item.productCode,4)">试听</span>
								</p>
								<div class="float_left margin_left_20">
									<Button type="warning" shape="circle" @click="addProductCart(item.productCode)">加入购物车</Button>
									<Button type="success" shape="circle" class="margin_left_10 bg_title" @click="goBuy(item.productCode)">立即购买</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
      <img :src="bgUrl" class="block all_width" style="max-height: 300px">
    </div>
    <!--行业动态管控-->
		<div class="content padding_top_30 padding_bottom_30">
			<div class="clearfix">
				<div class="float_left">
					<span class="title">行业动态管控</span>
				</div>
				<div class="float_right more pointer">
          <a @click="moreList('行业动态管控',1)">更多》</a>
        </div>
			</div>
			<ul class="list_unstyled ul_inline clearfix">
				<li class="width_560px margin_top_20 margin_right_40" v-for="item in careerArr">
					<div class="width_560px height_310px border" @click="toDetail(item.productCode,1)"><img :src="item.productProfileUrl" alt=""></div>
					<div class="clearfix margin_top_15">
						<div class="float_left font_weight_bold font_18">{{item.productTitle}}</div>
						<div class="float_right color_999 line_height_25px">{{item.saleCount}}人看过</div>
					</div>
					<div class="all_width twoline_ellipsis color_666 margin_top_10 height_40px" v-html="item.productDesc"></div>
					<div class="text_right margin_top_5">
            <span class="color_title pointer" @click="toDetail(item.productCode,1)">查看详情》</span>
          </div>
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
    <!--法律动态管控-->
		<div class="bg_f5">
			<div class="content padding_top_30 padding_bottom_30">
				<div class="clearfix">
					<div class="float_left">
						<span class="title">法律动态管控</span>
					</div>
					<div class="float_right more pointer">
            <a @click="moreList('法律动态管控',2)">更多》</a>
          </div>
				</div>
				<ul class="list_unstyled">
					<li class="clearfix margin_top_30" v-for="item in logicArr">
						<div class="float_left videoBox" @click="toDetail(item.productCode,2)"><img :src="item.productProfileUrl" alt=""></div>
						<div class="float_left width_900px margin_left_20 margin_top_5">
							<div class="font_weight_bold font_18">{{item.productTitle}}</div>
              <div class="color_666 text_ellipsis margin_top_10" v-html="item.productDesc"></div>
							<div class="clearfix margin_top_10">
								<div class="float_left">
									<span class="font_20 color_title">￥{{item.productPrice}}</span>
									<span class="padding_left_25 color_999">{{item.saleCount}}人看过</span>
								</div>
								<div class="float_right text_right">
									<span class="color_title pointer" @click="toDetail(item.productCode,2)">查看详情》</span>
								</div>
							</div>
							<div class="margin_top_10">
								<Button type="warning" shape="circle" @click="addProductCart(item.productCode)">加入购物车</Button>
								<Button type="success" shape="circle" class="margin_left_10 bg_title" @click="goBuy(item.productCode)">立即购买</Button>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
    <!--律瀛商城-->
		<div class="content padding_top_30 padding_bottom_30">
			<div class="clearfix">
				<div class="float_left">
					<span class="title">律瀛商城</span>
				</div>
				<div class="float_right more pointer">
          <a @click="moreList('律赢商城',5)">更多》</a>
        </div>
			</div>
			<div class="margin_top_30">
				<Row :gutter="16">
			        <Col span="6" v-for="(item,index) in lvyingArr" :key="index">
			            <div class="mallBox padding_top_20 padding_bottom_20 padding_right_10 padding_left_10">
			            	<div class="text_center" @click="toDetail(item.productCode,5)">
                      <img :src="item.productProfileUrl" class="all_width" style="max-height: 280px">
			            	</div>
			            	<div class="font_18 text_ellipsis margin_top_20">{{item.productTitle}}</div>
			            	<div class="color_666 text_ellipsis margin_top_10" v-html="item.productDesc"></div>
			            	<div class="margin_top_15 clearfix">
                      <p class="pointer float_left">
                        <span class="font_20 color_title">￥{{item.productPrice}}</span>
                      </p>
                      <div class="float_right margin_left_20">
                        <Button type="success" shape="circle" class="bg_title" @click="goBuy(item.productCode)">立即购买</Button>
                      </div>
                    </div>
			            </div>
			        </Col>
			    </Row>
			</div>
		</div>
    <!--合作伙伴-->
    <div class="bg_f5">
      <div class="content partner">
        <div class="color_666 font_18 text_center">合作伙伴</div>
        <div class="color_999 margin_top_10 text_center">我们具有充分的实力，为客户提供高效快捷优质，公平公正的法律服务，以最诚恳和严谨的态度为客户提供专业化的法律服务。​</div>
        <div class="margin_top_30">
          <ul class="list_unstyled ul_inline clearfix">
            <li v-for="(item,index) in 5" class="width_230px height_88px border margin_right_10"></li>
          </ul>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  import Banner from '../../components/Banner.vue'
export default {
    components : {
      Banner
    },
    data() {
        return {
          navTitle: [
            {name: '行业动态管控', id: 1},
            {name: '法律动态管控', id: 2},
            {name: '视频课程', id: 3},
            {name: '音频课程', id: 4}
          ],
					videoArr:[],
					musicArr:[],
					careerArr:[],
					logicArr:[],
          lvyingArr:[],
          banner: [],
          bgUrl: '',
          value: 0
        }

    },
    mounted(){
      this.getNavTitle()
			this.getCaseProduct()
    },
    methods: {
			//获取橱窗对象
      getCaseProduct(){
        this.$Spin.show()
        this.$api.getProductShowCaseList(this.$Qs.stringify({appType:1, pageLocat: 1})).then((res)=>{

          if(res.data.code == 200){
            this.$Spin.hide()
            let {content}=res.data;
            // 保存轮播数据
            this.banner = eval(res.data.content[6].caseUrl)
            var bgUrl = eval(res.data.content[3].caseUrl)
            this.bgUrl = bgUrl[0].src
            sessionStorage.setItem("Banner", JSON.stringify(eval(res.data.content[6].caseUrl)));
            for(let item of content){
              if(item.caseName=="视频推荐"){
                this.getProductShowCase(item.productCode, item.productSortBy, 1)
              }else if(item.caseName=="音频推荐"){
                this.getProductShowCase(item.productCode, item.productSortBy, 2)
              }else if(item.caseName=="行业动态管控"){
                this.getProductShowCase(item.productCode, item.productSortBy, 3)
              }else if(item.caseName=="法律动态管控"){
                this.getProductShowCase(item.productCode, item.productSortBy, 4)
              }else if(item.caseName=="律赢商城" || item.caseName=="律瀛商城"){
                this.getProductShowCase(item.productCode, item.productSortBy, 5)
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
        var params = this.$Qs.stringify({'productCode': productCode, 'productSortBy': productSortBy})
        this.$api.getProductShowCase( params )

          .then( (res) => {

            if(res.data.code == 200){

              switch (type) {
                case 1:
                  this.videoArr = res.data.content
                  break
                case 2:
                  this.musicArr = res.data.content
                  break
                case 3:
                  this.careerArr = res.data.content
                  break
                case 4:
                  this.logicArr = res.data.content
                  break
                case 5:
                  this.lvyingArr = res.data.content
                  break
              }

            }else{

              this.$Message.warning(res.data.message);

            }
            this.$Spin.hide()
          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
      // 获取导航标题
      getNavTitle(){
        this.$Spin.show()
        this.$api.getProductCatList( this.$Qs.stringify({'parentId': '0'}) )

          .then( (res) => {

            if(res.data.code == 200){
              this.$Spin.hide()
              this.navDataModel = res.data.content
              // 导航标题信息
              sessionStorage.setItem("NavTitle", JSON.stringify(res.data.content));

            }else{

              this.$Message.warning(res.data.message);

            }
          })
          .catch((error) => {
            this.$Spin.hide()
            console.log('发生错误！', error);
          });
      },
      // 导航鼠标点击
      tabClick(id,index){
        console.log(id)
        switch(id){
          case 1:
            this.$router.push({
              path:'/industryDynamic'
            })
            break;
          case 2:
            this.$router.push({
              path:'/lawDynamic'
            })
            break;
          case 3:
            this.$router.push({
              path:'videoCourse'
            })
            break;
          case 4:
            this.$router.push({
              path:'audioCourse'
            })
	    		break;
        }
      },
      // 点击更多跳转
      moreList(name, typeId){
			  console.log(name)
        var arr = this.navDataModel
        for(var i=0;i<arr.length;i++){
          if(arr[i].id == typeId){
            switch (typeId) {
              case 3:
              case 4:
                this.$router.push({
                  path:'/videoCourseList',
                  query: {
                    catName: name,
                    catCode: arr[i].id,
                    typeId: typeId
                  }
                })
                break
              case 1:
              case 2:
                this.$router.push({
                  path:'/industryDynamicList',
                  query: {
                    catName: name,
                    catCode: arr[i].id,
                    typeId: typeId
                  }
                })
                break
              case 5:
                this.$router.push({
                  path:'/lvyingMall',
                  query: {
                    catName: '律瀛商城',
                    catCode: arr[i].id,
                    typeId: typeId
                  }
                })
                break
            }
          }
        }
      },
      // 查看详情
      toDetail(productCode,typeId){
        switch (typeId) {
          case 1:
          case 2:
            this.$router.push({
              path:'/industryDynamicDetail',
              query: {
                productCode: productCode,
                typeId: typeId
              }
            })
            break
          case 3:
          case 4:
            this.$router.push({
              path:'/videoCourseDetail',
              query: {
                productCode: productCode,
                typeId: typeId
              }
            })
            break
          case 5:
            this.$router.push({
              path:'/bookDetail',
              query: {
                productCode: productCode,
                typeId: typeId
              }
            })
            break
        }
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
</style>
<style scoped lang='less'>
	.content{
		width:1200px;margin:0 auto;min-width: 1200px;
		.width_48{width: 48%;}
		.videoBox{
			width: 270px;height: 170px;border:1px solid #999999;overflow:hidden;
				img{
					width:100%;
					height:100%;
				}
		}
		.height_170{height: 170px;}
    .height_310px{height: 310px;}
    .height_88px{height: 88px;}
		.width_560px{width: 560px;
			img{
					width:100%;
					height:100%;
			}
		}
		.width_900px{width: 900px;}
    .width_230px{width: 230px;}
		.border{border:1px solid #999999;}
		.mallBox{width: 275px;height: 450px;border: 1px solid #efefef;}
    /*商城模块*/
    .title{color: #00AA88;font-size: 18px;border-left: 3px solid #00AA88; padding-left: 10px;}
    .more{color: #999;line-height: 26px;}
	}
  .partner{padding:60px 0;}
  .nav {
    background: #00AA88;
    height: 67px;
    .navbar>li{
      width: 180px;text-align: center;
      >span{width:100%;line-height: 67px;display: inline-block;}
      .listItem:hover{background: #f09105}
    }
  }
</style>
