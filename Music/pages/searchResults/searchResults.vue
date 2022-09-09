<!-- <template>
  <view class="searchTabr">
    <view class="searchHead">
      <u-search shape="round" :clearabled="true" v-model="valueSearch" actionText="搜索" @click="shutDownPage"
        disabled="true"></u-search>
    </view>
    <view class="searchRestults">
      <u-button>
        <view class="playAllBtnImg">
          <image src="../../static/images/searchRestults/fmw.png" class="playBtn"></image>
          <text class="playText">播放全部</text>
        </view>
      </u-button>
      <view class="playBtnList" v-for="(item,index) in searchRestultsLists" :key="index">
        <u-button hairline="false" :customStyle="customStyles" @click="toPlay(item,index)">
          <view class="BtnBox">
            <u-row>
              <u-col span="12">
                <view class="playtext" v-html="searchRestultsNames[index]">
                </view>
                <view class="playtextChildbox">
                                 <image v-if="item.privilege.plLevel=='none'" style="width: 38rpx; height: 25rpx;" src="../../static/images/searchRestults/em6.png"
                    class="palyimg"></image>
                 <image v-if="item.privilege.plLevel=='none'" style="width: 43rpx; height: 26rpx;" src="../../static/images/searchRestults/em2.png"
                    class="palyimg"></image>
                    <image v-if="item.originCoverType==1" style="width: 43rpx; height: 26rpx;" src="../../static/images/searchRestults/els.png"
                      class="palyimg"></image>
                      
                  <image v-if="item.privilege.maxBrLevel=='hires'" style="width: 54rpx; height: 25rpx;" src="../../static/images/searchRestults/elh.png"
                    class="palyimg"></image>
                                   <image v-if="item.privilege.maxBrLevel=='lossless'" style="width: 35rpx; height: 26rpx;" src="../../static/images/searchRestults/em0.png"
                    class="palyimg"></image>
                  <view class="playtext2" v-html="authorVersion[index]">
                  </view>
                </view>
                <view v-for="(first,index) in item.alia" :key='index'>
                  <text class="playtext2 provenance">{{first}}</text>
                </view>
              </u-col>
            </u-row>
          </view>
        </u-button>
      </view>
    </view>
  </view>

</template>

<script>
  import api from '../../common/api.js'
  export default {
    name: 'searchResults',
    data() {
      return {
        valueSearch: '',  //搜索框内容
        searchRestultsLists: [], //搜索的数据
        searchRestults: [], //没有替换的
        searchRestultsList: [],//当前页搜索的数据
        searchRestultsName: [],//歌名
        searchRestultsNames: [],//替换颜色后的歌名
        authorVersion: [], //替换后的歌唱者和版本
        author: [], //临时性
        char: 0, //判断是否是第一个歌唱者
        nums:1,  //判断是每个分割字符都替换
        strObj: '', //拼接字符
        pageSize: 30, //每页个数
        pageNum: 1, //页数
        offset: 0, //偏移
        toName:'',//传参的作者名字
        musicTin:'',//传参的音乐名字
        isDown:false,
        customStyles: { 
          //u-button按键样式 
          height: 'auto',
          border: 'none',
          padding: '20rpx',
          overflow: 'hidden', //超出的文本隐藏
        }
      }
    },
    onLoad: function(option) {
      this.valueSearch = option.name
      this.getorderList(option.name, this.offset, this.pageSize)
    },
    methods: {
      //获取歌曲列表方法
      getorderList(name, offset, size) {

           api.getAllSearchMusic(name, offset, size).then(res => {
             if (res.code = 200) {
                this.searchRestultsLists = [...this.searchRestultsLists, ...res.result.songs];
                this.searchRestultsList=res.result.songs
                this.valueSearch.split('').forEach(data => {
                let hightStr = `<span style="color:#71afe5">${data}</span>`
                let str = new RegExp(data, 'gi')
                this.searchRestultsList.forEach(item => {
                //存储名字
                  if (item.tns === undefined) {            
                    item.name=item.name.replace(str,hightStr)
                    this.searchRestultsName = [...this.searchRestultsName, item.name]
               } else {
                    item.tns.forEach(items => {
                       item.name=item.name.replace(str,hightStr)
                      const name = item.name + '(' + items + ')'
                      this.searchRestultsName = [...this.searchRestultsName, name]
                    })
                  }
                  //歌唱者+版本
                  item.ar.forEach(items => {
                    if (this.char == 0) {
                      items.name=items.name.replace(str,hightStr)
                      this.strObj += items.name
                      this.char++
                    } else {
                      items.name=items.name.replace(str,hightStr)
                      this.strObj += '/' + items.name
                    }
                  })
                item.al.name=item.al.name.replace(str,hightStr)
                  this.strObj+= ' - ' + item.al.name
                  this.author = [...this.author, this.strObj]
                  this.strObj = ''
                  this.char = 0 
                })
                if(this.nums!=this.valueSearch.split('').length){
                  this.searchRestultsName=[]
                  this.author=[]
                  this.nums++;
                }else{
                  this.searchRestultsNames=[...this.searchRestultsNames,...this.searchRestultsName]
                  this.authorVersion=[...this.authorVersion,...this.author]
                }
              })
              this.nums=1;//重置
             }
           })
      },
      onReachBottom() {
        if (this.pageNum * this.pageSize == this.searchRestultsLists.length) {
          this.offset = this.pageNum * this.pageSize //偏移量增加 
          this.getorderList(this.valueSearch, this.offset, this.pageSize,1)
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
      // 跳转到播放页面
      toPlay(res){
        uni.navigateTo({
          url:`/pages/playMusic/playMusic?id=${res.id}`
        })
          },
      // 点击书输入框关闭当前页面
      shutDownPage() {
        uni.navigateBack({
          url: '/pages/search/search'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .searchTabr {
    font-weight: lighter;
    box-sizing: border-box;
    .searchHead {
      padding: 25rpx 10rpx;
    }

    .searchRestults {
      .playAllBtnImg {
        width: 100%;
        display: flex;
        align-items: center;
      }

      .playBtn {
        width: 50rpx;
        height: 50rpx;
        margin-right: 20rpx;
      }

      .playBtnList {
        width: 100%;
        box-sizing: border-box;

        .BtnBox {
          width: 80%;
          box-sizing: border-box;
          .playtext {     
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-all;
              color: #3b3a39;
          }

          .playtextChildbox {
            display: flex;
            align-items: center;

            .palyimg {
              margin: 10rpx 0 10rpx 10rpx;
            }
          }

          .playtext2 {
            color: #dfe4ea;
            margin: 5rpx;
            font-size: 20rpx;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
        }
      }


    }

  }
</style>
 -->