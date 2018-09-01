<template>
	<div class="">
    <div>
      <Carousel  radius-dot v-model="value" autoplay loop>
        <CarouselItem v-for="(item,index) in 3" :key="index">
          <div class="carousel">
            <img src="../assets/images/image/banner.png" class="all_width block">
          </div>
        </CarouselItem>
      </Carousel>
    </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
        value: 0,
			}
		},
		methods:{

		},
		mounted(){
			
		}
	}
</script>
<style lang='less' scoped>
  .carousel{
    width: 100%;
    /*height: 540px;*/
  }
</style>
