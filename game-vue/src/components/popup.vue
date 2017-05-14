<template>
  <div class="popWrap" v-show="visible">
    <div class="content" v-html="childMsg"></div>
    <div class="closeBtn" @click="cancel">close</div>
    <input type="text" :value="value" style='display:none;'>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible:false
    }
  },
  props: {
    value: {
      type: Boolean
    },
    childMsg: {
      type: String
    }
  },
  watch:{
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit('input', val);
    }
  },
  mounted() {
    if (this.value) {
      this.visible = true;
    }
  },
  methods:{
   cancel(){
    this.visible = false;
   }
  }
}
</script>

<style lang="less">
  @rex : 1/75rem;
  .popWrap{
    z-index: 10000;
    position: fixed;
    min-width: 640*@rex;
    max-width: 750*@rex;
    left: 0;
    right: 0;
    margin:auto;
    bottom: 0;
    height: 400*@rex;
    background: #fffbfb;
    border-radius: 45px 45px 0 0;
    color: #000;
    text-align: center;
    padding: 50*@rex 20*@rex 0 20*@rex;
    font-size: 30*@rex;
    font-family: '微软雅黑';
    line-height: 35*@rex;
    .content{
      p{
        width: 80%;
        margin: 0 auto;
      }
    }
    .closeBtn{
      width: 30%;
      margin: 50*@rex auto 0 auto;
      height: 50*@rex;
      line-height: 50*@rex;
      border: 1px solid #000;
      border-radius: 45px;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000;
    }

  }
</style>