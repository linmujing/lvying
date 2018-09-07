<template>
    <!-- 我的售后服务 -->
    <div class="order_box padding_bottom_30">

        <!-- 售后服务标题    -->
        <div class="order_title font_16 border_bottom_1">
            <span>我的售后服务</span>
        </div>

        <!-- 售后服务类型切换 -->
        <div>
            <ul class="service_type padding_left_20 padding_top_30">
                <li :class="[serviceData.serviceIndex == index ? 'active' : '' ]"  v-for="(items, index) in serviceData.serviceType" :key="index"   
                @click="changeServiceType(index)"  >{{items.text}}</li>
            </ul>
            <Input v-model="serviceData.serviceValue" size="large" placeholder="请输入关键字" style="width:200px;padding-right:10px;" />
            <Button type="success" size="large" style="background:#00aa88;width:80px;border-radius:2px;" >搜索</Button>
        </div>

         <!-- 售后服务列表 -->
        <div class="list_box padding_left_20 padding_top_30">
            <div class="header">
                <Col :span="6"><span >商品信息</span></Col>
                <Col :span="5"><span>退款金额</span></Col>
                <Col :span="5"><span>申请类型</span></Col>
                <Col :span="5"><span>退款状态</span></Col>
                <Col :span="3"><span>操作</span></Col>
            </div>
            <ul class="list">
                <li  v-for="(items, index) in serviceData.serviceList" :key="index" >
                    <Col :span="6">
                        <div class="table_block">
                            <p class="td_block">
                                <span :title="items.title">{{items.title}}</span>
                            </p>
                        </div>
                    </Col>
                    <Col :span="5">
                        <div class="table_block">
                            <p class="td_block">
                                <span>{{items.price}}</span> 
                            </p>
                        </div>
                    </Col>
                    <Col :span="5">
                        <div class="table_block">
                            <p class="td_block">
                                <span>{{items.type}}</span> 
                            </p>
                        </div>
                    </Col>
                    <Col :span="5">
                        <div class="table_block">
                            <p class="td_block">
                                <span>{{items.stateText}}</span> 
                            </p>
                        </div>
                    </Col>
                    <Col :span="3">
                        <div class="table_block">
                            <p class="td_block">
                                <span>查看</span>
                            </p>
                        </div>
                    </Col>
                </li>
            </ul>

            <!-- 订单分页 -->
            <div class="list_page" v-if="serviceData.serviceList.length > 5 ">
                <Page :total="serviceData.pageData.total" :current="serviceData.pageData.current"   :page-size="serviceData.pageData.pageSize"  
                    @on-change="changeOrderPage" size="small" show-total show-elevator />
            </div>
        </div>

        <!-- 没有售后服务 -->
        <div class="order_has_not color_ccc" v-if="serviceData.serviceList.length == 0 ">
            暂无售后服务
        </div>

    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            /*售后服务对象*/
            serviceData:{
                // 搜索值
                serviceValue: '',
                // 售后服务切换index
                serviceIndex: '',
                // 售后服务类型
                serviceType:[
                    { text:'全部', value:'0' },
                    { text:'退货', value:'1' },
                    { text:'退货退款', value:'2' },
                ],
                // 售后服务列表
                serviceList:[
                    {
                        time: '2018.08.01-2018.08.31',
                        type:'退货退款',
                        title:'法律顾问书籍',
                        price:'100.00',
                        state:'',
                        stateText:'退款退货中',
                    },{
                        time: '2018.08.01-2018.08.31',
                        type:'退货退款',
                        title:'法律顾问书籍',
                        price:'100.00',
                        state:'',
                        stateText:'退款退货中'
                    },{
                        time: '2018.08.01-2018.08.31',
                        type:'退货退款',
                        title:'法律顾问书籍',
                        price:'100.00',
                        state:'',
                        stateText:'退款退货中'
                    },{
                        time: '2018.08.01-2018.08.31',
                        type:'退货退款',
                        title:'法律顾问书籍',
                        price:'100.00',
                        state:'',
                        stateText:'退款退货中'
                    },{
                        time: '2018.08.01-2018.08.31',
                        type:'退货退款',
                        title:'法律顾问书籍',
                        price:'100.00',
                        state:'',
                        stateText:'退款退货中'
                    },{
                        time: '2018.08.01-2018.08.31',
                        type:'退货退款',
                        title:'法律顾问书籍',
                        price:'100.00',
                        state:'',
                        stateText:'退款退货中'
                    },
                ],
                // 分页
                pageData:{
                    total: 7,
                    pageSize: 5,
                    current: 1
                } 
            }

        }
        
    },
    methods: {

        /**售后服务类型切换**/
        //@param index 获取当前点击的元素下标
        changeServiceType(index){

            this.serviceData.serviceIndex = index;

        },

        /**分页**/
        //@param value 返回当前页码
        changeOrderPage(value){

            this.serviceData.pageData.current = value;

        },
        //监听售后服务数量添加滚动事件
        lisionOrderScroll(){

            //当页面售后服务商品数量大于5条时，就给列表添加滚动
            let n = 0;
            let data = this.serviceData.orderList;

            for(let i = 0 ; i < data.length ; i++ ){
                for(let k = 0 ; k < data[i].items.length; k++ ){
                    n++;
                }
            }

            if(n > 5){
                return true;
            }
        },
    }
}
</script>


<style scoped lang='less'>

    //引入售后服务共用less文件
    @import '../shopCart/shopCart.less'; 

    // 售后服务类型
    .service_type{
        display: inline-block;
        margin-right:50px;

        >li{
            display: inline-block;
            height: 38px;
            line-height: 38px;
            width: 80px;
            text-align: center;
            cursor: pointer;
            
            &:hover, &.active{
                background: @color_00aa88;
                color:#fff;
            }
            
        }
    }

    // 售后服务列表
    .list_box{
        
        // 头部
        .header{
            background: @color_fafafa;
            text-align: center;
            height: 50px;
            line-height: 50px;

            span{
                display: block;

            }

        }
        // 列表
        .list{
            li{
                height: 90px; 
                border-bottom:1px solid @color_e6e6e6;
                .table_block{
                    height: 90px; 
                    width:100%;
                    text-align: center;
                }
            }
        }

        // 订单分页
        .list_page{
            float: right;
            padding-right:20px;
            padding-top:30px;
        }
        &:after{
            display: block;
            content: '';
            clear: both;
        }
    }

    
    // order为空判断
    .order_has_not{
        padding:250px 0 300px 0;
        text-align: center;
        img{
            width: 260px;
        }
    }
    // order滚动设置
    .order_scroll{
        height: 450px;
        width: 100%;
        overflow-y: scroll;
    }

    
</style>
