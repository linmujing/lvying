<template>
	<div class="">
	    <div class="nav" style="position:relative;z-index:10000;">
	      <div class="center relative">
					<ul class="list_unstyled ul_inline clearfix font_18 navbar">
	          <li class="pointer" :class='{cur: index == curIndex}' v-for="(item,index) in navDataModel" :key="index" @click='tabClick(index)'>
	            <a href="javascript:void(0)" class="color_fff tabHover">{{item.title}}</a>
	          </li>
	        </ul>
	        <div v-show="showItem" class="listBox">
	          <div class="">
	
	            <div v-for="(items,index) in navDataModel[curIndex].lists" :key="index">
	
	              <div @mouseover="boxMouseOver(index)" @click="jumpDown(index)" 
										class="listItem pointer padding_top_20 padding_bottom_20 padding_left_20 padding_right_10 clearfix">
	                <span class="float_left color_fff font_18">{{items.title}}</span>
	                <Icon class="float_right" type="ios-arrow-forward" size="27" color="#fff"/>
	              </div>
	
	              <div v-show="showBox" class="itemBox bg_white width_1000px" >
	                <div v-for="(item,index2) in navDataModel[curIndex].lists[itemsIndex].items " :key="index2">
	                  <div @click="jumpDown(index)" class="font_18 pointer hover_title">{{item.title}}</div>
	
	                  <ul class="list_unstyled ul_inline clearfix margin_bottom_20">
	                    <li @click="jumpDown(index)" v-for="( i, index3) in item.arr" :key="index3" class="margin_top_5 margin_right_30 pointer hover_title">{{i}}</li>
	                  </ul>
	
	                </div>
	              </div>
	
	            </div>
	
	          </div>
	        </div>
	        
	      </div>
	    </div>

			<div class="mask"  v-show="showBox"  @mouseover="boxMouseOut" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;"></div>
	</div>
</template>
<script>

	export default {
	  props:['nowIndex','showItem'],
		data() {
			return {

			showBox: false,

			// 当前悬停位置
			curIndex: this.nowIndex,
			// 二级标题悬停
			itemsIndex:0,
			/*导航栏数据模型*/
			navDataModel:[
				{
					title: "行业动态管控",
					lists:[
						{
							title: "行业（企业）",
							items:[
								{
									title: "行业",
									arr:["入职申请表" ,"入职申请表"]
								},
								{
									title: "行业",
									arr:["入职申请表" ,"入职申请表"]
								}
							]
						},
						{
							title: "行业（企业）",
							items:[
								{
									title: "行业",
									arr:["入职申请表" ,"入职申请表"]
								},
								{
									title: "行业",
									arr:["入职申请表" ,"入职申请表"]
								}
							]
						},
						{
							title: "行业（企业）",
							items:[
								{
									title: "行业",
									arr:["入职申请表" ,"入职申请表"]
								}
							]
						},
						{
							title: "行业（企业）",
							items:[
								{
									title: "行业",
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
							title: "视频课程",
							items:[
								{
									title: "",
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
							title: "音频课程",
							items:[
								{
									title: "",
									arr:["入职申请表" ,"入职申请表"]
								}
							]
						}
					]
				}
			],

			}
		},
		methods:{
      // 导航鼠标点击
      tabClick(index){
        this.curIndex = index;
        switch(index){
          case 0:
            this.$router.push({
              name:'industryDynamic',
              params: {
                typeId: 0
              }
            })
            break;
          case 1:
            this.$router.push({
              name:'industryDynamic',
              params: {
                typeId: 1
              }
            })
            break;
          case 2:
            this.$router.push({
              name:'videoCourse',
              params: {
                typeId: 2
              }
            })
            break;
          case 3:
            this.$router.push({
              name:'videoCourse',
              params: {
                typeId: 3
              }
            })
            break;
        }
      },
      // 二级导航鼠标悬停
      boxMouseOver(index){
				this.showBox = true;
        this.itemsIndex = index;

			},
			//鼠标移除
			boxMouseOut(){
				this.showBox = false;
			},

      //跳转jumpDown
      jumpDown(index){
      	var i = this.curIndex;
        switch(i){
        	case 0:
        	case 1:
	    		this.$router.push({
		          path:'/industryDynamicDetail'
		       	})
	    		break;
    		case 2:
    		case 3:
	    		this.$router.push({
		          path:'/videoCourseList'
		        })
	    		break;
        }
      }
		},
		mounted(){
      console.log(this.nowIndex)
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
        >a{width:100%;line-height: 67px;display: inline-block;}
        >a:hover{background: #f09105;}
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
</style>
