<template>
	<div class="">
    <div class="nav">
      <div class="center relative">

        <ul class="list_unstyled ul_inline clearfix font_18 navbar">
          <li class="pointer" :class='{cur: index == curIndex}' v-for="(item,index) in navDataModel" :key="index" @mouseover='tabHover(index)'>
            <a href="javascript:void(0)" class="color_fff">{{item.title}}</a>
          </li>
        </ul>

        <div class="listBox">
          <div class="">

            <div v-for="(items,index) in navDataModel[curIndex].lists" :key="index">

              <div @mouseover="tabItemsHover(index)" class="listItem pointer padding_top_20 padding_bottom_20 padding_left_20 padding_right_10 clearfix">
                <span class="float_left color_fff font_18">{{items.title}}</span>
                <Icon class="float_right" type="ios-arrow-forward" size="27" color="#fff"/>
              </div>

              <div class="itemBox bg_white width_1000px">
                <div v-for="(item,index2) in navDataModel[curIndex].lists[itemsIndex].items " :key="index2">
                  <div class="font_18">{{item.title}}</div>

                  <ul class="list_unstyled ul_inline clearfix margin_bottom_20">
                    <li v-for="( i, index3) in item.arr" :key="index3" class="margin_top_5 margin_right_30 pointer hover_title">{{i}}</li>
                  </ul>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>

	export default {
	  props:['nowIndex'],
		data() {
			return {


        /*导航栏数据模型*/ 
        navDataModel:[
          {
            title: "行业动态管控",
            lists:[
              {
                title: "法律（企业）",
                items:[
                  {
                    title: "法律",
                    arr:["入职申请表" ,"入职申请表"]
                  },
                  {
                    title: "法律",
                    arr:["入职申请表" ,"入职申请表"]
                  }
                ]
              },
              {
                title: "法律（企业）",
                items:[
                  {
                    title: "法律",
                    arr:["入职申请表" ,"入职申请表"]
                  },
                  {
                    title: "法律",
                    arr:["入职申请表" ,"入职申请表"]
                  }
                ]
              },
              {
                title: "法律（企业）",
                items:[
                  {
                    title: "法律",
                    arr:["入职申请表" ,"入职申请表"]
                  }
                ]
              },
              {
                title: "法律（企业）",
                items:[
                  {
                    title: "法律",
                    arr:["入职申请表" ,"入职申请表"]
                  }
                ]
              }
            ]
          },
          {
            title: "法律动态管控",
            lists:[
              {
                title: "法律（企业）",
                items:[
                  {
                    title: "法律",
                    arr:["入职申请表" ,"入职申请表"]
                  }
                ]
              }
            ]
          },
          {
            title: "视频课程",
            lists:[
              {
                title: "法律（企业）",
                items:[
                  {
                    title: "法律",
                    arr:["入职申请表" ,"入职申请表"]
                  }
                ]
              }
            ]
          },
          {
            title: "音频课程",
            lists:[
              {
                title: "法律（企业）",
                items:[
                  {
                    title: "法律",
                    arr:["入职申请表" ,"入职申请表"]
                  }
                ]
              }
            ]
          }
        ],
        // 当前悬停位置
        curIndex: 0,
        // 二级标题悬停
        itemsIndex:0,
        
        showBox: false,
        showItemBox: false,
        showMask: false,

			}
		},
		methods:{
      // 导航鼠标悬停
      tabHover(index){

        this.curIndex = index;

      },
      // 二级导航鼠标悬停
      tabItemsHover(index){

        this.itemsIndex = index;

      },

      tabToggle: function(index){
        this.curIndex = index;
        this.showBox = true;
        this.showMask = true;
      },
      //显示下拉菜单
      overShow (i) {
        console.log(i);
        this.showItemBox = true;
      },
      //隐藏下拉
      hideMask(){
        this.showMask = false;
        this.showBox = false;
        this.showItemBox = false;
      },
      //跳转
      toDynamic(index){
        this.$router.push({
        	path:'/industryDynamicList'
    	})
      }
		},
		mounted(){

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
        >a{padding: 20px;display: inline-block;}
      }
    }
    .listBox{
      position: absolute;top: 67px;left: 0;z-index: 99;
      .listItem{background: rgba(0,0,0,0.5);width:180px;}
      .listItem:hover{background: #00aa88}
      .itemBox{position: absolute;top:0;left:180px;padding: 20px;}
    }
    .width_1000px{width: 1000px;}
  }
  .mask{position: absolute;top:0;left:0;background: transparent;width: 100%;z-index: 90;}
</style>
