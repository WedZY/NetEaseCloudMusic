<template>
  <view>
    <view class="searchTabr">
      <u-search shape="round" placeholder="搜索歌曲关键词" :clearabled="true" v-model="valueSearch" actionText="搜索"
        @custom='search()' @change="change"></u-search>
      <!-- 没有输入搜索内容就提示 -->
      <u-toast ref="uToast"></u-toast>
    </view>
    <!-- 搜索建议提示 -->
    <view v-if="PromptSearchShow" class="searchAdvice">
      <button class="searchAdviceBtn" @click="searchToPage()">
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
      <button class="searchAdviceBtn" @click="toPage(item.keyword)">
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
    <!-- 显示搜索结果 -->
    <view v-if="showRestults">
      <u-button>
        <!-- 全部播放 -->
        <view class="playAllBtnImg">
          <image src="../../static/images/searchRestults/fmw.png" class="playBtn"></image>
          <text>播放全部</text>
        </view>
      </u-button>
      <view class="playBtnList" v-for="(item,index) in searchResults" :key="index">
        <u-button :customStyle="customStyles" @click="toPlay(item)">
          <u-row>
            <u-col span="12">
              <view class="col_box">
                <view class="musicNamebox">
                  <view class="musicName">{{item.name}}</view>
                  <view class="musicName" v-for="(item,index) in item.tns" :key="index">
                    (<span>{{item}}</span>)
                  </view>
                </view>
                <view class=" showAuthorityImgBtn">
                  <image v-if="item.privilege.plLevel=='none'" style="width: 38rpx; height: 25rpx; margin-right: 10rpx;"
                    src="../../static/images/searchRestults/em6.png" class="palyimg"></image>
                  <image v-if="item.privilege.plLevel=='none'" style="width: 43rpx; height: 26rpx; margin-right: 10rpx;"
                    src="../../static/images/searchRestults/em2.png" class="palyimg"></image>
                  <image v-if="item.originCoverType==1" style="width: 43rpx; height: 26rpx; margin-right: 10rpx;"
                    src="../../static/images/searchRestults/els.png" class="palyimg"></image>
                  <image v-if="item.privilege.maxBrLevel=='hires'"
                    style="width: 54rpx; height: 25rpx; margin-right: 10rpx;"
                    src="../../static/images/searchRestults/elh.png" class="palyimg"></image>
                  <image v-if="item.privilege.maxBrLevel=='lossless'"
                    style="width: 35rpx; height: 26rpx; margin-right: 10rpx;"
                    src="../../static/images/searchRestults/em0.png" class="palyimg"></image>
                  <view v-for="(items,index) in item.ar" :key="idnex">
                    <span>{{items.name}}</span>
                    <span v-show="index<item.ar.length-1">/</span>
                  </view>
                 <view class="musname">
                  <span>-</span>
                  <span>{{item.al.name}}</span></view>
                </view>
                <view class="musicAuthor" v-for="(items,index) in item.alia" :key="idnex">{{items}}</view>
              </view>
            </u-col>
          </u-row>
        </u-button>
      </view>
    </view>
  </view>

</template>

