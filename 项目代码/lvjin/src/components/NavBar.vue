<template>
	<div class="">
    <div class="nav">
      <div class="center relative">
        <ul class="list_unstyled ul_inline clearfix font_18 navbar">
          <li class="pointer" :class='{cur: index == curIndex}' v-for="(item,index) in tabParams" @click='tabToggle(index)'>
            <a href="javascript:void(0)" class="color_fff">{{item}}</a>
          </li>
        </ul>
        <div v-show="showBox" class="listBox">
          <div class="">
            <div v-for="(item,index) in 3">
              <div @mouseover="overShow(index)" class="listItem pointer padding_top_20 padding_bottom_20 padding_left_20 padding_right_10 clearfix">
                <span class="float_left color_fff font_18">法律（企业）</span>
                <Icon class="float_right" type="ios-arrow-forward" size="27" color="#fff"/>
              </div>
              <div v-show="showItemBox" class="itemBox bg_white width_1000px">
                <div v-for="item in 4" >
                  <div class="font_18">法律</div>
                  <ul class="list_unstyled ul_inline clearfix margin_bottom_20">
                    <li v-for="item in 10" class="margin_top_5 margin_right_30 pointer hover_title">入职申请表</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showMask" @click="hideMask" class="mask" v-bind:style="{height: bodyHeight + 'px'}"></div>
	</div>
</template>
<script>

	export default {
	  props:['nowIndex'],
		data() {
			return {
			  bodyHeight: document.documentElement.clientHeight,
			  curIndex:this.nowIndex,
        tabParams: ['行业动态管控', '法律动态管控', '视频课程', '音频课程'],
        showBox: false,
        showItemBox: false,
        showMask: false,

			}
		},
		methods:{
      tabToggle: function(index){
        this.curIndex = index;
        this.showBox = true;
        this.showMask = true;
      },
      overShow (i) {
        console.log(i);
        this.showItemBox = true;
      },
      hideMask(){
        this.showMask = false;
        this.showBox = false;
        this.showItemBox = false;
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
      width:1200px;margin:0 auto;
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
