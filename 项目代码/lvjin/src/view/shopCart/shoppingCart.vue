<template>
    <div class="shopping_cart_container box_center_1200">

        <div class="title">
            <span>我的购物车：共2门课程</span>
        </div>

        <div class="list_box">
            <!-- 购物车列表头部 -->
            <div class="list_header padding_left_14">
                <Row>
                    <Col span="5">
                        <Checkbox label="twitter">
                            <span class="padding_left_5">全选</span>
                        </Checkbox>
                    </Col>
                    <Col span="10"><span>课程名称</span></Col>
                    <Col span="4"><span>单价（元）</span></Col>
                    <Col span="4"><span>数量</span></Col>
                    <Col span="1"><span>操作</span></Col>
                </Row>
            </div>
            <!-- 购物车列表 -->
            <ul class="list_content">
                <li>
                    <div class="item_title padding_left_14">
                        <Checkbox label="twitter">
                            <span class="padding_left_5">机构法院</span>
                        </Checkbox>
                    </div>
                    <ul class="item_list">
                        <li class="padding_left_14">
                            <Row>
                                <Col span="5">
                                    <Checkbox label="twitter">
                                        <span class="padding_left_5">全选</span>
                                    </Checkbox>
                                    <span class="item_list_img">
                                        <img src="../../assets/images/image/cart_book.png">
                                    </span>
                                    
                                </Col>
                                <Col span="10">
                                    <Row>
                                        <Col span="6"></Col>
                                        <Col span="18"><span class="item_list_describe">1111111111111111111</span></Col>
                                    </Row>
                                </Col>
                                <Col span="4"><span>48.00</span></Col>
                                <Col span="4"><span>1</span></Col>
                                <Col span="1"><span class="item_list_delete"><img src="../../assets/images/icon/cart_delete.png" alt=""></span></Col>
                            </Row>
                        </li>
                    </ul>
                    <div class="item_total padding_right_24">该机构小计：36.00</div>
                </li>
            </ul>
            <!-- 其他操作 -->
            <div class="list_operate padding_left_14">
                <Row>
                    <Col span="2">
                        <Checkbox label="twitter">
                            <span class="padding_left_5">全选</span>
                        </Checkbox>
                    </Col>
                    <Col span="10"><span class="pointer list_delete">删除所选课程</span></Col>
                    <Col span="9"><span>单价（元）</span></Col>
                    <Col span="3"><span class="list_balance">去结算</span></Col>
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
<style scoped lang='less'>

    /**通用**/
    .padding_left_5{
        padding-left: 5px;
    } 
    .padding_left_14{
        padding-left: 14px;
    }
    .padding_right_24{
        padding-right: 24px;
    }
    div{
        box-sizing: border-box;
    }

    /**容器**/ 
    .shopping_cart_container{

        margin-top:20px;
        margin-bottom:96px;
        background:#fff;

        //购物车标题
        .title{
            height:74px;
            padding-left:30px;
            font-size: 14px;
            span{
                display: inline-block;
                padding-top: 36px;
            }
        }

        // 购物车盒子
        .list_box{
            margin: 0 16px;
            padding-bottom:80px;
            
            // 头部
            .list_header{
                background: #fafafa;
                height: 50px;
                line-height: 50px;
            }

            // 购物车列表
            .list_content{
                padding-top:10px;

                .item_title{
                    height: 40px;
                    line-height: 40px;
                }
                .item_list>li{
                    line-height: 140px;
                    border:1px solid #e6e6e6;
                }
                .item_list>li:last-child{
                    border-bottom:0;
                }
                .item_list_img img{
                    vertical-align: middle;
                    height: 100px;
                    width: 80px;
                    margin-left:30px;
                }
                .item_list_delete img{
                    vertical-align: middle;
                    width: 26px;
                    cursor: pointer;
                }
                .item_total{
                    height:60px;
                    line-height: 60px;
                    text-align: right;
                    border:1px solid #e6e6e6;
                    background:#fafafa;
                }
            }

            // 购物车列表操作
            .list_operate{
                height: 70px;
                line-height: 70px;
                margin-top:46px;
                background: #fafafa;

                .list_delete{
                    font-size: 16px;
                }
                .list_balance{
                    background: #ccc;
                    font-size: 20px;
                    width:136px;
                    position: absolute;
                    right:0;
                    top:0;
                    text-align: center;
                    cursor: pointer;
                }
            }
        }

    }
    
</style>
