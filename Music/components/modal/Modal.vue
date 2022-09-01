<template>
  <view>
    <u-modal :show="show" :title="title" showConfirmButton="true" showCancelButton="true" buttonReverse="true"
      @confirm='confirm' @cancel='cancel'>
      <view class="slot-content">
        <rich-text :nodes="content"></rich-text>
      </view>
    </u-modal>
  </view>
</template>

<script>
  export default {
    name: 'modal',
    props: {
      showModal: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        show: false,
        title: '提示',
        content: '是否删除搜索记录'
      }
    },
    watch: {
      showModal(val) {
        console.log('子组件侦听到了',val)
        this.show = val
      }
    },
    methods: {
      // 确定
      confirm() {
        this.show = false
        this.$emit('confirm', this.show)
      },
      // 取消
      cancel() {
        this.show = false
        this.$emit('cancel', this.show)
      }
    }
  }
</script>

<style>

</style>