<script>
  import ModalPrompt from '../../components/modal/Modal.vue'
  import api from '../../common/api.js'
  import{mapState,mapMutations} from'vuex'
  export default {
    name: "serach",
    components: {
      ModalPrompt
    },
  computed:{},
    data() {
      return {
        valueSearch: "",
        valueSearchPrompt: "",
        serarchKey: '5pif5pyf5LiJ',
        show: false, //本地搜索记录是否显示
        showPrompt: false, //提示框是否显示
        PromptSearchShow: false, //提示框是否显示
        searchAdvices: [], //搜索建议
        searchHistoryRecord: [], //存放搜索历史记录
        //搜索结果
        pageSize: 30, //每页个数
        pageNum: 1, //页数
        offset: 0, //偏移
        searchResults: [], //搜索结果列表
        showRestults: false, //显示搜索结果
        customStyles: {
          //u-button按键样式
          height: 'auto',
          border: 'none',
          padding: '15rpx',
        },
        musicName:'',
      }
    },
    watch: {
      searchHistoryRecord(newVal, oldVal) {    
        if (newVal.length === 0) {
          this.show = false
          return
        } 
        this.showRestults?this.show=false:this.show=this.valueSearch==''
      },
      searchAdvices(newVal, oldVal) {
        if (newVal === undefined) {
          this.show = false
          this.searchAdvices = []
        }
      },
      valueSearch(newVal, oldVal) {
        if (newVal != '') {
          this.PromptSearchShow = true
          this.valueSearchPrompt = `搜索  "${newVal}"`
          return
        }
        this.PromptSearchShow = false
        this.show = this.searchHistoryRecord.length === 0
        this.show = this.searchHistoryRecord.length !== 0
      },
    },
    created() {
      // 加载搜索记录
      if (uni.getStorageSync(this.serarchKey) != '') {
        this.searchHistoryRecord = JSON.parse(uni.getStorageSync(this.serarchKey))
        return
      }
    },
    methods: {
      ...mapMutations(['SET_BACKGROUND_IMG']),
      searchToPage() {
        this.toPage(this.valueSearch)
      },
      toPage(res) {
        this.show = false
        this.valueSearch = res
        this.search()
      },
      change(res) {
        this.show = false
        this.showRestults = false
        if (this.valueSearch == '') this.searchAdvices = []
        api.getSearchAdvice(res).then(res => {
          if (res.code === 200) {
            this.show = false
            this.searchAdvices = res.result.allMatch  
          }
        })
      },
      
      HistoryRecord(index) {
        this.valueSearch = this.searchHistoryRecord[index]
      },
      //调用搜索接口
      getorderList(val, offset, pageSize) {
        api.getAllSearchMusic(this.valueSearch, this.offset, this.pageSize).then(res => {
          if (res.code >= 200 && res.code < 300) {
            this.searchResults = [...this.searchResults, ...res.result.songs]
            this.searchHistoryRecord = [...this.searchHistoryRecord, this.valueSearch]
            this.saveSearchHistory()
          }
        })
      },
      search() {
        if (this.valueSearch == '') {
          this.$refs.uToast.show({
            type: 'default',
            message: "请输入内容再次搜索",
          })
          return
        } 
          this.PromptSearchShow = false
          this.searchAdvices = []
          this.showRestults = true
          this.searchResults = []
          this.pageSize = 30
          this.offset = 0
          this.pageNum = 1
          this.getorderList(this.valueSearch, this.offset, this.pageSize)
      },
      // 保存搜索记历录方法
      saveSearchHistory() {
        this.searchHistoryRecord = [...new Set([...this.searchHistoryRecord, this.valueSearch].reverse())]
        uni.setStorageSync(this.serarchKey, JSON.stringify(this.searchHistoryRecord))
      },
      
      //跳转到播放页面 
      toPlay(res){
        this.$store.commit('SET_BACKGROUND_IMG',{
          img:res.al.picUrl
        })
         let singer=[]
         res.ar.forEach(item=>{
         singer=[...singer,item.name]
       })
       singer=singer.join('/')
       uni.navigateTo({
         url:`/pages/playMusic/playMusic?id=${res.id}&musicName=${res.name}&singerName=${singer}`
       })
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
      },
    },
    onReachBottom() {
      if (this.pageNum * this.pageSize == this.searchResults.length) {
        this.offset = this.pageNum * this.pageSize //偏移量增加 
        this.getorderList(this.valueSearch, this.offset, this.pageSize)
        this.pageNum += 1 //页数加+1
      } else {
        uni.showLoading({
          title: '已经到底啦'
        });
        setTimeout(function() {
          uni.hideLoading();
        }, 2000);
      }
    },

  }
</script>

<style lang="less">
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

    .searchAdviceBtn {
      padding-left: 20rpx;
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-right: 0 !important;
      margin-left: 0 !important;
      border-radius: 0;

      .searchAdviceicon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .searchAdviceText {
      font-size: 25rpx;
      border-bottom: 1rpx solid #e9eaec;
    }

    .searchAdviceTextPrompt {
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

  // 显示搜索结果
  @import url("@/pages/search/searchRestults.less");
</style>
