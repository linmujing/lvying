<template>
	<div class="">
	    <div class="nav" style="position:relative;z-index:11;">
	      <div class="center relative">
					<ul class="list_unstyled ul_inline clearfix font_18 navbar">
	          <li class="pointer" :class='{cur: index == curIndex}' v-for="(item,index) in navTitle" :key="index" @click='tabClick(item.id,index)'>
	            <span class="color_fff tabHover">{{item.catName}}</span>
	          </li>
	        </ul>
	        <div v-show="showItem" ref="listBox" class="listBox">
	          <div class="">

	            <div v-for="(items,index1) in secondNavTitle" :key="index1">

	              <div @mouseenter="boxMouseOver(items.id, index1)" @click="jumpDown(items.catCode,items.catName)"
										class="listItem pointer padding_top_20 padding_bottom_20 padding_left_20 padding_right_10 clearfix">
	                <span class="float_left color_fff font_18">{{items.catName}}</span>
	                <Icon class="float_right" type="ios-arrow-forward" size="27" color="#fff"/>
	              </div>

	              <div v-show="thirdNavTitle.length > 0">
                  <div v-show="showBox" class="itemBox bg_white width_1000px" :style="{minHeight: listBoxHeight + 'px'}">
                    <div v-for="(itemss,index2) in thirdNavTitle" :key="index2">
                      <!--<div @click="jumpDown(2)" class="font_18 pointer hover_title">{{itemss.catName}}</div>-->

                      <ul class="list_unstyled ul_inline clearfix margin_bottom_20">
                        <li @click="jumpDown(itemss.catCode,itemss.catName)" class="margin_top_5 margin_right_30 pointer hover_title">{{itemss.catName}}</li>
                      </ul>

                    </div>
                  </div>
                </div>

	            </div>

	          </div>
	        </div>

	      </div>
	    </div>

			<div class="mask"  v-show="showBox"  @mouseover="boxMouseOut" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:8;"></div>
	</div>
</template>
<script>

	export default {
	  props:['nowIndex','showItem','catCode'],
		data() {
			return {

        showBox: false,

        // 当前悬停位置
        curIndex: this.nowIndex,
        // 二级标题悬停
        itemsIndex:0,
        /*导航栏数据模型*/
        navDataModel:[],
        navTitle: [],
        secondNavTitle: [],
        thirdNavTitle: [],
        goodsCode: '',
        listBoxHeight: ''

			}
		},
    watch: {
	    //监听参数变化
      $route(){
        this.goodsCode = this.$route.query.catCode
      },
      goodsCode() {
        this.getSecondNavTitle(this.goodsCode, 2)
      },
    },
    mounted(){
      this.getNavTitle()
      console.log(this.catCode)
      this.getSecondNavTitle(this.catCode, 2)
    },
		methods:{
      // 获取导航标题
      getNavTitle(){
        // 获取产品分类列表
        this.$api.getProductCatList( this.$Qs.stringify({'parentId': '0'}) )

          .then( (res) => {

            if(res.data.code == 200){

              this.navTitle = res.data.content
              // 导航标题信息
              sessionStorage.setItem("NavTitle", JSON.stringify(res.data.content));

            }else if (res.data.code == 500){

              this.$Message.warning(res.data.message);

            }

          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
      // hover导航标题
      getSecondNavTitle(id, type){
        // 获取产品分类列表
        this.$api.getProductCatList( this.$Qs.stringify({'parentId': id}) )

          .then( (res) => {

            if(res.data.code == 200){

              switch (type) {
                case 2:
                  this.secondNavTitle = res.data.content
                  break
                case 3:
                  this.thirdNavTitle = res.data.content
                  break
              }

            }else if (res.data.code == 500){

              this.$Message.warning(res.data.message);

            }

          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
      // 导航鼠标点击
      tabClick(catCode,index) {
        this.curIndex = index
        console.log(catCode)
        switch (catCode) {
          case '1':
            this.$router.push({
              path: '/industryDynamic',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
          case '2':
            this.$router.push({
              path: '/industryDynamic',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
          case '3':
            this.$router.push({
              path: 'videoCourse',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
          case '4':
            this.$router.push({
              path: 'videoCourse',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
          case '5':
            this.$router.push({
              path: 'lvyingMall',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
        }
      },
      // 二级导航鼠标悬停
      boxMouseOver(id, index){
				this.showBox = true;
        this.itemsIndex = index;
        this.listBoxHeight= this.$refs.listBox.offsetHeight;
        this.getSecondNavTitle(id, 3)
			},
			//鼠标移除
			boxMouseOut(){
				this.showBox = false;
			},

      //跳转jumpDown
      jumpDown(id, name){
        var typeid = this.$route.query.typeId;
        console.log(name)
        switch(typeid){
          case 3:
          case 4:
            this.$router.push({
              path:'industryDynamicList',
              query: {
                catName: name,
                typeId: typeid,
                catCode: id
              }
            })
            break;
          case 1:
          case 2:
            this.$router.push({
              path:'videoCourseList',
              query: {
                catName: name,
                typeId: typeid,
                catCode: id
              }
            })
            break;
        }
      }
		}
	}
</script>
<style lang='less' scoped>
  .navbar .cur{
    background: #F09105;
  }
  .nav{
    background: #00AA88;height: 67px;
    .center{
      width:1200px;margin:0 auto;background: #00AA88;
      .navbar>li{
        width: 180px;text-align: center;
        >span{width:100%;line-height: 67px;display: inline-block;}
        >span:hover{background: #f09105;}
      }
    }
    .listBox{
      position: absolute;top: 67px;left: 0;z-index: 99;
      .listItem{background: rgba(0,0,0,0.5);width:180px;}
      .listItem:hover{background: #00aa88}
      .itemBox{position: absolute;top:0;left:180px;padding: 20px;min-height: 200px}
    }
    .width_1000px{width: 1000px;}
  }
</style>
