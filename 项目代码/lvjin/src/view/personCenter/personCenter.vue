<template>
    <div class="bg_f5 padding_top_30 padding_bottom_80">
        <div class="box_center_1200">

            <div class="person_center height_900">
                <Row>
                    <Col span="4">

                        <!-- 个人中心导航栏 -->
                        <ul class="person_nav height_900">
                            <li class="font_16" :class="[personNavData.navIndex == index ? 'active' : '' ]" v-for="(items, index) in personNavData.personNav" 
                            :key="index"    @click="changeNav(index)" >{{items.text}}</li>
                        </ul>

                    </Col>
                    <Col span="20">

                        <!-- 个人中心路由视图 -->
                        <div class="person_view">
                            <router-view></router-view>
                        </div>

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

            /* 导航栏数据 */
            personNavData:{
                // 导航栏下标
                navIndex: 0,
                // 导航栏
                personNav:[
                    { text: '我的课程', url: 'myCourse'},
                    { text: '我的资料', url: 'myProfile'},
                    { text: '我的优惠券', url: 'myCoupon'},
                    { text: '我的订单', url: 'myOrder'},
                    { text: '售后服务', url: 'myAfterService'},
                    { text: '我的评论', url: 'myComment'},
                ]
            }
            
        }
        
    },
    methods: {

        /*个人中心导航栏切换*/
        changeNav(index){

            this.personNavData.navIndex = index;

            // 跳转
            let Url = this.personNavData.personNav[index].url;

            //this.$router.push({ path: Url, query: {id: '11'}})
            this.$router.push({ name: Url, params: {id: '11'}})

        }

        

    }
}
</script>

<style scoped lang='less'>

    //引入订单共用less文件
    @import '../shopCart/shopCart.less'; 

    // 通用
    .height_900{
        min-height: 900px;
    }

    // 个人中心
    .person_center{
        background:#fff;

        // 个人中心导航栏
        .person_nav{
            border:1px solid @color_e6e6e6;

            >li{
                height: 52px;
                line-height: 52px;
                text-align: center;
                cursor: pointer;
            }
            >li.active, >li:hover{
                background: @color_00aa88;
                color: #fff;
            }

        }

        //个人中心路由视图
        .person_view{
            margin-left:16px;
            border:1px solid @color_e6e6e6;
        }
    }

    
</style>
