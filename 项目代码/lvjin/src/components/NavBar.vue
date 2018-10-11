<template>
	<div class="">
	    <div class="nav" style="position:relative;z-index:10000;">
	      <div class="center relative">
					<ul class="list_unstyled ul_inline clearfix font_18 navbar">
	          <li class="pointer" :class='{cur: index == curIndex}' v-for="(item,index) in navTitle" :key="index" @click='tabClick(item.catCode,index)'>
	            <span class="color_fff tabHover">{{item.catName}}</span>
	          </li>
	        </ul>
	        <div v-show="showItem" class="listBox">
	          <div class="">

	            <!--<div v-for="(items,index) in navDataModel[curIndex].lists" :key="index">-->

	              <!--<div @mouseover="boxMouseOver(index)" @click="jumpDown(1)"-->
										<!--class="listItem pointer padding_top_20 padding_bottom_20 padding_left_20 padding_right_10 clearfix">-->
	                <!--<span class="float_left color_fff font_18">{{items.title}}</span>-->
	                <!--<Icon class="float_right" type="ios-arrow-forward" size="27" color="#fff"/>-->
	              <!--</div>-->

	              <!--<div v-show="showBox" class="itemBox bg_white width_1000px" >-->
	                <!--<div v-for="(item,index2) in navDataModel[curIndex].lists[itemsIndex].items " :key="index2">-->
	                  <!--<div @click="jumpDown(2)" class="font_18 pointer hover_title">{{item.title}}</div>-->

	                  <!--<ul class="list_unstyled ul_inline clearfix margin_bottom_20">-->
	                    <!--<li @click="jumpDown(3)" v-for="( i, index3) in item.arr" :key="index3" class="margin_top_5 margin_right_30 pointer hover_title">{{i}}</li>-->
	                  <!--</ul>-->

	                <!--</div>-->
	              <!--</div>-->

	            <!--</div>-->

	          </div>
	        </div>

	      </div>
	    </div>

			<div class="mask"  v-show="showBox"  @mouseover="boxMouseOut" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;"></div>
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
                    title: "视频课程",
                    // arr:["入职申请表" ,"入职申请表"]
                  },
                  {
                    title: "视频课程2",
                    // arr:["入职申请表" ,"入职申请表"]
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
                    title: "视频课程",
                    // arr:["入职申请表" ,"入职申请表"]
                  },
                  {
                    title: "视频课程2",
                    // arr:["入职申请表" ,"入职申请表"]
                  }
                ]
              }
            ]
          }
        ],
        navTitle: [],
        secondNavTitle: [],
        goodsCode: ''

			}
		},
    watch: {
	    //监听参数变化
      $route(){
        this.goodsCode = this.$route.query.catCode
      },
      goodsCode() {
        this.getSecondNavTitle(this.goodsCode,'1')
      },
    },
    mounted(){
      this.getNavTitle()
      console.log(this.catCode)
      this.getSecondNavTitle(this.catCode,'1')
    },
		methods:{
      // 获取导航标题
      getNavTitle(){
        // 获取产品分类列表
        this.$api.getProductCatList( this.$Qs.stringify({'parentId': '0'}) )

          .then( (res) => {

            if(res.data.code == 200){

              this.navTitle = res.data.content

            }else if (res.data.code == 500){

              this.$Message.warning(res.data.message);

            }

          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
      // hover导航标题
      getSecondNavTitle(catCode, parentId){
        // 获取产品分类列表
        this.$api.getProductCatList( this.$Qs.stringify({'catCode': catCode, 'parentId': parentId}) )

          .then( (res) => {

            if(res.data.code == 200){

              this.secondNavTitle = res.data.content

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
        console.log(index)
        switch (catCode) {
          case '10001':
            this.$router.push({
              path: '/industryDynamic',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
          case '10002':
            this.$router.push({
              path: '/industryDynamic',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
          case '10003':
            this.$router.push({
              path: 'videoCourse',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
          case '10004':
            this.$router.push({
              path: 'videoCourse',
              query: {
                typeId: index,
                catCode: catCode
              }
            })
            break;
          case '10005':
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
      boxMouseOver(index){
				this.showBox = true;
        this.itemsIndex = index;

			},
			//鼠标移除
			boxMouseOut(){
				this.showBox = false;
			},

      //跳转jumpDown
      jumpDown(id){
        var typeid = this.curIndex;
        switch(typeid){
          case 0:
            this.$router.push({
              path:'industryDynamicDetail',
              query: {
                typeId: 0,
                twoPage: id
              }
            })
            break;
          case 1:
            this.$router.push({
              path:'industryDynamicDetail',
              query: {
                typeId: 1,
                twoPage: id
              }
            })
            break;
          case 2:
            this.$router.push({
              path:'videoCourseList',
              query: {
                typeId: 2,
                twoPage: id
              }
            })
            break;
          case 3:
            this.$router.push({
              path:'videoCourseList',
              query: {
                typeId: 3,
                twoPage: id
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
      .itemBox{position: absolute;top:0;left:180px;padding: 20px;}
    }
    .width_1000px{width: 1000px;}
  }
</style>
