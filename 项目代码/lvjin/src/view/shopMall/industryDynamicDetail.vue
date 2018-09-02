<template>
  <div>
    <NavBar :nowIndex="0"></NavBar>
    <div class="box_center_1200 detailBox">
      <Row class="margin_top_30">
        <Col span="12">
          <div class="width_600px height_400px border"></div>
        </Col>
        <Col span="12" class="padding_20">
          <div class="font_20 font_weight_bold text_ellipsis">行业动态管控-知识产权许可使用合同起草</div>
          <div class="color_999 twoline_ellipsis margin_top_20">帮助拥有知识产权的企业起草和完善知识产权许可使用合同帮助拥有知识产权的企业起草和完善知识产权许可使用合同</div>
          <div class="clearfix margin_top_30">
            <div class="float_left">
              <Rate show-text allow-half disabled v-model="valueCustomText">
                <span style="color: #f5a623">{{ valueCustomText }}</span>
              </Rate>
            </div>
            <div class="float_left color_999 line_height_30px margin_left_30">1234人看过</div>
          </div>
          <div class="margin_top_20">
            <span v-for="item in 3" class="tag">标签</span>
          </div>
          <div class="margin_top_30">
            <span class="color_title font_20">￥500.00</span>
            <Tooltip content="特价仅剩4天6小时35分钟" theme="light" placement="right" class="tip">
              <del class="color_999 font_20 padding_left_20">￥800.00</del>
            </Tooltip>
          </div>
          <div class="margin_top_50">
            <Button size="large" type="warning" shape="circle">加入购物车</Button>
            <Button size="large" type="success" shape="circle" class="margin_left_10 bg_title">立即购买</Button>
          </div>
        </Col>
      </Row>
      <!--简介-->
      <div class="margin_top_50">
        <div id="detail1" class="bg_f5 clearfix border_e6">
          <a href="#detail1" @click="" :class="{cur:isCur == 0}" class="inline_block padding_20_15 width_150px">简介</a>
          <a href="#detail2" :class="{cur:isCur == 1}" class="inline_block padding_20_15">全程动态管控系统</a>
          <a href="#" :class="{cur:isCur == 2}" class="inline_block padding_20_15 width_150px">评价</a>
        </div>
        <div class="padding_20 margin_bottom_20">
          <Row class="margin_top_10">
            <Col span="2" class="font_weight_bold">适应企业</Col>
            <Col span="22" class="line_height_25px">课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程</Col>
          </Row>
          <Row class="margin_top_20">
            <Col span="2" class="font_weight_bold">内容介绍</Col>
            <Col span="22" class="line_height_25px">课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程</Col>
          </Row>
        </div>
      </div>
      <!--全程动态管控系统-->
      <div>
        <div id="detail2" class="font_weight_bold bg_f5 border_e6 padding_15">全程动态管控系统</div>
        <div class="margin_top_10">
          <div v-for="item in 3" class="margin_15 border_bottom_e6 padding_bottom_10">
            <p class="font_18">1.1.1专项服务合同</p>
            <div class="margin_left_30 margin_top_10 clearfix">
              <span>视频音频详细讲解详细讲解</span>
              <div class="float_right">
                <Button size="small" type="warning" shape="circle">查看详情</Button>
                <Button size="small" type="success" shape="circle" class="margin_left_10 bg_title">立即购买</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
import NavBar from '../../components/NavBar.vue'
export default {
    components : {
      NavBar,
    },
    data() {
        return {
          valueCustomText: 3.8,
          isCur: 0,
        }
        
    },
    methods: {

    }
}
</script>
<style scoped lang='less'>
  .detailBox{
    .width_150px{width: 150px;}
    .width_600px{width: 600px;}
    .height_400px{height: 400px;}
    .border{border:1px solid #999999;}
    .tag{color: #00AA88;padding-right: 20px}
    .padding_20_15{padding: 10px 20px;text-align: center;float: left;font-size: 16px;}
    .cur{color:#fff;background: #00AA88;}
    .border_e6{border:1px solid #e6e6e6;}
    .border_bottom_e6{border-bottom: 1px solid #e6e6e6;}
  }

</style>
