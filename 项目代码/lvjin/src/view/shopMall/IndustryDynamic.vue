<template>
  <div>
    <NavBar :nowIndex="typeId" :showItem='true'></NavBar>
    <Banner></Banner>
    <!--热门推荐-->
    <div class="content">
      <div class="padding_top_30 padding_bottom_30">
        <div class="">
          <div class="clearfix">
            <div class="float_left">
              <span class="title">热门推荐</span>
            </div>
            <div class="float_right more pointer">更多》</div>
          </div>
          <div class="clearfix">
            <div v-for="item in 4" class="width_560px margin_top_20 margin_right_40 float_left clearfix">
              <div class="float_left videoBox"></div>
              <div class="float_left width_290px height_170 padding_left_25">
                <p class="font_18 font_weight_bold">审核同业禁止协议</p>
                <div class="twoline_ellipsis margin_top_10 color_666">为了让孩子进入更好的学校读书，经过精挑细选，王女士花费重金近一千万元购买了一套学区房，为了让孩子进入更好的学校读书，经过精挑细选，王女士花费重金近一千万元购买了一套学区房，为了让孩子进入更好的学校读书，经过精挑细选，王女士花费重金近一千万元购买了一套学区房，</div>
                <div class="text_right margin_top_5">
                  <span class="color_title">查看详情》</span>
                </div>
                <div class="clearfix">
                  <div class="float_left">
                    <span class="font_20 color_title">￥500.00</span>
                  </div>
                  <div class="float_right">
                    <span class="padding_left_25 color_999 line_height_30px">1234人看过</span>
                  </div>
                </div>
                <div class="margin_top_5">
                  <Button type="warning" shape="circle">加入购物车</Button>
                  <Button type="success" shape="circle" class="margin_left_10 bg_title">立即购买</Button>
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
        <div class="float_right more pointer">更多》</div>
      </div>
      <ul class="list_unstyled ul_inline clearfix">
        <li class="width_560px margin_top_30 margin_right_40" v-for="item in 4">
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
        }
        
    },
    methods: {

    },
    mounted(){
      console.log(this.$route.query.typeId)
		}
}
</script>
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
	}
</style>
