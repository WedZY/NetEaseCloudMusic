<template>
  <view class="body-view">
    <!-- 背景图 -->
    <image :src='Image' class="background-bg"></image>

    <!-- 顶部 名字 作者 -->
    <view class="play-wrapper">
      <view class="returnImg">
        <u-icon name="arrow-leftward" size="50rpx" color='#efefef' @click="ToBack"></u-icon>
      </view>
      <view class="Music_name">
        <text class="musicname">{{musicName}}</text>
        <text class="singerName">{{singerName}}</text>
      </view>
    </view>
    <!-- 中间歌词和圆盘 -->
    <view class="play_middle">
      <view class="Scoop">
        <image :style="{'transform':(showAudio ? 'rotate(0eg)':'rotate(-45deg)')}"
          src="../../static/images/playMusic/play_stick.png" class="body-record"></image>
      </view>
      <view class="round-container">
        <image src="../../static/images/playMusic/disk.png" mode="" class="round_img run"
          :style="{'animation-play-state':(showAudio ? 'running':'paused')}"></image>
        <image :src='Image' class="singer-img run" :style="{'animation-play-state':(showAudio ? 'running':'paused')}">
        </image>
      </view>
    </view>

    <!-- 底部控制按钮 -->
    <view class="play-foot">
      <view class="page-slider">
        <view>{{playingTime}}</view>
        <slider activeColor='rgba(255,255,255,0.8)' backgroundColor='rgba(255,255,255,0.3)' block-size='12'
          class="slider_middle" :value="sliderValue" min="0" :max="totalProcessNum" @change="changeProcess" @changing="changeProcessing"></slider>
        <view>{{totalTime}}</view>
      </view>
      <view class="play_suspend">
        <u-row>
          <u-col span="4">
            <view class="AudioImg icon_playing">
              <image src="../../static/images/playMusic/d0y.png" mode="" class="icon_play"></image>
            </view>
          </u-col>
          <u-col span="4">
            <view v-if="showAudio" class="AudioImg">
              <image src="../../static/images/playMusic/d0q.png" mode="" class="img_play"
                @click="handleToggleBGAudio()"></image>
            </view>
            <view v-else class=" AudioImg">
              <image src="../../static/images/playMusic/d0s.png" mode="" class="img_play"
                @click="handleToggleBGAudio()"></image>
            </view>
          </u-col>

          <u-col span="4">
            <view class=" AudioImg icon_playing">
              <image src="../../static/images/playMusic/d0k.png" mode="" class="icon_play"></image>
            </view>
          </u-col>
        </u-row>
      </view>
    </view>
  </view>

</template>

<script>
  import api from '../../common/api.js'
  import formatDate from '../../utils/utils.js'
  import {
    mapState
  } from 'vuex'
  export default {
    name: "palyMusic",
    data() {
      return {
        showAudio: true, //歌曲是否播放
        sliderValue:0,//滑块当前值
        musicName: '', //音乐名字
        singerName: '', //唱歌人
        musicUrl:'',//音乐连接
        totalTime:'00:00',//总时间
        playingTime: '00:00', //正在播放时间
        totalProcessNum: 0, //总时间/秒
        startTime: 0, //开始时间
        endTime: 0, //结束时间
        seek:false,//是否处于拖动状态
      }
    },
    computed: {
      ...mapState(['Image'])
    },
    watch: {
      // 监听是否暂停
      showAudio(newVal, Oldval) {
        newVal ? this.$bgAudioMannager.play() : this.$bgAudioMannager.pause()
      },
    },
    created(){
      // 重要 缺失 音频进入可以播放状态
      this.$bgAudioMannager.onPlay(()=>{
      })
       // 音频进度更新事件
       this.$bgAudioMannager.onTimeUpdate(()=>{
         if(!this.seek){ 
          this.totalTime = formatDate.formatSecond(this.$bgAudioMannager.duration)
          this.playingTime = formatDate.formatSecond(this.$bgAudioMannager.currentTime)
           // 进度条当前值
           this.sliderValue=this.$bgAudioMannager.currentTime 
           //进度条最大值
           this.totalProcessNum=this.$bgAudioMannager.duration 
         }
         else{
            setTimeout(()=>{
              this.seek = false
            },1000)
         }    
       })
            // 自然播放结束事件
            this.$bgAudioMannager.onEnded(()=>{
              this.$bgAudioMannager.stop()
              this.showAudio=false
            })
            // 播放错误
            this.$bgAudioMannager.onError((res)=>{
                console.log(res.errMsg);
                console.log(res.errCode);
            })
    },
    
    onLoad: function(options) {
      api.getMusicUrl(options.id).then(request => {
        if (request.code == 200) {
          this.$bgAudioMannager.title = this.musicName = options.musicName
          this.$bgAudioMannager.singer = this.singerName = options.singerName
          this.$bgAudioMannager.src = request.data[0].url
        }
      })
      // this.$bgAudioMannager.src = `https://music.163.com/song/media/outer/url?id=${options.id}.mp3`;
    },
    methods: {
      // 返回上一级
      ToBack() {
        uni.navigateBack({
          delta: 1
        })
      },
       // 完成一次拖动后触发的事件
     changeProcess(event){
    this.seek=true //关闭进度条事实更新事件
     this.$bgAudioMannager.seek(event.detail.value)
   },
   // 拖动过程中触发的事件
   changeProcessing(event){   
     this.seek=true
     this.playingTime=formatDate.formatSecond(event.detail.value)
   },
      // 播放图标切换
      handleToggleBGAudio() {
        this.showAudio = !this.showAudio
      }

    }
  }
</script>

<style lang="less">
  @import url("@/pages/playMusic/playMusic.less");
</style>
