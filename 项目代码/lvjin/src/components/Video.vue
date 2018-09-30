<template>
  <div class="container">

    <!-- 视频容器  -->
    <div class="player">
      <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"
                    @ready="playerReadied"
                    @statechanged="playerStateChanged($event)"
                    @error="onError($event)"
      >
      </video-player>
    </div>

    <!-- 视频控制器 -->
    <div class="video_control text_center">
        <Row>
            <Col span="3">
                <!-- 上一个 -->
                <span class="video_control_icon">
                    <span class="vjs-icon-previous-item"></span>
                </span>
                <!-- 开关 -->
                <span class="video_control_icon"
                    style="padding:0 10px;" 
                    @click="onPlayerPause"
                    v-show="!videoControl.videoOff">
                    <span class="vjs-icon-pause"></span>
                </span>
                <span class="video_control_icon" 
                    style="padding:0 10px;" 
                    @click="onPlayerPlay"
                    v-show="videoControl.videoOff">
                    <span class="vjs-icon-play"></span>
                </span>
                <!-- 下一个 -->
                <span class="video_control_icon">
                    <span class="vjs-icon-next-item"></span>
                </span>

            </Col>
            <!-- 时间 -->
            <Col span="3">
                <span> {{videoControl.timeDivider}} / {{videoControl.timeDuration}} </span>    
            </Col>
            <!-- 时间进度条 -->
            <Col span="12">
                <div style="padding-top:2px;">
                    <Slider v-model="videoControl.timeProgress" 
                        @on-change="getTimeChange" :tip-format="setTimeTip">
                    </Slider>
                </div>
            </Col>
            <!-- 音量 -->
            <Col span="3">
                <div style="text-align:right;">
                    <span class="video_control_icon" @click="videoControl.volume == 0 ?  videoControl.volume = 50 : videoControl.volume = 0">
                        <span class="vjs-icon-volume-mute"  v-show="videoControl.volume == 0"></span>
                        <span class="vjs-icon-volume-high"  v-show="videoControl.volume != 0"></span>
                    </span>
                </div>
            </Col>
            <!-- 音量进度条 -->
            <Col span="2">
                <div style="padding: 2px 10px;">
                    <Slider v-model="videoControl.volume"
                        @on-input="getVolumeChange" :tip-format="setVolumeTip" >
                     </Slider>
                </div>
            </Col>
            <Col span="1">
                <span class="video_control_icon">
                    <span class="vjs-icon-fullscreen-enter" v-show="videoControl.fullScreen" @click="fullScreenHandle"></span>
                    <span class="vjs-icon-fullscreen-exit" v-show="!videoControl.fullScreen" @click="fullScreenHandle"></span>
                </span>
            </Col>
        </Row>
    </div>

    <!-- 侧边栏容器 -->
    <div class="video_menu" :class="[videoMenu.Off ? 'video_menu_active' : '']" :style="{height:videoMenu.clientHeight + 'px'}">

        <!-- 侧边栏开关 -->
        <div class="video_menu_btn video_menu_off" @click="videoMenu.Off = false" v-show="videoMenu.Off">
           <span><Icon type="md-reorder" size="26" /></span>
        </div>
        <div class="video_menu_btn video_menu_close" @click="videoMenu.Off = true" v-show="!videoMenu.Off">
            <span style="position:relative;left:-5px;"><Icon type="ios-arrow-forward" size="22"  /></span>
        </div>

        <!-- 视频内容列表 -->
        <div class="video_menu_list" >
            <div class="menu_title">课程目录</div>
            <ul class="menu_list">
                <li v-for="(items, index) in videoMenu.lists" :key="index">
                    <div class="list_title"> {{items.title}} </div>
                    <div class="list_content">
                        <div class="item" :class="[item.isActive ? 'active' : '']"
                            v-for="(item, index2) in items.items" 
                            :key="index2" @click="changeItem(index, index2)">{{item.text}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </div>

  </div>
</template>
 
<script>

import { videoPlayer } from "vue-video-player";

export default {
    data() {
        return {

            // 视频参数
            playerOptions: {
                //playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: "zh-CN",
                aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                    type: "video/mp4",
                    // mp4
                    src: "http://vjs.zencdn.net/v/oceans.mp4"
                    // webm
                    // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                    }
                ],
                poster: "poster.jpg", //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: "此视频暂无法播放，请稍后再试" ,//允许覆盖Video.js无法播放媒体源时显示的默认信息。
                
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            },

            // 视频控制器
            videoControl: {
                // 时间进度
                timeProgress: 0,
                // 总时间秒数
                timesecond: 0,
                // 当前播放时间
                timeDivider: '00:00:00',
                // 总时间
                timeDuration: '00:00:00',
                // 音量
                volume: 50,
                // 视频开关
                videoOff: true,
                // 全屏
                fullScreen: true,

            },

            // 视频列表菜单
            videoMenu:{
                Off: true,
                clientHeight: 0,
                lists:[
                    {
                        title: '大章节',
                        items:[
                            {
                                text: '01 小章节列表',
                                isActive: false
                            },
                            {
                                text: '02 小章节列表',
                                isActive: false
                            },
                            {
                                text: '03 小章节列表',
                                isActive: false
                            },
                        ]
                    },
                    {
                        title: '大章节',
                        items:[
                            {
                                text: '01 小章节列表',
                                isActive: false
                            },
                            {
                                text: '02 小章节列表',
                                isActive: false
                            },
                            {
                                text: '03 小章节列表',
                                isActive: false
                            },
                        ]
                    }
                ]
            }
        };
    },
    components: {

        videoPlayer

    },
    methods: {

        /** 视频方法 **/
        // 视频播放
        onPlayerPlay(player) {

            this.videoControl.videoOff = false; 

            this.player.play();  

        },
        // 视频暂停
        onPlayerPause(player) {

            this.videoControl.videoOff = true; 

            this.player.pause();  

        },
        // 播放错误
        onError(e){
            // this.haserror=false;
            // if(this.videoURL != ''){
            //     this.playState='replay';
            //     this.haserror=true;
            // }
        },

        onPlayerEnded(player) {
            // console.log('player ended!', player)
        },
        onPlayerLoadeddata(player) {

            // console.log('player Loadeddata!', player) 

            // 获取所有时间
            this.videoControl.timeDuration = this.changeTimeBox(player.duration());

            // 获取总时间秒
            this.videoControl.timesecond = player.duration();  

        },
        // 等待中
        onPlayerWaiting(player) {
            // console.log('player Waiting!', player)
            console.log(player)
        },
        // 播放中
        onPlayerPlaying(player) {

            // console.log('player Playing!', player)
            console.log(player)


        },
        // 同步获取视频时间参数
        onPlayerTimeupdate(player) {

            // 获取时间进度
            this.videoControl.timeProgress = (player.currentTime() / player.duration()).toFixed(2) * 100  ;

            // 获取当前时间
            this.videoControl.timeDivider = this.changeTimeBox(player.currentTime());     
            
        },
        onPlayerCanplay(player) {
            // console.log('player Canplay!', player)



        },
        onPlayerCanplaythrough(player) {
            // console.log('player Canplaythrough!', player)
        },
        //  or listen state event
        playerStateChanged(player) {

           // console.log(player);

        },
        // 初始设置 player is ready
        playerReadied(player) {

            player.currentTime(0.1) ;

        },

        /** 控制器方法 **/
        // 获取视频固定参数
        getVideoParam(){

            // 获取视频菜单列表高度
            this.videoMenu.clientHeight = this.$refs.videoPlayer.$el.clientHeight;

            console.log(this.$refs.videoPlayer.tag)

        },
        // 时间进度
        getTimeChange(){

            let current =  parseInt(this.videoControl.timeProgress / 100  * this.videoControl.timesecond);
            
            this.player.currentTime(current);

        },
        // 设置时间进度悬浮标记
        setTimeTip(){

            return this.changeTimeBox(  parseInt( this.videoControl.timeProgress / 100 * this.videoControl.timesecond ) ) ;

        },
        // 调节音量
        getVolumeChange(){

            this.player.volume(this.videoControl.volume/100);

        },
        // 设置进度悬浮标记
        setVolumeTip(){

            return this.videoControl.volume  ;

        },
 
        // 全屏  
        fullScreenHandle(player){  

            if(!this.player.isFullscreen()){ 

                this.player.requestFullscreen(); 

                this.player.isFullscreen(true);  

            }else{  

                this.player.exitFullscreen();  

                this.player.isFullscreen(false);  

            }  

        }, 


        /** 侧边栏 **/
        // 切换视频
        //@param index 大列表下标
        //@param index2 小列表下标
        changeItem(index, index2){

            let data = this.videoMenu.lists;

            for(let i = 0 ; i < data.length; i++){

                for(let x = 0; x < data[i].items.length; x++){

                    if(data[i].items[x].isActive){

                        this.videoMenu.lists[i].items[x].isActive = false;

                    }
                }

            }

            this.videoMenu.lists[index].items[index2].isActive = true;

        },

        /** 辅助函数 **/
        // 毫秒转化器
        //@param timer 大列表下标
        changeTimeBox(timer){

            function p(s){ return s < 10 ? '0' + s : s } ;

            var h = timer > 3600 ? parseInt(timer/3600) : 0;

            var m = (timer- h*3600) > 60 ? parseInt(timer/60) : 0;

            var s = parseInt(timer - h*3600 - m*60);

            var now =  p(h) + ':' + p(m) + ":" + p(s);

            return now;

        }

    },
    computed: {
        // 监听视频开关
        player() {

            return this.$refs.videoPlayer.player;
            
        }
    },
    mounted(){

        // 获取视频固定参数
        this.getVideoParam();
        
        console.log(this.$refs.videoPlayer.player)


    },
};
</script>
<style  >
    .vjs-custom-skin > .video-js .vjs-control-bar{
        color: #ccc;
        border-top: 2px solid #585858;
        display: none;
    }
    .ivu-slider-button{
        border: 0; 
        background-color: #fff;
    }
    .ivu-slider-wrap {
        background-color: #ccc;
    }
