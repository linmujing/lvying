<template>
    <div class="container">
    	
    	<Header :isLogin='2'></Header>
    	
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
