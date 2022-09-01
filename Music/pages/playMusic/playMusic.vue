<template>
  <view>
    <view class="container">
      <view class="bgTop">
        <view class="bgTopImg"
          style="background-image: url('../../static/images/playMusic/video_pic4.jpg')">
        </view>
      </view>
      <view class="bgButtom" id="btn-3">
        <view class="bgButtomImg"
          style="background-image: url('../../static/images/playMusic/video_pic4.jpg')">
        </view>
      </view>
    </view>
    <view class="bgMiddle" id="btn-4">
      <view class="bgMiddleImg"
        style="background-image: url('../../static/images/playMusic/video_pic4.jpg')">
      </view>
    </view>
    <view class="PlayButton">

      <!--      <u-row customStyle="margin-bottom: 5px;margin-top: 15%;">
        <u-col span="6">
          <view class="demo-layout bg-purple-light"></view>
        </u-col>
        <u-col span="6">
          <view class="demo-layout bg-purple"></view>
        </u-col>
      </u-row> -->
      <!-- <u-row customStyle="margin-bottom: 5px">
        <u-col span="4">
          <view class="demo-layout bg-purple"></view>
        </u-col>
        <u-col span="4">
          <view class="demo-layout bg-purple-light"></view>
        </u-col>
        <u-col span="4">
          <view class="demo-layout bg-purple-dark"></view>
        </u-col>
      </u-row> -->
      <u-row customStyle="margin-bottom: 10px;margin-top: 20%;">
        <u-col>
          <view class="demo-layout5 bg-purple-light">

            <view>00:00</view>
            <slider activeColor="rgba(255,255,255,.8)" background-color="rgba(255,255,255,.3)" block-size="12"
              role="slider" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0" min="0" class='slider_middle'>
            </slider>
            <view>00:00</view>
          </view>
        </u-col>
      </u-row>
      <u-row justify="space-between">
        <u-col span="4">
          <view class="demo-layout1 ">
            <image class="bg-purple-Left bg-purple2" src="/static/images/playMusic/d0y.png" alt=""></image>
          </view>
        </u-col>
        <u-col span="4">
          <view class="demo-layout1 ">
            <!-- 暂停播放 -->
    <image v-if="isPlay" class="bg-purple-middle  bg-purple1" src="/static/images/playMusic/d0s.png" @click="handleToggleBGAudio()"
     ></image>
            <!-- 开始播放 -->
            <image v-else class="bg-purple-middle  bg-purple1" src="/static/images/playMusic/d0q.png" @click="handleToggleBGAudio()" ></image>
          </view>
        </u-col>
        <u-col span="4">
          <view class="demo-layout1 ">
            <image class="bg-purple-Right bg-purple2" src="/static/images/playMusic/d0k.png" alt=""></image>
          </view>
        </u-col>
      </u-row>




      <!-- <img class="note_btn_pause_white" src="../../static/images/playMusic/note_btn_play.png" alt=""> -->
      <!-- <video src="http://m7.music.126.net/20220828210219/f1acbe69d7dc48cddb5995f39fff59d1/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3" controls></video> -->
    </view>
  </view>

</template>

<script>
  export default {
    name: "palyMusic",
    data() {
      return {
        isPlay: true //歌曲是否播放
      }
    },
    methods: {
      handleToggleBGAudio() {
        if(this.isPlay){
        this.isPlay=false  
        }else{
          this.isPlay=true
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  page {
    background-color: #3b3b3b;
  }

  .bg-purple1 {
    width: 90rpx;
    height: 90rpx;
  }

  .bg-purple2 {
    width: 60rpx;
    height: 60rpx;
  }

  .demo-layout5 {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 28rpx;
    padding-left: 15px;
    padding-right: 15px;
  }

  .slider_middle {
    width: 65%;
  }

  .demo-layout1 {
    height: 5vh;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .demo-layout {
    height: 7vh;
    border-radius: 4px;

  }

  .demo-layout2 {
    height: 50rpx;
  }

  .bg-purple {
    background: #CED7E1;
  }

  .bg-purple-light {
    /* background: #e5e9f2; */
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .container {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 5% auto;
    text-align: center;
    background-size: cover;
  }

  .bgTop {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    width: 110%;
    height: 100%;
    z-index: 100;
  }

  .bgTopImg {
    position: fixed;
    filter: blur(10px);
    width: 100%;
    height: 30vh;
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    background-position: 50%;
    background-size: cover;
    background-attachment: fixed;
  }

  .bgButtom {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 120%;
    height: 100%;
    z-index: 100;
  }

  .bgButtomImg {
    position: fixed;
    filter: blur(10px);
    left: 0px;
    bottom: 0px;
    width: 120%;
    height: 30vh;
    background-position: 50%;
    background-size: cover;
    background-attachment: fixed;
  }

  .bgMiddle,
  .bgMiddleImg::after {
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
    top: 0;
  }

  .bgMiddleImg {
    height: calc(100vh * 0.45);
    top: 27%;
    position: relative;
    background-size: cover;
    background-position: center;
  }

  .PlayButton {
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 100%;
    height: 30vh;
    z-index: 1000;
  }

  .note_btn_pause_white {
    /*    width: 50px;
    height: 50px;
    bottom: 0; */
    /* background-color: aqua; */
  }
</style>
