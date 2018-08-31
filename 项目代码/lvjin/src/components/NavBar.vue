<template>
	<div class="">
    <div class="nav">
      <div class="center relative">
        <ul class="list_unstyled ul_inline clearfix font_18 navbar">
          <li class="pointer" :class='{cur: index == nowIndex}' v-for="(item,index) in tabParams" @click='tabToggle(index)'>
            <a href="javascript:void(0)" class="color_fff">{{item}}</a>
          </li>
        </ul>
      </div>
    </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
        nowIndex: 0,
        tabParams: ['行业动态管控', '法律动态管控', '视频课程', '音频课程'],
			}
		},
		methods:{
      tabToggle: function(index){
        this.nowIndex = index;
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
    background: #00AA88;
    .center{
      width:1200px;margin:0 auto;
      >ul>li{
        width: 180px;
        text-align: center;
        >a{padding: 20px;display: inline-block;}
      }
    }
  }
</style>
