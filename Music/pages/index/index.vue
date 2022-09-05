<template>
  <view class="container">
    <!-- 搜索框 -->
    <view class="u-search">
      <u-search shape="round" :showAction="false" placeholder="搜索歌曲关键词" :clearabled="true" :disabled="true"
        @click="toSearch" v-model="valueSearch" :inputAlign="center"></u-search>
    </view>
    <!-- 轮播图 -->
    <view class="bannerSwiper">
      <u-swiper :list="banners" keyName="imageUrl" :circular="true" :height='150' :radius='10' :indicatorMode="dot"
        showTitle>
      </u-swiper>
    </view>
    <!--今日推荐、歌单、排行榜 -->
    <view class="home_png">
      <!-- 标签图标 -->
      <u-row>
        <u-col span="4" class="col_layout">
          <view class="demo-layout bg-purple-light">
            <view class="bgColor">
              <image src="../../static/images/homeImg/Recommend_today.png" mode="">
                <view class="today">{{today}}</view>
              </image>
            </view>
            <text class="home_text">每日推荐</text>
          </view>
        </u-col>
        <u-col span="4">
          <view class="demo-layout bg-purple-light">
            <view class="bgColor">
              <image src="../../static/images/homeImg/t_dragonball_icn_playlist_v3nobg.png" mode=""></image>
            </view>
            <text class="home_text">歌单</text>
          </view>
        </u-col>
        <u-col span="4">
          <view class="demo-layout bg-purple-dark">
            <view class="bgColor">
              <image src="../../static/images/homeImg/t_dragonball_icn_rank_v3nobg.png" mode=""></image>
            </view>
            <text class="home_text">排行榜</text>
          </view>
        </u-col>
      </u-row>
    </view>
    <!-- 我喜欢的音乐-->
    <view class="loveSongList">
      <view class="loveSongBox">
        <image style="display: block; margin-right:30rpx;" class="loveSong_Png"
          src="../../static/images/homeImg/QQ图片20181208212623.jpg">
          <view class="loveSongBoxRecord">
            <text style="font-size: 25rpx;margin-bottom: 10rpx;">我喜欢的音乐</text>
            <view class="recordLoveMusicText">
              <image src="../../static/images/homeImg/eag.png"></image>
              <text>100首, 已下载10首</text>
            </view>
          </view>
        </image>
      </view>
    </view>

    <!-- 歌单 -->
    <view style="margin-top: 2%;">
      <view>
        <uni-segmented-control :current="current" :values="items" style-type="text" active-color="#dd524d"
          @clickItem="onClickItem" />
      </view>
      <view v-if="current === 0" class="content" style="margin-top: 20rpx; box-sizing: border-box;">
        <view class="content-view" >
          <u-row>
            <u-col span="6">
              <view class="createdMusic_text" style="margin-top: 20rpx;">创建歌单(6个)</view>
            </u-col>
            <u-col span="6">
              <view class="createdMusic_btn " style="margin-top: 20rpx;">
                <button style="margin-right: 25rpx;" class="muBtn addMusicBtn">
                  <u-icon name="plus"></u-icon>
                </button>
                <button style="margin-left: 25rpx;" class="muBtn setMsuicBtn">
                  <u-icon name="more-dot-fill"></u-icon>
                </button>
              </view>
            </u-col>
          </u-row>
          <view class="songList"  v-for="(item, index) in playlist" :key="index">
            <u-row>
              <u-col span="6">
                <view class="songListBox">
                  <image style="display: block;" :src="item.url"></image>
                  <view class="loveSongBoxRecord">
                    <text style="font-size: 25rpx;margin-bottom: 10rpx;">{{item.name}}</text>
                    <view class="songListFontSmall">
                      <text>{{item.shou}}首</text>
                    </view>
                </view>
              </view>
              </u-col>
              <u-col span="6">
                <view class="songListBtn">
                  <button class="muBtn setMsuicBtn">
                    <u-icon name="more-dot-fill"></u-icon>
                  </button>
                </view>
              </u-col>
            </u-row>
          </view>
        </view>
      </view>
      <view v-if="current === 1" class="content" style="margin-top: 20rpx;">
        <view class="content-view" >
          <u-row>
            <u-col span="6">
              <view class="createdMusic_text" style="margin-top: 20rpx;">收藏歌单(6个)</view>
            </u-col>
            <u-col span="6">
              <view class="createdMusic_btn " style="margin-top: 20rpx;">
                <button style="right:0;" class="muBtn setMsuicBtn">
                  <u-icon name="more-dot-fill"></u-icon>
                </button>
              </view>
            </u-col>
          </u-row>
          <view class="songList"  v-for="(item, index) in playlist" :key="index">
            <u-row>
              <u-col span="6">
                <view class="songListBox">
                  <image style="display: block;" :src="item.url"></image>
                  <view class="loveSongBoxRecord">
                    <text style="font-size: 25rpx;margin-bottom: 10rpx;">{{item.name}}</text>
                    <view class="songListFontSmall">
                      <text>{{item.shou}}首</text>
                    </view>
                </view>
              </view>
              </u-col>
              <u-col span="6">
                <view class="songListBtn">
                  <button style="margin-left: 25rpx;" class="muBtn setMsuicBtn">
                    <u-icon name="more-dot-fill"></u-icon>
                  </button>
                </view>
              </u-col>
            </u-row>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import api from "@/common/api.js"
  import date from "@/utils/utils.js"
  export default {
    name: 'home',
    data() {
      return {
        //搜索框输入
        valueSearch: "",
        // 存放轮播图
        banners: [],
        //今天日期
        today: 0,
        items: ['创建歌单', '收藏歌单'],
        current: 0,
        colorIndex: 0,
        //歌单
        playlist: [{
            url: '../../static/images/homeImg/QQ图片20181208212623.jpg',
            name: '英文歌曲',
            shou: '372',
            biern: '星期三'
          },
          {
            url: '../../static/images/playMusic/video_pic4.jpg',
            name: '早上',
            shou: '372',
            biern: '星期三'
          },
          {
            url: '../../static/images/homeImg/uisdc-jl-20181224-36.jpg',
            name: '伴奏气氛',
            shou: '372',
            biern: '星期三'
          },
          {
            url: '../../static/images/playMusic/video_pic4.jpg',
            name: '我喜欢',
            shou: '372',
            biern: '星期三'
          },
          {
            url: '../../static/images/homeImg/uisdc-jl-20181224-36.jpg',
            name: '百态阿宋度',
            shou: '372',
            biern: '星期三'
          }
        ]
      }
    },

    created() {
      this.today = new Date().getDate()
      api.getBanner().then((res) => {
        if (res.code == 200) {
          this.banners = res.banners
        }
      })
    },
    methods: {
      onClickItem(e) {
        if (this.current !== e.currentIndex) {
          this.current = e.currentIndex
        }
      },
      toSearch() {
        uni.navigateTo({
          url: '/pages/search/search',
          animationType: 'slide-in-top',
          animationDuration: 200
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  /* 搜索框 */
  .u-search {
    padding: 5px 5px 0 5px;
  }

  /* 轮播图 */
  .bannerSwiper {
    padding: 20rpx;
  }

  /* 分段器 */
  .demo-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 80px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;

    .bgColor {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-bottom: 3px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(255, 33, 66, 0.1);

      image {
        width: 80rpx;
        height: 80rpx;
      }
    }

    .today {
      font-size: 25rpx;
      top: 40%;
      position: absolute;
      color: #fff;
    }

    .home_text {
      font-size: 25rpx;
      color: darkgray;
    }
  }

  /* 我喜欢的音乐 */
  .loveSongList {
    width: 100%;
    padding: 0 50rpx 0 50rpx;
    box-sizing: border-box;

    .loveSongBox {
      height: 100%;
      padding: 10rpx;
      display: flex;
      align-items: center;
      border-radius: 10rpx;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      .loveSong_Png {
        border-radius: 10rpx;
        width: 110rpx;
        height: 110rpx;
      }

      .loveSongBoxRecord {
        display: flex;
        flex-direction: column;

        .recordLoveMusicText {
          height: 10rpx;
          font-size: 20rpx;
          color: gainsboro;
          image {
            width: 20rpx;
            height: 20rpx;
            margin-right: 10rpx;
          }
        }
      }
    }
  }

  /*  歌单 */
  .content {
    width: 100%;
    padding: 0 50rpx 30rpx 50rpx;
    box-sizing: border-box;
    .content-view {
      border-radius: 10rpx;
      padding: 10rpx 20rpx 30rpx 20rpx;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      .createdMusic_text {
        font-size: 20rpx;
        color: #bbc3cb;
      }

      button::after {
        border: none;
      }
      .muBtn {
        background-color: #ffffff;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-right: 0 !important;
        border-radius: 0;  
      }

      .createdMusic_btn {
        display: flex;
      }

      // 歌单编辑按钮
      .setMsuicBtn {
        display: flex;
        justify-content: flex-end;
        transform: rotate(-90deg)
      }
    }

    // 歌单循环
    .songList {
      .songListBox {
        display: flex;
        align-items: center;
        margin-top: 20rpx;
        image {
       border-radius: 10rpx;
       width: 100rpx;
       height: 100rpx;
       margin-right: 25rpx;
        }
        .songListFontSmall{
          margin-top: 10rpx;
          height: 10rpx;
          font-size: 20rpx;
          color: gainsboro;
        }
      }
      .songListBtn{
        display: flex;
        margin-top: 20rpx;
        justify-content: flex-end;
      }
    }
  }
</style>
