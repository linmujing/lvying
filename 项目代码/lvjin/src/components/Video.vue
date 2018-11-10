<template>
  <div id="container_id" ref="container_id" class="container" :class="[videoControl.fullScreen ? 'full_screen' : '']">

    <!-- 视频容器  -->
    <div class="player" @mousemove="onMouseShow"  :class="[videoControl.fullScreen ? 'full_screen_player' : '']" 
        :style="{height: videoControl.fullScreen ? videoHeight  : 'auto'}">
      <video-player class="video-player vjs-custom-skin"
                    id="videoPlayer"
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
        数据源格式错误！
      </video-player>
    </div>

    <div style="position:absolute;">

        <!-- 开关 -->
        <span class="video_control_icon" 
            @click="onPlayerPause"
            v-show="!videoControl.videoOff">
            <span class="vjs-icon-pause"></span>
        </span>

        <span class="video_control_icon"
            @click="onPlayerPlay"
            v-show="videoControl.videoOff">
            <span class="vjs-icon-play"></span>
        </span>

    </div>

    <!-- 视频控制器 -->
    <div class="video_control text_center" v-show="videoControl.isShow">
        <Row>
            <Col span="3">
                <Row>
                    <Col span="8">
                        <!-- 上一个 -->
                        <span class="video_control_icon" @click="previousClick">
                            <span class="vjs-icon-previous-item"></span>
                        </span>

                    </Col>
                    <Col span="8">
                    <!-- 开关 -->
                        <span class="video_control_icon" id="videoPause"
                            @click="onPlayerPause"
                            v-show="!videoControl.videoOff">
                            <span class="vjs-icon-pause"></span>
                        </span>
                    </Col>
                    <Col span="8">
                        <span class="video_control_icon" id="videoPlay"
                            @click="onPlayerPlay"
                            v-show="videoControl.videoOff">
                            <span class="vjs-icon-play"></span>
                        </span>
                    </Col>
                    <Col span="8">
                        <!-- 下一个 -->
                        <span class="video_control_icon" @click="nextClick">
                            <span class="vjs-icon-next-item"></span>
                        </span>
                    </Col>
                </Row>
            </Col>
            <!-- 时间 -->
            <Col span="3">
                <span> {{videoControl.timeDivider}} / {{videoControl.timeDuration}} </span>
            </Col>
            <!-- 时间进度条 -->
            <Col span="14">

                &nbsp;
                <div class="slider_line">
                    <Slider v-model="videoControl.timeProgress"
                        @on-change="getTimeChange" :tip-format="setTimeTip">
                    </Slider>
               </div>
            </Col>
            <!-- 音量 -->
            <Col span="1">
                <div style="text-align:right;">
                    <span class="video_control_icon" @click="videoControl.volume == 0 ?  videoControl.volume = 50 : videoControl.volume = 0">
                        <span class="vjs-icon-volume-mute"  v-show="videoControl.volume == 0"></span>
                        <span class="vjs-icon-volume-high"  v-show="videoControl.volume != 0"></span>
                    </span>
                </div>
            </Col>
            <!-- 音量进度条 -->
            <Col span="2">
            &nbsp;
                <div  class="slider_line">
                    <Slider v-model="videoControl.volume"
                        @on-input="getVolumeChange" :tip-format="setVolumeTip" >
                     </Slider>
                </div>
            </Col>
            <Col span="1">
                <span class="video_control_icon">
                    <span class="vjs-icon-fullscreen-enter" v-show="!videoControl.fullScreen" @click="fullScreenHandle"></span>
                    <span class="vjs-icon-fullscreen-exit" v-show="videoControl.fullScreen" @click="fullScreenHandle"></span>
                </span>
            </Col>
        </Row>
    </div>

    <!-- 侧边栏容器 -->
    <div class="video_menu" :class="[videoMenu.Off ? 'video_menu_active' : '']"
        v-show="videoControl.isShow">

        <div v-if="videoControl.fullScreen">
            <!-- 侧边栏开关 -->
            <div class="video_menu_btn video_menu_off" @click="videoMenu.Off = false" v-show="videoMenu.Off">
            <span><Icon type="md-reorder" size="26" /></span>
            </div>
            <div class="video_menu_btn video_menu_close" @click="videoMenu.Off = true" v-show="!videoMenu.Off">
                <span style="position:absolute;left:-5px;top:45%;"><Icon type="ios-arrow-forward" size="22"  /></span>
            </div>
        </div>

        <!-- 视频内容列表 -->
        <div class="video_menu_list" >
            <div class="menu_title">课程目录</div>
            <ul v-if="videoMenu.lists.length > 0" class="menu_list">
                <li v-for="(item, index) in videoMenu.lists" :key="index">
                    <!--<div class="list_title"> {{items.name}} </div>-->
                    <div class="list_content">
                        <!--<div class="item" :class="[item.isActive ? 'active' : '']"-->
                            <!--v-for="(item, index2) in items.items"-->
                            <!--:key="index2" @click="changeItem(index, index2)">{{item.text}}-->
                        <!--</div>-->
                      <div class="item" :class='{active: index == curIndex}' @click="changeItem(index)">{{item.sectionName}}
                      </div>
                    </div>
                </li>
            </ul>
        </div>

    </div>

    <!--试看结束-->
    <div v-show="freeTip" class="video_free_tip">
      <p class="text_center color_fff font_16" :style="{marginTop: Height/2 + 'px'}">请您购买后再继续观看！</p>
    </div>

  </div>
