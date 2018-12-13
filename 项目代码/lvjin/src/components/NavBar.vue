<template>
	<div class="">
	    <div class="nav" style="position:relative;z-index:11;">
	      <div class="center relative">
					<ul class="list_unstyled ul_inline clearfix font_18 navbar">
	          <li class="pointer" :class='{cur: index == curIndex}' v-for="(item,index) in navTitle" :key="index" @click='tabClick(item.id,index)'>
	            <span @mouseenter="tabHover(item.id,index)" class="color_fff tabHover">{{item.name}}</span>
	          </li>
	        </ul>

	          <div v-if="showNav">
              <div ref="listBox" class="listBox" :style="{left: left + 'px'}">
                <div class="listItemBox" :class='{scroll: secondNavTitle.length>6}'>
                  <div v-for="(items,index1) in secondNavTitle" :key="index1">
                    <div @mouseenter="boxMouseOver(items.id, index1)" @click="jumpDown(items.id,items.catName)"
                         class="listItem pointer padding_top_20 padding_bottom_20 padding_left_20 padding_right_10 clearfix">
                      <span class="float_left color_fff font_18 inline_block text_ellipsis" style="width: 120px">{{items.catName}}</span>
                      <Icon class="float_right" type="ios-arrow-forward" size="27" color="#fff"/>
                    </div>
                  </div>
                </div>

                <div v-show="showBox">
                  <div class="itemBox bg_white" :class="{width_400px: fourNavTitle.length > 2}">
                    <div v-for="(itemss,index2) in thirdNavTitle" :key="index2" class="float_left width_33 relative" style="height: 76px">
                      <div @mouseenter="thirMouseOver(itemss.id, index2)" @click="jumpDown(itemss.id,itemss.catName)" class="font_16 pointer hover_title margin_top_10 text_ellipsis">{{itemss.catName}}</div>

                      <div style="position: absolute;top: 35px;left: 0;z-index: 100" class="bg_white">
                        <ul v-show="fourIndex == index2" class="list_unstyled ul_inline clearfix margin_bottom_10">
                          <li v-for="(itemsss,index3) in fourNavTitle" :key="index3" @click="jumpDown(itemsss.id,itemsss.catName)" class="margin_top_5 margin_right_20 pointer hoverTT text_ellipsis font_14">{{itemsss.catName}}</li>
                        </ul>
                      </div>

                    </div>
                  </div>
                </div>



              </div>
            </div>

	      </div>
	    </div>

			<div class="mask"  v-show="showItem"  @mouseover="boxMouseOut" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:8;"></div>
	</div>
</template>
<script>

	export default {
	  props:['nowIndex', 'showNav','catCode'],
		data() {
			return {

        showItem: false,
        showBox: false,

        // 当前悬停位置
        curIndex: this.nowIndex,
        // 二级标题悬停
        itemsIndex:0,
        // 三级标题悬停
        fourIndex:0,
        /*导航栏数据模型*/
        navDataModel:[],
        navTitle: [
          {name: '行业动态管控', id: 1},
          {name: '法律动态管控', id: 2},
          {name: '视频课程', id: 3},
          {name: '音频课程', id: 4}
        ],
        secondNavTitle: [],
        thirdNavTitle: [],
        fourNavTitle: [],
        goodsCode: '',
        listBoxHeight: '',
        left: 0,

			}
		},
    watch: {
	    //监听参数变化
      $route(){
        this.goodsCode = this.$route.query.typeId
      },
      goodsCode() {
        this.getSecondNavTitle(this.goodsCode, 2)
      },
    },
    mounted(){
      // this.getNavTitle()
      console.log(this.nowIndex)
      this.getSecondNavTitle(this.catCode, 2)
    },
		methods:{
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
                case 4:
                  this.fourNavTitle = res.data.content
                  // console.log(res.data.content)
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
      tabClick(id,index){
        // console.log(id)
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
      // 一级导航悬停
      tabHover(id, index){
        // console.log(id)
        // this.secondNavTitle = []
        this.getSecondNavTitle(id, 2)
        // this.left = 180 * index;
        this.showBox = false;
        this.showItem = true;
      },
      // 二级导航鼠标悬停
      boxMouseOver(id, index){
        this.thirdNavTitle = []
        this.fourNavTitle = []
				this.showBox = true;
        this.itemsIndex = index;
        this.showItem = true;
        this.listBoxHeight= this.$refs.listBox.offsetHeight;
        this.getSecondNavTitle(id, 3)
			},
      // 三级导航鼠标悬停
      thirMouseOver(id, index){
        // this.fourNavTitle = []
        this.fourIndex = index
        this.getSecondNavTitle(id, 4)
      },
			//鼠标移除
			boxMouseOut(){
        this.showBox = false
        this.showItem = false
			},

      //跳转jumpDown
      jumpDown(id, name){
        var typeid = this.catCode
        // console.log(name)
        switch(typeid){
          case 1:
          case 2:
            this.$router.push({
              path:'industryDynamicList',
              query: {
                catName: name,
                typeId: typeid,
                catCode: id
              }
            })
            break;
          case 3:
          case 4:
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
      },
		}
	}
</script>
<style>
  .text_ellipsis{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
</style>
<style lang='less' scoped>
  .navbar .cur{
    background: #F09105;
  }
  .scroll{overflow-y: scroll}
  .nav{
    background: #00AA88;height: 67px;
    .center{
      width:1200px;margin:0 auto;background: #00AA88;
      .navbar{
        >li{
          width: 180px;text-align: center;line-height: 67px;
        }
        >li:hover{background: #f09105;}
      }
      .width_180px{width: 180px}
    }
    .listBox{
      position: absolute;top: 67px;left: 0;z-index: 99;
      .listItemBox{background: rgba(0,0,0,0.5);height: 500px;}
      .listItem{width:180px;}
      .listItem:hover{background: #00aa88}
      .itemBox{position: absolute;top:0;left:180px;padding: 10px;width: 1020px;height: 500px;}
      .width_400px{width: 400px}
    }
  }
  .show {
      transition: all 0.5s;
   }
  .hoverTT{color: #999}
  .hoverTT:hover{color: #00AA88}
</style>
