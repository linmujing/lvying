<template>
  <div class="bg_f5">
    <div class="content">
      <!--面包屑-->
      <div class="padding_top_20 padding_bottom_20">
        <div class="tagBox inline_block pointer color_666">
          <span class="">视频课程</span>
          <Icon type="ios-arrow-down"/>
        </div>
        <Icon type="ios-arrow-forward" />
        <div class="tagBox inline_block pointer color_666">
          <span class="">劳动</span>
          <Icon type="ios-arrow-down"/>
        </div>
        <Icon type="ios-arrow-forward" />
        <div class="tagBox inline_block color_666">
          <span class="">项目启动</span>
          <Icon type="ios-arrow-down"/>
        </div>
        <div class="inline_block padding_left_10">
          共找到<span class="color_title">271</span>门课程
        </div>
      </div>
      <!--课程-->
      <div class="padding_15 bg_white">
        课程：<span class="color_title">全部</span> (271)
      </div>
      <!--排序-->
      <div class="padding_15 bg_white margin_top_15">
        <ul class="list_unstyled ul_inline clearfix">
          <li class="color_title margin_right_30 pointer">
            <span>综合排序</span>
            <Icon v-if="sort" type="ios-arrow-up" />
            <Icon v-else type="ios-arrow-down" />
          </li>
          <li class="margin_right_30 pointer">
            <span>销量</span>
            <Icon v-if="sale" type="ios-arrow-up" />
            <Icon v-else type="ios-arrow-down" />
          </li>
          <li class="margin_right_30 pointer">
            <span>满意度</span>
            <Icon v-if="satisfaction" type="ios-arrow-up" />
            <Icon v-else type="ios-arrow-down" />
          </li>
          <li class="pointer">
            <span>价格</span>
            <Icon v-if="price" type="ios-arrow-up" />
            <Icon v-else type="ios-arrow-down" />
          </li>
        </ul>
      </div>
    </div>
    <!--列表-->
    <div class="center_box">
      <ul class="list_unstyled ul_inline clearfix">
        <li v-for="item in 12" class="listBox bg_white">
          <div @click="jumpDetail" class="height_210px all_width"></div>
          <div class="list_item">
            <div class="font_18 font_weight_bold text_ellipsis">审核同业禁止协议</div>
            <div class="margin_top_10 clearfix color_999">
              <div class="float_left width_50 text_ellipsis">立二拆四案辩护人</div>
              <div class="float_right">1234人看过</div>
            </div>
            <div class="clearfix margin_top_5">
            	<div class="float_left font_20 color_title">￥500.00</div>
            	<div class="float_right color_666 line_height_30px text_ellipsis width_50 text_right">盈科律师事务所</div>
            </div>
            <div class="margin_top_10 clearfix">
              <p class="pointer float_left">
								<Icon type="ios-headset-outline" size="30"/>
								<span class="font_16 color_666 vertical_middle">试听</span>
							</p>
              <div class="float_right">
                <Button type="success" shape="circle" class="bg_title">立即购买</Button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!--分页-->
     <div class="margin_80">
       <Page :total="100" prev-text="上一页" next-text="下一页" />
     </div>
    </div>
	</div>
</template>
<script>
export default {
    components : {
    },
    data() {
        return {
          sort: true,
          sale: false,
          satisfaction: false,
          price: false,
        }
        
    },
    methods: {
      jumpDetail(){
        this.$router.push({path:'/videoCourseDetail'})
      }
    },
    mounted(){
      console.log(this.$route.query.twoPage)
    }
}
</script>
<style type="text/css">
	/*修改分页样式*/
	.ivu-page-item{background: #F5F5F5;}
	.ivu-page-next, .ivu-page-prev{background: #F5F5F5;}
	.ivu-page-next:hover a,.ivu-page-prev:hover a,.ivu-page-item:hover a,.ivu-page-item-active a,.ivu-page-item-active:hover a{color: #00AA88;}
	.ivu-page-item:hover,.ivu-page-item-active {border-color: #00AA88;}
	.ivu-page-disabled a {color: #ccc !important;}
</style>
<style scoped lang='less'>
  .content{
    width: 1210px;margin: 0 auto;
    .tagBox{border: 1px dashed #00AA88;padding: 5px 8px;}
    .padding_15{padding: 15px;}
  }
  .center_box{
    width: 1240px;margin: 0 auto;
    .listBox{
      width: 280px;height: 380px;border: 1px solid #e6e6e6;margin: 30px 15px 0 15px;box-sizing: border-box;
      .height_210px{height: 210px;}
      .list_item{padding: 20px 10px;}
    }
    .margin_80{padding: 80px;text-align: center}
  }
</style>
