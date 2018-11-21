<template>
	<div>
    <!--支付回调弹框 -->
    <Modal v-model="payModel"  width="680" footer-hide >
        <p slot="header" >
            <span class="font_18" style="font-weight:400;">支付提示</span>
        </p>
        <div class="text_center" style="width:648px;height:100px;position:relative;">
            
            <div  v-if="paystate != 0" style="color:#00aa88;font-size:30px">支付成功</div>
            <div  v-else style="color:red;font-size:30px">支付失败</div>
        </div>
        <div class="text_center font_14"  style="height:50px;">
            <Button type="success" ghost @click="$router.push({ path: '/personCenter/myOrder'})">查看订单</Button>
        </div>
    </Modal>
	</div>
</template>
<script>
	export default {
		data() {
			return {
                payModel: true,//弹框
                paystate: 0 , //支付状态 0 ：支付失败 ，其他：支付成功
			}
		},
		mounted(){
            if(this.GetQueryString(orderCode) ){
                this.getOrderState();
            }
		},
        methods:{
            // 获取地址栏参数
			GetQueryString(name){
            　　var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            　　var r = window.location.search.substr(1).match(reg);
            　　if(r!=null) {return unescape(r[2])};
				return null;
			},
            // 查询订单状态
            getOrderState(){

                this.payTimer = false;

                this.$api.getOrderInfo( this.$Qs.stringify({ 'orderCode': this.GetQueryString(orderCode) })  )

                .then( (res) => {

                    console.log(res)

                    if(res.data.code == 200){

                        if(res.data.content.orderStatus != '0'){
                            
                            // 订单类型状态更改
                            this.$store.commit('personCenter/setOrderType', parseFloat(res.data.content.orderStatus) + 1);

                            this.paystate = res.data.content.orderStatus ;

                            // 页面跳转
                            this.$store.commit('personCenter/NavIndex', 3);

                        }

                    }else{

                        this.$Message.warning(res.data.message);

                    }

                })

            }
        }
    }
</script>
<style lang='less' scoped>

</style>
