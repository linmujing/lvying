<template>
    <!-- 音频播放器 -->
    <div class="container">
        <div class="audio_box">
            <div class="audio_control audio_center_1200">
                <Row>
                    <!-- 音频图片 -->
                    <Col span="2">
                        <span class="audio_img"> <img :src="imgUrl" alt=""> </span>
                    </Col>
                    <Col span="1">
                        <!-- 上一个-->
                        <!--<span class="audio_control_icon" @click="previousClick">-->
                            <!--<span class="vjs-icon-previous-item"></span>-->
                        <!--</span>-->
                    </Col>
                    <Col span="1">
                        <!-- 开关 -->
                        <span class="audio_control_icon"
                            @click="pausePlay"
                            v-show="!audioControl.audioOff">
                            <span class="vjs-icon-pause"></span>
                        </span>
                        <span class="audio_control_icon"
                            @click="startPlay"
                            v-show="audioControl.audioOff">
                            <span class="vjs-icon-play"></span>
                        </span>
                    </Col>
                    <Col span="1">
                        <!-- 下一个 -->
                        <!--<span class="audio_control_icon" @click="nextClick">-->
                            <!--<span class="vjs-icon-next-item"></span>-->
                        <!--</span>-->
                    </Col>
                    <!-- 时间进度条 -->
                    <Col span="12">
                        <div class="audio_title"> &nbsp; {{audioTitle}}</div>
                        <div style="padding-top:2px;">
                            <Slider v-model="audioControl.timeProgress"
                                @on-change="getTimeChange" :tip-format="setTimeTip" >
                            </Slider>
                        </div>
                    </Col>
                    <!-- 时间 -->
                    <Col span="3">
                        <div class="text_center" style="color:#fff;"> {{audioControl.timeDivider}} / {{audioControl.timeDuration}} </div>
                    </Col>

                    <!-- 音量 -->
                    <Col span="1">
                        <div style="text-align:right;">
                            <span class="audio_control_icon" @click="audioControl.volume == 0 ?  audioControl.volume = 50 : audioControl.volume = 0">
                                <span class="vjs-icon-volume-mute"  v-show="audioControl.volume == 0"></span>
                                <span class="vjs-icon-volume-high"  v-show="audioControl.volume != 0"></span>
                            </span>
                        </div>
                    </Col>
                    <!-- 音量进度条 -->
                    <Col span="2">
                        <div style="padding: 28px 10px;">
                            <Slider v-model="audioControl.volume"
                                @on-input="getVolumeChange" :tip-format="setVolumeTip" >
                            </Slider>
                        </div>
                    </Col>
                    <Col span="1">
                      <!--<div class="audio_list">-->
                        <!--<Icon type="ios-list" size="40"/>-->
                      <!--</div>-->
                    </Col>
                </Row>
            </div>
            <div style="display:none;">
                <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
                <audio ref="audio" class="dn"
                    :src="url"
                    :preload="audio.preload"
                    @play="onPlay"
                    @error="onError"
                    @waiting="onWaiting"
                    @pause="onPause"
                    @timeupdate="onTimeupdate"
                    @loadedmetadata="onLoadedmetadata"
                >
                  数据源格式错误！
                </audio>

            </div>
        </div>
    </div>

</template>

<script>

