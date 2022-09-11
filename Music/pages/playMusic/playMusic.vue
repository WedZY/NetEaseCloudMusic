<template>
  <view class="body-view">
    <image :src='bgimg' class="background-bg"></image>

    <!-- 顶部 名字 作者 -->
    <view class="play-wrapper">
      <u-row>
        <u-col span="12">
          <view class="Music_Info Music_name">
          <text>{{name}}</text>
          </view>
        </u-col>
      </u-row>
      <u-row>
        <u-col span="12">
          <view class="Music_Info Music_author">
            <text>{{musicName}}</text>
          </view>
        </u-col>
      </u-row>
    </view>
    <!-- 中间歌词和圆盘 -->
    <view class="play_middle">  
      <view>
        <image :style="{'transform':(showAudio ? 'rotate(0eg)':'rotate(-45deg)')}" src="../../static/images/playMusic/play_stick.png" class="body-record"></image>
      </view>
      <view class="round-container"  >
        <image src="../../static/images/playMusic/disk.png" mode="" class="round_img run" :style="{'animation-play-state':(showAudio ? 'running':'paused')}"></image>
        <image :src="bgimg" class="singer-img run" :style="{'animation-play-state':(showAudio ? 'running':'paused')}"></image>
      </view>
    </view>
    
    <!-- 底部控制按钮 -->
    <view class="play-foot">
      <view class="page-slider">
        <view>00:00</view>
        <slider activeColor='rgba(255,255,255,0.8)' backgroundColor='rgba(255,255,255,0.3)' block-size='12'
          class="slider_middle"></slider>
        <view>00:00</view>
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
              <image src="../../static/images/playMusic/d0q.png" mode="" class="img_play" @click="handleToggleBGAudio()"></image>
            </view>
            <view v-else class=" AudioImg">
              <image src="../../static/images/playMusic/d0s.png" mode="" class="img_play" @click="handleToggleBGAudio()"></image>
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
  export default {
    name: "palyMusic",
    data() {
      return {
        showAudio: true, //歌曲是否播放
        bgimg:'',//背景图片
        
        name:'',//音乐名字
        musicName:'',//唱歌人
        totalProcessNum:0,//总音乐时间
        startTime:0,//开始时间
        endTime:0,//结束时间
        playingTime:0,//正在播放时间
      }
    },
    watch:{
      // 监听是否暂停
      showAudio(newVal,Oldval){
        newVal?this.$innerAudioContext.play():this.$innerAudioContext.pause() 
      }
    },
    onLoad:function(options) {
      this.name=options.name
      this.musicName=options.musicName
      this.bgimg=options.img
      // this.getMusicUrl(options.id)
       
      this.$bgAudioMannager.title = '我的标题';
      this.$bgAudioMannager.src = `https://music.163.com/song/media/outer/url?id=${options.id}.mp3`;
      formatDate.formatSecond(this.$bgAudioMannager.duration)

    },
    methods: {
      // 获取音乐url
      getMusicUrl(id){
        api.getMusicUrl(id).then(request=>{
         if(request.code==200){
           this.$innerAudioContext.src=request.data[0].url
           this.$innerAudioContext.autoplay=true //自动播放
           this.$innerAudioContext.play() //开始播放
         }
        })
      },
      // 播放图标切换
      handleToggleBGAudio() {
        this.showAudio=!this.showAudio                 
      }
    }
  }
</script>

<style lang="less">
  .background-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    filter: blur(60rpx) brightness(50%);
    z-index: -1;
    transform: scale(1.5);
  }

  // 作者歌曲名字
  .play-wrapper {
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;

    .Music_Info {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .Music_name {
      color: #fff;
    }

    .Music_author {
      font-size: 24rpx;
      margin-top: 10rpx;
      color: rgba(255, 255, 255, 0.3);
    }
  }
 // 中间圆盘
 .play_middle{
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 816rpx;
   box-sizing: border-box;
   .body-record{
     transform-origin:21.5% 12%;
    transition: transform 0.8s ease 0s;
     position: absolute;
     width: 190rpx;
     height: 270rpx;
     top: 10%;
     left: 45%;
     z-index: 101;
   }
   .round-container{
     display: flex;
     justify-content: center;
     align-items: center;
     width: 630rpx;
     height: 630rpx;
     .round_img{
       position: absolute;
       width: 530rpx;
       height: 530rpx;
       z-index: 100;
     }
     .singer-img{   
       width: 480rpx;
       height: 480rpx;
       border-radius: 50%;
     }  
     .run{
       animation:myRotate 20s linear infinite;
       @keyframes myRotate {
         0%{transform: rotate(0deg)}
         25%{transform: rotate(90deg)}
         50%{transform: rotate(180deg)}
         75%{transform: rotate(270deg)}
         100%{transform: rotate(360deg)}
       }
     }
 
   }

 }

  //底部按钮
  .play-foot {
    position: fixed;
    width: 750rpx;
    height: 250rpx;
    bottom: 0;

    .page-slider {
      display: flex;
      color: rgba(255, 255, 255, 0.8);
      font-size: 28rpx;
      justify-content: space-evenly;
      align-items: center;
      
    }

    .slider_middle {
      width: 65%;
    }

    .play_suspend {
      .AudioImg {
        display: flex;
        justify-content: center;
        align-items: center;

        .icon_play {
          width: 80rpx;
          height: 80rpx;
        }

        .img_play {
          width: 100rpx;
          height: 100rpx;
        }
      }
    }
  }
</style>