</template>

<script>

import { videoPlayer } from "vue-video-player";

export default {
  props:['videoParams', 'imgUrl', 'activeIndex'],
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
                // 视频资源 {type: '' , src: ''}
                sources: [],
                poster: this.imgUrl, //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: "此视频暂无法播放，请稍后再试" ,//允许覆盖Video.js无法播放媒体源时显示的默认信息。

                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            },

            // 视频控制器参数
            videoControl: {
                // 控制器开关
                isShow: false,
                // 时间进度
                timeProgress: 0,
                // bar:0,
                // 总时间秒数
                timesecond: 0,
                // 当前播放时间
                timeDivider: '00:00',
                // 总时间
                timeDuration: '00:00',
                // 音量
                volume: 50,
                // 视频开关
                videoOff: true,
                // 全屏
                fullScreen: false,
                // 记录当前播放视频的位置
                videoIndex1: 0,
                videoIndex2: 0,
            },

            // 视频列表菜单
            videoMenu: {
              Off: true,
              lists: []
            },

            curIndex: 0,
            Height:  '',
            freeTip: false,
            videoHeight: 0
        };
    },
    components: {

        videoPlayer

    },
    methods: {

        /** 视频方法 **/
        clickPlayerPlay(player) {

          // 没有播放源提示
          if( this.playerOptions.sources.length == 0 ){

            this.$Message.warning('对不起，当前没有播放源！');

            return false;

          }
          // console.log(this.activeIndex)
          this.freeTip = false
          this.changeItem(this.activeIndex)
          this.player.play();
          this.videoControl.videoOff = false;

        },
        // 视频播放 *
        onPlayerPlay(player) {

            // 没有播放源提示
            if( this.playerOptions.sources.length == 0 ){

                this.$Message.warning('对不起，当前没有播放源！');

                return false;

            }

            this.freeTip = false

            this.player.play();
            
            this.videoControl.videoOff = false;

        },
        // 视频暂停 *
        onPlayerPause(player) {

          this.videoControl.videoOff = true;

          this.player.pause();

        },
        // 播放前获取总时间 *
        onPlayerLoadeddata(player) {

            // console.log('player Loadeddata!', player)

            // 获取所有时间
            this.videoControl.timeDuration = this.changeTimeBox(player.duration());

            // 获取总时间秒
            this.videoControl.timesecond = player.duration();

        },
        // 同步获取视频时间参数 *
        onPlayerTimeupdate(player) {

            // 获取时间进度
            this.videoControl.timeProgress = (player.currentTime() / player.duration()).toFixed(2)*100;

            // 获取当前时间
            this.videoControl.timeDivider = this.changeTimeBox(player.currentTime());

            // 当前视频资源
            let  sources = this.$store.state.personCenter.videoIndex ;
            
            if(sources.videoStatus == '1'){
                // 监听试看时间
                var timer =  parseFloat(sources.videoTime) * 60 ; // 试看时间，以秒为单位
                if(this.changeTimeBox(player.currentTime()) > this.changeTimeBox(timer)){
                    player.currentTime(0)   // 设置当前时间 清零
                    this.onPlayerPause()    // 暂停播放
                    this.freeTip = true     // 显示提示
                    return false;
                }
            }

        },
        // 初始设置 *
        playerReadied(player) {
            player.currentTime(0.1) ;
        },

        // 播放错误
        onError(e){

             // this.$Message.warning('对不起，当前没有播放源');

        },
        onPlayerEnded(player) {
            // console.log('player ended!', player)
        },
        // 等待中
        onPlayerWaiting(player) {
            // console.log('player Waiting!', player)
            //console.log(player)
        },
        // 播放中
        onPlayerPlaying(player) {
            // console.log('player Playing!', player)
            //console.log(player)
        },
        onPlayerCanplay(player) {
            // console.log('player Canplay!', player)
        },
        onPlayerCanplaythrough(player) {
            // console.log('player Canplaythrough!', player)

        },
        //  or listen state event
        playerStateChanged(player) {
        //change

        },


        /** 控制器方法 **/
        // 获取视频固定参数
        getVideoParam(){

            this.videoMenu.lists = this.videoParams;
            console.log(this.videoParams)

            let Obj = this.$store.state.personCenter.videoIndex ;
            console.log(Obj)
            
            let obj = {                   
                'type': "video/mp4",
                'src': Obj.videoUrl
            };

            this.playerOptions.sources = [];
            this.playerOptions.sources.push(obj);

            this.curIndex = this.videoMenu.lists.indexOf(Obj) ;
            this.curIndex = this.curIndex == -1 ? 0 : this.curIndex ;

            // 播放
            document.getElementById("videoPause").click();

        },
        // 时间进度
        getTimeChange(e){
            this.videoControl.timeProgress=e;
            let current =  parseInt(e * this.videoControl.timesecond/100);
            console.log(current)
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
        // 上一集
        previousClick(){

            // 重置播放键
            this.videoControl.videoOff = true;

            let index = this.curIndex;

            if(index > 0){

                index -- ;
                console.log(index)
                
                // 视频下标修改修改
                this.$store.commit('personCenter/setVideoIndex', this.videoMenu.lists[index]);

            }else{

                this.$Message.warning('已经是第一集了');

            }

        },
        // 下一集
        nextClick(){

            // 重置播放键
            this.videoControl.videoOff = true;

            let index = this.curIndex;

            if(this.videoMenu.lists.length-1 > index ){

                index ++ ;
                console.log(index)
                
                // 视频下标修改修改
                this.$store.commit('personCenter/setVideoIndex', this.videoMenu.lists[index]);

            }else{

                this.$Message.warning('已经是最后一集了');

            }

        },
        // 监听鼠标悬停事件
        onMouseShow(){

            // 防止多次触发定时器
            if(!this.videoControl.isShow){

                this.videoControl.isShow = true;

                let timer = null;

                timer = setTimeout(()=>{this.videoControl.isShow = false;},10000)

            }

        },
        // 全屏控制
        fullScreenHandle(player){

            this.videoControl.fullScreen = !this.videoControl.fullScreen;

            if(this.videoControl.fullScreen){

                document.body.style.overflow='hidden';

                this.launchFullScreen();

            }else{

                document.body.style.overflow='';

                this.exitFullscreen();

            }

        },
        // 进入全屏
        launchFullScreen() {

            var docElm = document.documentElement;
            //W3C
            if(docElm.requestFullscreen) {
            docElm.requestFullscreen();
            }

            //FireFox
            else if(docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
            }

            //Chrome等
            else if(docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
            }

            //IE11
            else if(elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
            }

            this.videoHeight = parseFloat(window.screen.height )  * 9/16 + 'px';
            console.log( this.videoHeight )

        },
        // 退出全屏
        exitFullscreen() { 

            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            //FireFox
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            //Chrome等
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            //IE11
            else if (document.msExitFullscreen) {
            document.msExitFullscreen();
            }

        },


        /** 侧边栏 **/
        // 切换视频
        //@param index 大列表下标
        changeItem(index){

            this.curIndex = index

            if(this.videoMenu.lists.length > 1){

                // 视频下标修改修改
                this.$store.commit('personCenter/setVideoIndex', this.videoMenu.lists[index]);

            }
        },

        /** 辅助函数 **/
        // 毫秒转化器
        //@param timer 大列表下标
        changeTimeBox(timer){

            function p(s){ return s < 10 ? '0' + s : s } ;
            function ps(s){ return s == 0 ? '' : s + ':'} ;

            var h = timer > 3600 ? parseInt(timer/3600) : 0;

            var m = (timer- h*3600) > 60 ? parseInt((timer- h*3600)/60) : 0;

            var s = parseInt(timer - h*3600 - m*60);

            var now =  ps(h) + p(m) + ":" + p(s);

            return now;

        }

    },
    computed: {
        // 监听视频开关
        player() {
            return this.$refs.videoPlayer.player;
        },
        // 监听视频下标修改
        listenVideo() {  return this.$store.state.personCenter.videoIndex  }

    },
    watch: {
        activeIndex(val, oldVal){ this.onPlayerPlay()  },
        // 监听视频下标修改
        listenVideo:function (val){ this.getVideoParam();  }
    },
    mounted(){

        // 获取视频固定参数
        this.getVideoParam();

        this.Height = this.$refs.container_id.offsetHeight

    },
};
</script>
<style  >
    .vjs-custom-skin > .video-js .vjs-control-bar{
        color: #ccc;
        border-top: 2px solid #585858;
        display: none;
    }
    .vjs-custom-skin > .video-js .vjs-big-play-button {
        font-size: 2em;
        line-height: 1.9em !important;
    }
    .video-js .vjs-big-play-button{
    /*
    播放按钮换成圆形
    */
    height: 2em;
    width: 2em;
    line-height: 2em;
    border-radius: 1em;
    outline: none;
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
    // 全屏
    .full_screen{
        position: fixed;
        top: 0;
        left: 0;
        width:100vw;
        height: 100vh;
        z-index:10000;
        background:#000;
    }
    .full_screen_player{
        position: absolute;
        top: 0;
        left: 0;
        bottom:0;
        right:0;
        margin:auto;
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
        border-top:1px solid #585858;
        transition: 0.5s;
        z-index: 999;
        font-size: 10px;
      .prgress_box{
        .progress_wrap{
          width:100%;
          border:1px solid #ddd;
          height:6px;
          border-radius:4px;
          background-color:#ddd;
          position:relative;
          top:17px;
          .progress_block{
            width:15px;
            height:15px;
            position:absolute;
            top:-5px;
            left:-1px;
            border-radius:50%;
            background-color:#fff;
          }
        }
      }
        .video_control_icon{
            cursor: pointer;
            font-size: 20px;

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
        width:30%;
        height:100%;
        background:#1E242C;
        transition: 0.5s;
        z-index: 998;

        // 侧边栏开关
        .video_menu_btn{
            position: absolute;
            top:45%;
            left:-26px;
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
        right:-30%;
    }
    .slider_line{
      position:absolute;
      width: 90%;
      top: 10px;
      left:5%;

    }
    // 试看提示
    .video_free_tip{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index:8;
      background: rgba(0,0,0,.7);
    }


</style>