export default {
  props:{
    audioParams: {
      type: Object
    },
    imgUrl: {
      type: String
    }
  },
    data() {
        return {

        //   url: this.theUrl || 'https://wdd.js.org/element-audio/static/falling-star.mp3',
        //   url: require('../assets/music/a1.wav'),http://lvyingjiaoyu-prod.oss-cn-zhangjiakou.aliyuncs.com/ticymce/audio/2018/11/7/7cf35b610388dcc623e4330e63844ea5.mp3
          url:'',
          audio: {
            preload: 'auto'
          },

          // 视频控制器参数
          audioControl: {
              // 控制器开关
              isShow: false,
              // 时间进度
              timeProgress: 0,
              // 总时间秒数
              timesecond: 0,
              // 当前播放时间
              timeDivider: '00:00',
              // 总时间
              timeDuration: '00:00',
              // 音量
              volume: 50,
              // 视频开关
              audioOff: true,
              // 全屏
              fullScreen: false,
              // 记录当前播放视频的位置
              audioIndex1: 0,
              audioIndex2: 0,

          },
          // 标题
          audioTitle: '',
          showList: false,

        };
    },

    methods: {

        /** 音频函数 **/
        // 当音频暂停
        onPause (res) {
          // console.log(res)
        },
        // 当发生错误, 就出现loading状态
        onError () {
          // this.$Message.warning('数据源格式错误！');
          this.audio.waiting = true
        },
        // 当音频开始等待
        onWaiting (res) {

            // console.log(res)

        },
        // 当音频开始播放
        onPlay (res) {

            // console.log(res)

        },
        // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
        onTimeupdate(res) {

            // console.log(this.audioParams.voiceUrl)
            // console.log(res.target.currentSrc)

            // 获取时间进度
            this.audioControl.timeProgress = (res.target.currentTime / res.target.duration).toFixed(2) * 100  ;

            // 获取当前时间
            this.audioControl.timeDivider = this.changeTimeBox(res.target.currentTime);

            // 监听试听时间
            var timer = this.audioParams.voiceTime
            if(timer !== '' && this.audioParams.voiceStatus == 1){
                timer = parseFloat(this.audioParams.voiceTime) * 60  // 试看时间，以秒为单位
                if(this.changeTimeBox(res.target.currentTime) > this.changeTimeBox(timer)){
                this.$refs.audio.currentTime = 0   // 设置当前时间 清零
                this.pausePlay()    // 暂停播放
                this.$Message.warning('请您购买后再继续收听！');
                return false;
                }
            }

        },
        // 当加载语音流元数据完成后，会触发该事件的回调函数
        // 语音元数据主要是语音的长度之类的数据
        onLoadedmetadata(res) {

            // console.log('loadedmetadata')
            // console.log(res)

            // 获取总时长
            this.audioControl.timesecond = parseInt(res.target.duration) ;
            this.audioControl.timeDuration = this.changeTimeBox(res.target.duration);

            // 加载完毕
            this.$Spin.hide();

        },

        /** 音频控制器函数 **/
        // 开始播放
        startPlay() {

          this.$refs.audio.play()
          this.audioControl.audioOff = false

        },

        // 暂停
        pausePlay() {

            this.$refs.audio.pause()
            this.audioControl.audioOff = true

        },
        // 上一曲
        previousClick(){

        },
        // 下一曲
        nextClick(){

        },
        // 时间进度
        getTimeChange(e){

            this.audioControl.timeProgress = e;

            let current =  parseInt(e / 100  * this.audioControl.timesecond);

            this.$refs.audio.currentTime = current;

            this.startPlay();

        },
        // 设置时间进度悬浮标记
        setTimeTip(){

            return this.changeTimeBox(  parseInt( this.audioControl.timeProgress / 100 * this.audioControl.timesecond ) ) ;

        },
                // 音量改变
        getVolumeChange(index = 0) {

            this.$refs.audio.volume = index / 100

            this.volume = index

        },
        // 音量条toolTip
        setVolumeTip(index) {

            return index ;

        },

        /**获取音频数据 */
        getAudioParam(){

            let Obj = this.$store.state.personCenter.audioIndex ;
            console.log(Obj.sectionName)

            this.url = Obj.voiceUrl ;
            this.audioTitle = Obj.sectionName ;

            this.pausePlay();
            this.$refs.audio.currentTime = 0;

            setTimeout( ()=>{ this.startPlay(); }, 300) ;

        },

        /** 辅助函数 **/
        // 秒转化器
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
        // 监听视频下标修改
        listenVideo() {  return this.$store.state.personCenter.audioIndex  }
    },
    watch: {
        // 监听视频下标修改
        listenVideo:function (val){ this.getAudioParam()  }
    },
    mounted(){
 

    },
};
</script>
<style  >
    .vjs-custom-skin > .audio-js .vjs-control-bar{
        color: #ccc;
        border-top: 2px solid #585858;
        display: none;
    }
</style>
<style scoped lang='less'>

    //引入订单共用less文件
    @import '../view/shopCart/shopCart.less';

    .audio_box{
        position: fixed;
        left:0;
        bottom:0;
        height: 80px;
        line-height: 80px;
        width:100%;
        background:#1E242C;
        z-index: 999;

        .audio_center_1200{
            width: 1200px;
            height: 80px;
            margin: 0 auto;
        }
        .audio_img{
            display: inline-block;
            padding: 15px;

            img{
                width: 50px;
                height: 50px;
            }
        }
        .audio_title{
            line-height: 20px;
            color:#fff;
            padding-top:20px;
        }
        .audio_control_icon{
            cursor: pointer;
            font-size: 26px;
            color:#ccc;

        }
        .audio_control_icon:hover{
            color: #059E7F;
        }
        .audio_list{
          color: #fff;
          cursor: pointer;
        }
        .audio_list:hover{
          color: #059E7F;
        }
    }


</style>
