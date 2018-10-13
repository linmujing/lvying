<template>
    <div class="container">
    	<Header :isLogin='1'></Header>
        <router-view></router-view>

    	<!-- <NavBar></NavBar> -->

    	<Footer></Footer>

        <!-- vuex消息提示 -->
		<Message></Message>
        
    </div>
</template>
<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import Message from '../../components/Message.vue'
export default {
    components : {
        Header,
        Footer,
        Message
        
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
/*.container{*/
    /*background: #f5f5f5;*/
/*}*/
</style>
