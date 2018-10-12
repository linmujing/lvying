<template>
    <div class="bg_white">
    <!--导航栏-->
    <div class="nav" style="z-index: 10">
      <ul class="list_unstyled ul_inline clearfix font_18 navbar box_center_1200">
        <li class="pointer" v-for="(item,index) in navDataModel" :key="index" @click='tabClick(item.id,index)'>
          <span class="color_fff listItem">{{item.catName}}</span>
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
							<a @click="moreList('视频课程')">更多》</a>
						</div>
					</div>
					<div v-for="item in videoArr" class="margin_top_20 clearfix">
						<div class="float_left videoBox" @click="toDetail(item.productCode,2)"><img :src="item.productProfileUrl" alt=""></div>
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
									<span class="font_16 color_666 vertical_middle">试听</span>
								</p>
								<div class="float_left margin_left_20">
									<Button type="warning" shape="circle">加入购物车</Button>
									<Button type="success" shape="circle" class="margin_left_10 bg_title">立即购买</Button>
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
              <a @click="moreList('音频课程')">更多》</a>
						</div>
					</div>
					<div v-for="item in musicArr" class="margin_top_20 clearfix">
						<div class="float_left videoBox" @click="toDetail(item.productCode,2)"><img :src="item.productProfileUrl" alt=""></div>
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
									<span class="font_16 color_666 vertical_middle">试听</span>
								</p>
								<div class="float_left margin_left_20">
									<Button type="warning" shape="circle">加入购物车</Button>
									<Button type="success" shape="circle" class="margin_left_10 bg_title">立即购买</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<img src="../../assets/images/image/bg.png" class="block all_width">
		</div>
    <!--行业动态管控-->
		<div class="content padding_top_30 padding_bottom_30">
			<div class="clearfix">
				<div class="float_left">
					<span class="title">行业动态管控</span>
				</div>
				<div class="float_right more pointer">
          <a @click="moreList('行业动态管控')">更多》</a>
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
            <span class="color_title" @click="toDetail(item.productCode,1)">查看详情》</span>
          </div>
					<div class="margin_top_15 clearfix">
						<p class="pointer float_left">
							<span class="font_20 color_title">￥{{item.productPrice}}</span>
						</p>
						<div class="float_right">
							<Button type="warning" shape="circle">加入购物车</Button>
							<Button type="success" shape="circle" class="margin_left_10 bg_title">立即购买</Button>
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
            <a @click="moreList('法律动态管控')">更多》</a>
          </div>
				</div>
				<ul class="list_unstyled">
					<li class="clearfix margin_top_30" v-for="item in logicArr">
						<div class="float_left videoBox" @click="toDetail(item.productCode,1)"><img :src="item.productProfileUrl" alt=""></div>
						<div class="float_left width_900px margin_left_20 margin_top_5">
							<div class="font_weight_bold font_18">{{item.productTitle}}</div>
              <div class="color_666 text_ellipsis margin_top_10" v-html="item.productDesc"></div>
							<div class="clearfix margin_top_10">
								<div class="float_left">
									<span class="font_20 color_title">￥{{item.productPrice}}</span>
									<span class="padding_left_25 color_999">{{item.saleCount}}人看过</span>
								</div>
								<div class="float_right text_right">
									<span class="color_title" @click="toDetail(item.productCode,1)">查看详情》</span>
								</div>
							</div>
							<div class="margin_top_10">
								<Button type="warning" shape="circle">加入购物车</Button>
								<Button type="success" shape="circle" class="margin_left_10 bg_title">立即购买</Button>
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
          <a @click="moreList('律赢商城')">更多》</a>
        </div>
			</div>
			<div class="margin_top_30">
				<Row :gutter="16">
			        <Col span="6" v-for="(item,index) in lvyingArr" :key="index">
			            <div class="mallBox padding_top_20 padding_bottom_20 padding_right_10 padding_left_10">
			            	<div class="text_center" @click="toDetail(item.productCode,3)">
                      <img :src="item.productProfileUrl" class="all_width" style="max-height: 280px">
			            	</div>
			            	<div class="font_18 text_ellipsis margin_top_20">{{item.productTitle}}</div>
			            	<div class="color_666 text_ellipsis margin_top_10" v-html="item.productDesc"></div>
			            	<div class="margin_top_15 clearfix">
                      <p class="pointer float_left">
                        <span class="font_20 color_title">￥{{item.productPrice}}</span>
                      </p>
                      <div class="float_right margin_left_20">
                        <Button type="success" shape="circle" class="bg_title">立即购买</Button>
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
					navDataModel: [],
					videoArr:[],
					musicArr:[],
					careerArr:[],
					logicArr:[],
          lvyingArr:[],
          banner: [],
          value: 0,
          // showCase: []
        }

    },
    mounted(){
      this.getNavTitle()
			this.getCaseProduct()
    },
    methods: {
			//获取推荐商品
			getCaseProduct(){
        this.$Spin.show()
					var that=this;
					 this.$api.getProductShowCaseList(this.$Qs.stringify({appType:1, pageLocat: 1})).then((res)=>{

							 if(res.data.code == 200){
								 let {content}=res.data;
								 // 保存轮播数据
                this.banner = eval(res.data.content[6].caseUrl)
								for(let item of content){
                  if(item.caseLocat.slice(0,1)=="1"&&item.caseName=="视频推荐"){
                    that.videoArr.push({productCode:item.productCode,productSortBy:item.productSortBy});

                  }else if(item.caseLocat.slice(0,1)=="1"&&item.caseName=="音频推荐"){

                    that.musicArr.push({productCode:item.productCode,productSortBy:item.productSortBy});

                  }else if(item.caseLocat.slice(0,1)=="1"&&item.caseName=="行业动态管控"){
                    that.careerArr.push({productCode:item.productCode,productSortBy:item.productSortBy});
                  }else if(item.caseLocat.slice(0,1)=="1"&&item.caseName=="法律动态管控"){

                    that.logicArr.push({productCode:item.productCode,productSortBy:item.productSortBy});

                  }else if(item.caseLocat.slice(0,1)=="1"&&item.caseName=="律赢商城"){

                    that.lvyingArr.push({productCode:item.productCode,productSortBy:item.productSortBy});

                  }else{

                    console.log("没数据!");

                  }
                  this.$Spin.hide()
                }

							return Promise.resolve([that.videoArr,that.musicArr,that.careerArr,that.logicArr,that.lvyingArr]);
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
									   // console.log(arry)
										if(arry.length===5){
											that.videoArr=arry[0];
											that.musicArr=arry[1];
											that.logicArr=arry[3];
											that.careerArr=arry[2];
											that.lvyingArr=arry[4];
										}
									 })
								}
							}
					})
			},
      // 获取导航标题
      getNavTitle(){
        // 获取产品分类列表
        this.$Spin.show()
        this.$api.getProductCatList( this.$Qs.stringify({'parentId': '0'}) )

          .then( (res) => {

            if(res.data.code == 200){

              this.navDataModel = res.data.content
              // 导航标题信息
              sessionStorage.setItem("NavTitle", JSON.stringify(res.data.content));

            }else if (res.data.code == 500){

              this.$Message.warning(res.data.message);

            }
            this.$Spin.hide()
          })
          .catch((error) => {
            this.$Spin.hide()
            console.log('发生错误！', error);
          });
      },
      // 导航鼠标点击
      tabClick(catCode,index){
        console.log(index)
        switch(catCode){
          case '1':
            this.$router.push({
              path:'/industryDynamic',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
          case '2':
            this.$router.push({
              path:'/industryDynamic',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
          case '3':
            this.$router.push({
              path:'videoCourse',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
          case '4':
            this.$router.push({
              path:'videoCourse',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
	    		break;
          case '5':
            this.$router.push({
              path:'lvyingMall',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
        }
      },
      // 点击更多跳转
      moreList(name){
			  console.log(name)
        var arr = this.navDataModel
        for(var i=0;i<arr.length;i++){
          if(arr[i].catName == name){
            switch (name) {
              case '音频课程':
              case '视频课程':
                this.$router.push({
                  path:'/videoCourseList',
                  query: {
                    catName: name,
                    catCode: arr[i].catCode
                  }
                })
                break
              case '法律动态管控':
              case '行业动态管控':
                this.$router.push({
                  path:'/industryDynamicList',
                  query: {
                    catName: name,
                    catCode: arr[i].catCode
                  }
                })
                break
              case '律赢商城':
                this.$router.push({
                  path:'/lvyingMall',
                  query: {
                    catName: '律瀛商城',
                    catCode: arr[i].catCode
                  }
                })
                break
            }
          }
        }
      },
      // 查看详情
      toDetail(productCode,type){
        switch (type) {
          case 1:
            this.$router.push({
              path:'/industryDynamicDetail',
              query: {
                productCode: productCode
              }
            })
            break
          case 2:
            this.$router.push({
              path:'/videoCourseDetail',
              query: {
                productCode: productCode
              }
            })
            break
          case 3:
            this.$router.push({
              path:'/bookDetail',
              query: {
                productCode: productCode
              }
            })
            break
        }
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
