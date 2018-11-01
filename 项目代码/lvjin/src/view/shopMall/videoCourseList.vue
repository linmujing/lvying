<template>
  <div class="bg_f5">
    <div class="content">
      <!--面包屑-->
      <div class="padding_top_20 padding_bottom_20">
        <!--<div class="tagBox inline_block pointer color_666">-->
          <!--<span class="">视频课程</span>-->
          <!--<Icon type="ios-arrow-down"/>-->
        <!--</div>-->
        <!--<Icon type="ios-arrow-forward" />-->
        <!--<div class="tagBox inline_block pointer color_666">-->
          <!--<span class="">劳动</span>-->
          <!--<Icon type="ios-arrow-down"/>-->
        <!--</div>-->
        <!--<Icon type="ios-arrow-forward" />-->
        <div class="tagBox inline_block color_666">
          <span class="">{{catName}}</span>
          <Icon type="ios-arrow-down"/>
        </div>
        <div class="inline_block padding_left_10">
          共找到<span class="color_title">{{total}}</span>门课程
        </div>
      </div>
      <!--课程-->
      <div class="padding_15 bg_white">
        课程：<span class="color_title">全部</span> ( {{total}} )
      </div>
      <!--排序-->
      <div class="padding_15 bg_white margin_top_15">
        <ul class="list_unstyled ul_inline clearfix">
          <li v-for="(item,index) in sortName" :key="index" :class="sortIndex == index ? 'color_title' : ''" class="margin_right_30 pointer" @click="changeClass(index)">
            <span>{{item.name}}</span>
            <Icon v-if="item.state" type="ios-arrow-up"/>
            <Icon v-else type="ios-arrow-down"/>
          </li>
        </ul>
      </div>
    </div>
    <!--列表-->
    <div class="center_box">
      <ul class="list_unstyled ul_inline clearfix">
        <li v-for="(item,index) in productList" :key="index" class="listBox bg_white">
          <div @click="jumpDetail(item.productCode)" class="height_210px all_width">
            <img :src="item.productProfileUrl" class="all_width all_height">
          </div>
          <div class="list_item">
            <div class="font_18 font_weight_bold text_ellipsis">{{item.productTitle}}</div>
            <div class="margin_top_10 clearfix color_999">
              <div class="float_left width_50 text_ellipsis">{{item.productKeyWord}}</div>
              <div class="float_right text_ellipsis">{{item.lookCount}}人看过</div>
            </div>
            <div class="clearfix margin_top_5">
            	<div class="float_left font_20 color_title">￥{{item.productPrice}}</div>
            	<div class="float_right color_666 line_height_30px text_ellipsis width_50 text_right">{{item.createBy}}</div>
            </div>
            <div class="margin_top_10 clearfix">
              <p class="pointer float_left">
								<Icon type="ios-headset-outline" size="30"/>
								<span class="font_16 color_666 vertical_middle" @click="jumpDetail(item.productCode)">试听</span>
							</p>
              <div class="float_right">
                <Button type="success" shape="circle" class="bg_title" @click="goBuy(item.productCode)">立即购买</Button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- 订单分页 -->
      <div class="margin_80">
        <Page :total="total" :current="current"   :page-size="pageSize"
              @on-change="changeOrderPage" show-total show-elevator />
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
          sortName: [
            {name: '综合排序', state: true},
            {name: '销量', state: true},
            {name: '满意度', state: true},
            {name: '价格', state: true}
          ],
          sortIndex: 0,
          total: 0,
          current: 1,
          pageSize: 12,
          productList: [],
          catCode: '',
          catName: '',
        }

    },
    mounted(){
      this.catCode = this.$route.query.catCode
      this.catName = this.$route.query.catName
      this.getProductList(1,10)
    },
    methods: {
      jumpDetail(productCode){
        this.$router.push({
          path:'/videoCourseDetail',
          query: {
            productCode: productCode,
            typeId: this.$route.query.typeId
          }
        })
      },
      // 获取商品列表
      getProductList(page,sort){
        this.$Spin.show()
        this.$api.getProductList( this.$Qs.stringify({'pageNo': page, 'pageSize': 12, 'productCat': this.catCode, 'orderByStr': sort}) )

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
        this.sortIndex = 0
        this.getProductList(value,10)
      },
      //点击排序
      changeClass(index){
        if(this.sortIndex == index){
          this.sortName[index].state = !this.sortName[index].state
        }
        this.sortIndex = index
        var sortId
        switch (index) {
          case 0:
            this.sortName[index].state ? sortId = 10 : sortId = 11
            break
          case 1:
            this.sortName[index].state ? sortId = 20 : sortId = 21
            break
          case 2:
            this.sortName[index].state ? sortId = 30 : sortId = 31
            break
          case 3:
            this.sortName[index].state ? sortId = 40 : sortId = 41
            break
        }
        this.getProductList(1,sortId)
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
<style type="text/css">
	/*修改分页样式*/
	.ivu-page-item{background: #F5F5F5;}
	.ivu-page-next, .ivu-page-prev{background: #F5F5F5;}
	.ivu-page-next:hover a,.ivu-page-prev:hover a,.ivu-page-item:hover a,.ivu-page-item-active a,.ivu-page-item-active:hover a{color: #00AA88;}
	.ivu-page-item:hover,.ivu-page-item-active {border-color: #00AA88;}
	.ivu-page-disabled a {color: #ccc !important;}
  .text_ellipsis,.text_ellipsis p{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
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
