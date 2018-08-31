<template>
    <div class="container">
    	<Header></Header>
        <router-view></router-view>
    	<Footer></Footer>
		
    </div>
</template>
<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
export default {
    components : {
        Header,
        Footer,
    },
    data() {
        return {
        	
        }
        
    },
    methods: {
    	
    }
}
</script>
<style scoped lang='less'>
.container{
    background: #f5f5f5;
}
</style>