</style>
<style scoped lang='less'>

    //引入订单共用less文件
    @import '../view/shopCart/shopCart.less'; 

    // 容器
    .container {
        background-color: #efefef;
        min-height: 100%;
        position: relative;
        overflow: hidden;
    }

    // 视频控制器
    .video_control{
        position: absolute;
        bottom: 0;
        left: 0;
        width:100%;
        height: 42px;
        line-height: 40px;
        background:#1E242C;
        color: #ccc;
        border-top:2px solid #585858;
        transition: 0.5s;
        z-index: 999;

        .video_control_icon{
            cursor: pointer;
            font-size: 24px;
            
        }
        .video_control_icon:hover{
            color: #059E7F;

        }
    }

    // 侧边栏容器
    .video_menu{
        position: absolute;
        top:0;
        right:0;
        width:232px;
        background:#1E242C;
        transition: 0.5s;
        z-index: 998;

        // 侧边栏开关
        .video_menu_btn{
            position: absolute;
            top:50%;
            left:-44px;
            width:26px;
            height:26px; 
            background:#1E242C;
            color:#ccc;
            text-align: center;
            cursor: pointer;
        }
        .video_menu_close{
            height: 100%;
            width:14px;
            left:0;
            top:0;
            padding-top:130%;
            border-left:1px solid #585858;
            border-right:1px solid #585858;
            color:#585858;
        }
        .video_menu_btn:hover{
            color:#fff;
        }

        //侧边栏内容
        .video_menu_list{
            padding-left: 52px;
            padding-right: 20px;
            color: #EBEBEB;
            
            .menu_title{
                padding-top: 30px;
                font-size: 18px;
            }

            .menu_list{
                .list_title{
                    font-size: 16px;
                    margin-top: 30px;
                    margin-bottom: 30px;
                    cursor: pointer;
                }
                .list_content{
                    .item{
                        margin-bottom: 20px;
                        cursor: pointer;
                    }
                    .item:hover{
                        color: #059E7F;
                    }
                    .item.active{
                        color: #059E7F;
                    }
                }
            }


        }
    }
    .video_menu.video_menu_active{
        right:-251px;
    }


    
</style>