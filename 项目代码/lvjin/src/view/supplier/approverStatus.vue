<template>
    <div class="">

        <div class="bg_f5 padding_bottom_40">
	        <div class="box_center_1200 padding_top_20">
	        	<div class="bg_white status_box">

	        		<div>
        				<p class="title">认证状态</p>
        				<p v-if="SupplierData.merchantStatus == 0" class="margin_top_30 font_16 padding_100">您好，您所提交的认证信息正在审核中，我们会在1-3个工作日内审核完毕，并将审核结果及时发短信给您，请耐心等待。</p>
                <p v-else-if="SupplierData.merchantStatus == 1" class="margin_top_30 font_16 padding_100">您好，您所提交的认证信息已通过审核</p>
                <p v-else-if="SupplierData.merchantStatus == 2" class="margin_top_30 font_16 padding_100">您好，您所提交的认证信息审核失败</p>
        			</div>
        			<div class="margin_top_50">
        				<p class="title">已提交的认证信息</p>
        				<div class="padding_100 color_666">
        					<p class="margin_top_30">真实姓名：{{SupplierData.realName}}</p>
        					<p class="margin_top_30">商户名称：{{SupplierData.merchantNm}}</p>
        					<p class="margin_top_30">电子邮箱：{{SupplierData.email}}</p>
        					<p class="margin_top_30">所在地区：{{SupplierData.orgRegin}}</p>
        					<p class="margin_top_30">所在律所/机构：{{SupplierData.orgName}}</p>
        					<p class="margin_top_30">律所/机构电话：{{SupplierData.orgTel}}</p>
        					<p class="margin_top_30">律所/机构地址：{{SupplierData.orgAddress}}</p>
        					<p class="margin_top_30">证件号： {{SupplierData.lawerRegistrationNo}}</p>
        					<div class="margin_top_30">
        						<span>执业证扫描件：</span>
        						<img :src="SupplierData.materialUrl" width="300" height="200" style="vertical-align: top;"/>
        					</div>
                  <div class="margin_top_30">
                    <span>个人资料：</span>
                    <img :src="SupplierData.personIntroduce" width="300" height="200" style="vertical-align: top;"/>
                  </div>
        					<div class="margin_top_30">
		        				<Button @click="edit" size="large" type="success" shape="circle" class="all_width bg_title margin_top_10" style="width: 200px">修改认证资料</Button>
		        			</div>
        				</div>
        			</div>
	        	</div>

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
          SupplierData: {}
        }
    },
  mounted(){
    this.SupplierData = JSON.parse(sessionStorage.getItem("SupplierData"))
    console.log(this.SupplierData)
  },
    methods: {
    	edit(){
    		this.$router.push({path:'/supplier/approver'});
    	}
    }
}
</script>
<style scoped lang='less'>
	.status_box{
		padding: 40px 40px 100px 40px;
		.title{
			font-size: 18px;
			border-left: 5px solid #00AA88;
			padding-left: 10px;
		}
		.padding_100{padding-left: 100px;}
	}
</style>
