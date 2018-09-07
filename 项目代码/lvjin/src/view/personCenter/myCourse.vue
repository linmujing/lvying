<template>
    <!-- 我的课程 -->
    <div class="order_box padding_bottom_30">

        <!-- 课程标题    -->
        <div class="order_title font_16 border_bottom_1">
            <span>我的课程</span>
        </div>


         <!-- 课程列表 -->
        <div class="list_box padding_left_20 padding_top_30">
            <ul class="list">
                <li  v-for="(items, index) in courseData.courseList" :key="index"  @click="goDetail(items.id)" v-if="index < 6">
                    <Col :span="8">
                        <div class="item">
                            <p class="item_img"> 
                                <img :src="items.imgSrc" alt="">
                            </p>
                            <div class="item_content">
                                <p class="title">{{items.title}}</p>
                                <Row>
                                    <Col :span="12">
                                        <div class="text_left text_ellipsis">{{items.source}}</div>
                                    </Col>
                                    <Col :span="12">
                                        <div class="text_right">
                                            <Button type="success" shape="circle" size="small"  style="background:#00aa88;width:80px;" >查看详情</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </li>
            </ul>

            <!-- 订单分页 -->
            <div class="list_page" v-if="courseData.courseList.length > 5 ">
                <Page :total="courseData.pageData.total" :current="courseData.pageData.current"   :page-size="courseData.pageData.pageSize"  
                    @on-change="changeOrderPage" size="small" show-total show-elevator />
            </div>
        </div>

        <!-- 没有课程 -->
        <div class="order_has_not color_ccc" v-if="courseData.courseList.length == 0 ">
            暂无课程
        </div>

    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            /*课程对象*/
            courseData:{

                // 课程列表
                courseList:[
                    {
                        title: '法律动态管控一级',
                        type: '0',
                        source: '法院大讲堂',
                        imgSrc: require('../../assets/images/image/my_course_01.png'),
                        id: '1'
                    },{
                        title: '法律动态管控一级',
                        type: '0',
                        source: '法院大讲堂',
                        imgSrc: require('../../assets/images/image/my_course_02.png'),
                        id: '1'
                    },{
                        title: '法律动态管控一级',
                        type: '0',
                        source: '法院大讲堂',
                        imgSrc: require('../../assets/images/image/my_course_03.png'),
                        id: '1'
                    },{
                        title: '法律动态管控一级',
                        type: '0',
                        source: '法院大讲堂',
                        imgSrc: require('../../assets/images/image/my_course_04.png'),
                        id: '1'
                    },{
                        title: '法律动态管控一级',
                        type: '0',
                        source: '法院大讲堂',
                        imgSrc: require('../../assets/images/image/my_course_01.png'),
                        id: '1'
                    },{
                        title: '法律动态管控一级',
                        type: '0',
                        source: '法院大讲堂',
                        imgSrc: require('../../assets/images/image/my_course_01.png'),
                        id: '1'
                    },{
                        title: '法律动态管控一级',
                        type: '0',
                        source: '法院大讲堂',
                        imgSrc: require('../../assets/images/image/my_course_01.png'),
                        id: '1'
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

        /*点击打开详情*/
        //@param index 返回当前选项的下标
        goDetail(id){

            this.$router.push({ name: '', params: {id: id}})
        },

        /**分页**/
        //@param value 返回当前页码
        changeOrderPage(value){

            this.courseData.pageData.current = value;

        },
        //监听课程数量添加滚动事件
        lisionOrderScroll(){

            //当页面课程商品数量大于5条时，就给列表添加滚动
            let n = 0;
            let data = this.courseData.orderList;

            for(let i = 0 ; i < data.length ; i++ ){
                for(let k = 0 ; k < data[i].items.length; k++ ){
                    n++;
                }
            }

            if(n > 6){
                return true;
            }
        },

        //

    },
    mounted(){

        //console.log(this.$route.query)
        console.log(this.$route.params)
       

    }
}
</script>


<style scoped lang='less'>

    //引入课程共用less文件
    @import '../shopCart/shopCart.less'; 

    // 课程类型
    .course_type{
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

    // 课程列表
    .list_box{
        
        // 列表
        .list{
            li{
                height: 300px; 
                width:300px;
                border:1px solid @color_e6e6e6;
                overflow: hidden;
                cursor: pointer;
                display: inline-block;
                margin-bottom: 20px;
                margin-right: 20px;
                
                .item{
                    width: 300px;
                    
                }
                .item_img{ 
                    width:100%;
                    height:210px;
                    

                    img{
                        width:100%;
                    }
                }
                .item_content{
                    padding:5px 15px;

                    .title{
                        line-height: 40px;
                        font-size: 16px;
                        font-weight:700;
                    }
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
