<template>
    <div class="bg_f5 padding_bottom_120">
        <div class="box_center_1200 padding_top_20">
        	<div class="bg_white login_box">
        		<Row>
        			<Col span="14">
        				<div class="padding_90">
        					<Tabs value="psdLogin">
						        <TabPane label="标签一" name="psdLogin">标签一的内容</TabPane>
						        <TabPane label="标签二" name="codeLogin">标签二的内容</TabPane>
						    </Tabs>
        				</div>
        			</Col>
        			<Col span="10">
        				<div class="padding_90 border_left">1</div>
        			</Col>
        		</Row>
        	</div>
        </div>
    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {
       
        }
        
    },
    methods: {

    }
}
</script>
<style type="text/css">
	.ivu-tabs-nav .ivu-tabs-tab-active,.ivu-tabs-nav .ivu-tabs-tab:hover{color: #00AA88;}
	.ivu-tabs-ink-bar{background: #00AA88;}
</style>
<style scoped lang='less'>
	/*登录框样式*/
	.login_box{
		padding: 70px 0;
		height: 410px;
		.padding_left_90{padding-left: 90px;}
		.border_left{border-left: 2px solid #E6E6E6;}
		.padding_90{padding: 0 90px;}
	}
	.padding_bottom_120{padding-bottom: 120px;}
</style>
