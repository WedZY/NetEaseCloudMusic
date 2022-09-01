<template>
  <view>
    <view class="searchTabr">
      <u-search shape="round" placeholder="搜索歌曲关键词" :clearabled="true" v-model="valueSearch" actionText="搜索"
        @custom='SaveHistory()' @change="change"></u-search>
    </view>
    <!-- 搜索建议提示 -->
    <view v-if="PromptSearchShow" class="searchAdvice">
      <button class="searchAdviceBtn">
        <u-row>
          <u-col span="12">
            <view class="searchAdviceTextPrompt">
              <text>{{valueSearchPrompt}}</text>
            </view>
          </u-col>
        </u-row>
      </button>
    </view>
<!-- 搜索建议 -->
    <view class="searchAdvice" v-for="(item,index) in searchAdvices" :key="index">
      <button class="searchAdviceBtn">
        <u-row>
          <u-col span="1">
            <view class="searchAdviceicon">
              <u-icon size="20" name="search"></u-icon>
            </view>
          </u-col>
          <u-col span="11">
            <view class="searchAdviceText">{{item.keyword}}</view>
          </u-col>
        </u-row>
      </button>
    </view>

<!-- 搜索历史记录 -->
    <view v-if="show" class="searchHistory">
      <u-row>
        <u-col span="6">
          <view class="HistoryRecord">历史记录</view>
        </u-col>
        <u-col span="6">
          <view class="detBtn">
            <button class="detBtnbox" @click='clearHistory()'>
              <u-icon name="trash" size="35rpx"></u-icon>
            </button>
          </view>
        </u-col>
      </u-row>
    </view>
    <view v-if="show" class="searchHistoryList">
      <view class="searchHistorybox">
        <text class="historyTextBg" v-for="(item , index) in searchHistoryRecord" :key="index"
          @click="HistoryRecord(index)">{{item}}</text>
      </view>
    </view>
    <ModalPrompt :showModal="showPrompt" @confirm='confirm' @cancel='cancel'></ModalPrompt>
  </view>
</template>

<script>
  import ModalPrompt from '../../components/modal/Modal.vue'
  import api from '../../common/api.js'
  export default {
    name: "serach",
    components: {
      ModalPrompt
    },
    data() {
      return {
        valueSearch: "",
        valueSearchPrompt: "",
        serarchKey: '5pif5pyf5LiJ',
        show: true,
        showPrompt: false, //提示框是否显示
        PromptSearchShow: false, //提示框是否显示
        searchAdvices:[], //搜索建议
        searchResults: [], //搜索结果列表
        searchHistoryRecord: [], //存放搜索历史记录
      }
    },
    watch: {
      searchHistoryRecord(newVal, oldVal) {
        if (newVal.length == 0) {
          this.show = false
        } else {
          this.show = true
        }
      },
      searchAdvices(newVal,oldVal){
        if(newVal===undefined){
          this.searchAdvices=[]
        }
        if(newVal==''){
          this.show=true
        }
      },
      valueSearch(newVal,oldVal){ 
       if(newVal==''){
         this.PromptSearchShow=false
       }else{         
            this.PromptSearchShow=true
            this.valueSearchPrompt=`搜索  "${newVal}"`
       }
      }
    },
    created() {
      // 加载搜索记录
      this.searchHistoryRecord = JSON.parse(uni.getStorageSync(this.serarchKey))
      if (this.searchHistoryRecord.length == 0) this.show = false
    },
    methods: {
      change(res) {
        if(this.valueSearch=='')this.searchAdvices=[]
        api.getSearchAdvice(res).then(res => {
         if(res.code===200){
         this.searchAdvices=res.result.allMatch
         this.show=false
         }
        })
      },
      HistoryRecord(index) {
        this.valueSearch = this.searchHistoryRecord[index]
      },
      //保存关键词
      SaveHistory(val) {
        if (!(val === '')) {
          this.valueSearch = val
          this.searchHistoryRecord = [...this.searchHistoryRecord, this.valueSearch]
          this.saveSearchHistory()
        }
      },
      // 保存搜索记历录方法
      saveSearchHistory() {
        this.searchHistoryRecord = [...new Set([...this.searchHistoryRecord, this.valueSearch].reverse())];
        uni.setStorageSync(this.serarchKey, JSON.stringify(this.searchHistoryRecord))
        this.valueSearch = ''
      },
      // 调用子组件
      clearHistory() {

        this.showPrompt = true
      },
      // 清楚本地搜索记录
      confirm(show) {
        if (!show) {
          this.showPrompt = show
          this.searchHistoryRecord = [],
            uni.setStorageSync(this.serarchKey, '[]')
        }
      },
      cancel(show) {
        this.showPrompt = show
      }
    }
  }
</script>

<style lang="less">
  page {
    // background-color: #f1f2f6;
  }

  .searchTabr {
    background-color: #fff;
    padding: 25rpx 10rpx;
  }

  button::after {
    border: none;
  }

  // 搜索建议
  .searchAdvice {
    background-color: #fff;
    .searchAdviceBtn{
      padding-left:20rpx ;
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-right: 0 !important;
      margin-left: 0 !important;
      border-radius: 0;
      .searchAdviceicon{
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .searchAdviceText{
      font-size: 25rpx;
      border-bottom: 1rpx solid #e9eaec;
    }
    .searchAdviceTextPrompt{
      padding-left: 25rpx;
      color: #ff4757;
      font-size: 25rpx;
      border-bottom: 1rpx solid #e9eaec;
    }
  }
  

  // 搜索历史
  .searchHistory {
    width: 100%;
    background-color: #fff;
    padding: 10rpx 50rpx 25rpx 50rpx;
    box-sizing: border-box;

    .HistoryRecord {
      font-size: 25rpx;
    }

    .detBtn {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .detBtnbox {
        background-color: #fff;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-right: 0 !important;
        margin-left: 0 !important;
        border-radius: 0;
      }


    }
  }

  .searchHistoryList {
    box-sizing: border-box;

    .searchHistorybox {
      display: flex;
      flex-wrap: wrap;

      .historyTextBg {
        font-size: 25rpx;
        color: black;
        margin: 10rpx 10rpx 0rpx 10rpx;
        padding: 15rpx;
        border-radius: 15rpx;
        background-color: #f1f2f6;
      }
    }

  }
</style>
