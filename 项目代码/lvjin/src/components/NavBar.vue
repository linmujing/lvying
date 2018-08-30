<template>
	<div>
		<div class="nav">
			<div class="center"> 
				<ul class="list_unstyled ul_inline clearfix color_fff font_18">
					<li>行业动态管控</li>
					<li>法律动态管控</li>
					<li>视频课程</li>
					<li>音频课程</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			
		},
		mounted(){
			
		}
	}
</script>
<style lang='less' scoped>
	.nav{
		background: #00AA88;
		.center{
			width:1200px;margin:0 auto;
			>ul>li{
				padding: 20px 23px;cursor: pointer;
			}
		}
	}
</style>