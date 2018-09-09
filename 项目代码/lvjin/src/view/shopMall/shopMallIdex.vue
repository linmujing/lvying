<template>
    <div class="bg_white">
    <!--导航栏-->
    <div class="nav">
      <ul class="list_unstyled ul_inline clearfix font_18 navbar box_center_1200">
        <li class="pointer" v-for="(item,index) in navDataModel" :key="index" @click='tabClick(index)'>
          <a href="javascript:void(0)" class="color_fff listItem">{{item}}</a>
        </li>
      </ul>
    </div>
    <Banner></Banner>
    <!--视频推荐-->
		<div class="content">
			<div class="padding_top_30 padding_bottom_30 clearfix">
				<div class="float_left width_48">
					<div class="clearfix">
						<div class="float_left">
							<span class="title">视频推荐</span>
						</div>
						<div class="float_right more pointer">
							<router-link tag="a" target="_blank" to="/videoCourseList">更多》</router-link>
						</div>
					</div>
					<div v-for="item in 2" class="margin_top_20 clearfix">
						<div class="float_left videoBox"></div>
						<div class="float_left height_170 padding_left_25 margin_top_15">
							<p class="font_18 font_weight_bold">审核同业禁止协议</p>
							<p class="color_999 margin_top_10">立二拆四案辩护人</p>
							<div class="margin_top_10">
								<span class="font_20 color_title">￥500.00</span>
								<span class="padding_left_25 color_999">1234人看过</span>
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
							<router-link tag="a" target="_blank" to="/videoCourseList">更多》</router-link>
						</div>
					</div>
					<div v-for="item in 2" class="margin_top_20 clearfix">
						<div class="float_left videoBox"></div>
						<div class="float_left height_170 padding_left_25 margin_top_15">
							<p class="font_18 font_weight_bold">审核同业禁止协议</p>
							<p class="color_999 margin_top_10">立二拆四案辩护人</p>
							<div class="margin_top_10">
								<span class="font_20 color_title">￥500.00</span>
								<span class="padding_left_25 color_999">1234人看过</span>
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
				<div class="float_right more pointer">更多》</div>
			</div>
			<ul class="list_unstyled ul_inline clearfix">
				<li class="width_560px margin_top_20 margin_right_40" v-for="item in 4">
					<div class="width_560px height_310px border"></div>
					<div class="clearfix margin_top_15">
						<div class="float_left font_weight_bold font_18">知识产权许可使用合同起草</div>
						<div class="float_right color_999 line_height_25px">12035人看过</div>
					</div>
					<div class="all_width twoline_ellipsis color_666 margin_top_10 height_40px">立二拆四案辩护人，著名主持人丛薇、著名演员黄奕、王希维、苏青、谢惠清、于琳相关案件代理人。盈科在发展中坚持"以人为本"的人才战略。</div>
					<div class="text_right margin_top_5"><span class="color_title">查看详情》</span></div>
					<div class="margin_top_15 clearfix">
						<p class="pointer float_left">
							<span class="font_20 color_title">￥500.00</span>
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
					<div class="float_right more pointer">更多》</div>
				</div>
				<ul class="list_unstyled">
					<li class="clearfix margin_top_30" v-for="item in 3">
						<div class="float_left videoBox"></div>
						<div class="float_left width_900px margin_left_20 margin_top_5">
							<div class="font_weight_bold font_18">律师支招：买房过户中突遇法院查封怎么办？</div>
							<div class="twoline_ellipsis margin_top_10 color_666">为了让孩子进入更好的学校读书，经过精挑细选，王女士花费重金近一千万元购买了一套学区房，为了让孩子进入更好的学校读书，经过精挑细选，王女士花费重金近一千万元购买了一套学区房，为了让孩子进入更好的学校读书，经过精挑细选，王女士花费重金近一千万元购买了一套学区房，</div>
							<div class="clearfix margin_top_10">
								<div class="float_left">
									<span class="font_20 color_title">￥500.00</span>
									<span class="padding_left_25 color_999">1234人看过</span>
								</div>
								<div class="float_right text_right">
									<span class="color_title">查看详情》</span>
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
				<div class="float_right more pointer">更多》</div>
			</div>
			<div class="margin_top_30">
				<Row :gutter="16">
			        <Col span="6" v-for="(item,index) in 4" :key="index">
			            <div class="mallBox padding_top_20 padding_bottom_20 padding_right_10 padding_left_10">
			            	<div class="text_center ">
			            		<img src="../../assets/images/image/cart_book.png" height="280">
			            	</div>
			            	<div class="font_18 text_ellipsis margin_top_20">常见民事纠纷裁判思路与规则</div>
			            	<div class="color_666 text_ellipsis margin_top_10">常见民事纠纷裁判思路与规则</div>
			            	<div class="margin_top_15 clearfix">
                      <p class="pointer float_left">
                        <span class="font_20 color_title">￥500.00</span>
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
          navDataModel: ['行业动态管控','法律动态管控','视频课程','音频课程'],
        }
        
    },
    methods: {
      // 导航鼠标点击
      tabClick(index){
        switch(index){
          case 0:
            this.$router.push({
              path:'/industryDynamic',
              query: {
                typeId: 0
              }
            })
            break;
          case 1:
            this.$router.push({
              path:'/industryDynamic',
              query: {
                typeId: 1
              }
            })
            break;
          case 2:
            this.$router.push({
              path:'videoCourse',
              query: {
                typeId: 2
              }
            })
            break;
          case 3:
            this.$router.push({
              path:'videoCourse',
              query: {
                typeId: 3
              }
            })
	    		break;
        }
      },
    }
}
</script>
<style scoped lang='less'>
	.content{
		width:1200px;margin:0 auto;min-width: 1200px;
		.width_48{width: 48%;}
		.videoBox{width: 270px;height: 170px;border:1px solid #999999;}
		.height_170{height: 170px;}
    .height_310px{height: 310px;}
    .height_88px{height: 88px;}
		.width_560px{width: 560px;}
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
      >a{width:100%;line-height: 67px;display: inline-block;}
      .listItem:hover{background: #f09105}
    }
  }
</style>
