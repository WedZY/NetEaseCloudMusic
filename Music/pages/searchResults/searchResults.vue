<template>
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

      <view class="playBtnList" v-for="(item,index) in searchRestultsList" :key="index">
        <u-button hairline="false" :customStyle="customStyles">
          <view>
            <u-row>
              <u-col span="12">
                <view class="playtext" v-html="item.name">
                </view>
                <view class="playtext2" v-html="show[index]">
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
        valueSearch: '',
        searchRestultsList: [],
        authorVersion: [], //作者名字加版本
        cun: [],
        show:[],
        char: '',
        pageSize: 30,
        pageNum: 1,
        offset: 0,
        customStyles: {
          height: 'auto',
          border: 'none',
          padding:'20rpx',
        }
      }
    },
    watch: {},
    onLoad: function(option) {
      this.valueSearch = option.name
      this.getorderList(option.name, this.offset, this.pageSize)

    },

    methods: {
      //获取歌曲列表方法
      getorderList(name, offset, size) {
        api.getAllSearchMusic(name, offset, size).then(res => {
          if (res.code = 200) {
            this.searchRestultsList = [...this.searchRestultsList, ...res.result.songs];
            this.cun=[...this.cun,this.valueSearch]
             this.cun.forEach(data => {
              let hightStr = `<span style="color:#71afe5">${data}</span>`
              let str = new RegExp(data, 'gi')
              this.searchRestultsList.forEach(items => {
                items.name = items.name.replace(str, hightStr)
                items.ar.forEach(item => {
                  const authorversion = item.name + ' - ' + items.al.name
                  this.authorVersion = [...new Set([...this.authorVersion, authorversion])]
                })
                items.alia.forEach(itemchilds => {
                  itemchilds = itemchilds.replace(str, hightStr)
                })
              })
                this.authorVersion.forEach(item=>{
                item=item.replace(str,hightStr)
                this.show=[...this.show,item]
              })
            })





            // this.valueSearch.split('').forEach(data=>{
            //   this.searchRestultsList.forEach(item=>{
            //     let hightStr=`<span style="color:#71afe5">${data}</span>`
            //     let str=new RegExp(data,'gi')
            //     item.name=item.name.replace(str,hightStr)
            //     item.al.name=item.al.name.replace(str,hightStr)
            //     item.ar.forEach(itemchild=>{
            //       let hightStrChild=`<span style="color:#c7e0f4">${data}</span>`
            //       let strchild=new RegExp(data,'gi')
            //       itemchild.name=itemchild.name.replace(strchild,hightStrChild)
            //     })
            //     item.alia.forEach(itemchilds=>{
            //       let hightStrChilds=`<span style="color:#c7e0f4">${data}</span>`
            //       let strchilds=new RegExp(data,'gi')
            //       itemchilds=itemchilds.replace(strchilds,hightStrChilds)
            //     })
            //   })
            // }) 
          }
        })
      },
      // 点击书输入框关闭当前页面
      shutDownPage() {
        uni.navigateBack({
          url: '/pages/search/search'
        })
      },
      onReachBottom() {
        if (this.pageNum * this.pageSize == this.searchRestultsList.length) {
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

        .playtext {
          color: #3b3a39;
          
        }

        .playtext2 {
          color: #dfe4ea;
          margin: 5rpx;
          font-size: 20rpx;
        }
      }

    }

  }
</style>
