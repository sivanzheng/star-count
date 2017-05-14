<template>
    <div class="gameOverPage">
      <div class="arrow" :class="{'arrow-animation':status}" v-show="status">
        <img src="./arrow.png">
        <p>click here to share</p>
      </div>
      <div class="answer"><p>The answer is&nbsp;&nbsp;<span>{{answer}}</span>！</p></div>
      <div class="score"><i class="scoreImg"></i>&nbsp;x&nbsp;<span>{{score}}</span></div>
      <div class="btns clearfix">
        <router-link  class="restart pointer" tag="div" :to="{path: `/starCount?play=${flag}`}"  replace>restart</router-link>
        <div class="share pointer" @click="changeStatus">share</div>
      </div>
    </div>
</template>

<script>
  export default {
    data(){
      return{
        answer:'',
        score:'',
        flag:'',
        status:false
      }
    },
    methods:{
      GetQueryString (name){
        var after = window.location.hash.split("?")[1];
        if(after){
          var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          var r = after.match(reg);
          if(r != null){
            return  decodeURIComponent(r[2]);
          }
          else{
            return null;
          }
        }
      },
      changeStatus(){
        this.status = !this.status
      }
    },
    mounted(){
      this.answer = this.GetQueryString('answer');
      this.score = this.GetQueryString('score');
      this.flag = this.GetQueryString('play');
      this.$nextTick(() => {
        document.title=`算的满天星才获得了${this.score}分！好气啊！`;
      })
    }
  }
</script>

<style lang="less">
@rex : 1/75rem;
.h(@number){height:@number*@rex;line-height:@number*@rex;}
.f(@size){font-size: @size*@rex;}
html,body{
  height: 100%;
}
.gameOverPage{
  text-align: center;
  margin: 0 auto;
  font-size: 60*@rex;
  background: url(../../../static/img/endbg.png) no-repeat center;
  background-size: contain;
  height: 100%;
  .answer{
    margin: 0 auto;
    padding-top: 30*@rex;
  }
  .score{
    margin: 0*@rex auto 50*@rex auto;
    padding-top: 50*@rex;
    display: block;
    position: inherit;
    color: #000;
  }
  .btns{
    position: fixed;
    bottom: 0;
    display: block;
    width: 100%;
    text-align: center;
    border-top: 2px dashed #312f2f;
    height: 100*@rex;
    line-height: 100*@rex;
    background: #fff;
    border-radius: 15px;
    .restart{
      float: left;
      width: 50%;
      display: inline-block;
      border-right: 2px dashed #312f2f;
      box-sizing: border-box;
    }
    .share{
      float: right;
      width: 50%;
      display: inline-block;
    }
  }
  #overAnswer{
      color: rgb(243, 135, 21);
      font-size: 70*@rex;
  }
  .arrow{
    width: 300*@rex;
    height: 360*@rex;
    position: fixed;
    right: 0;
    top: 0;
    img{
      width: 100%;
      display: inline-block;
    }
    p{
      font-size: 40*@rex;
      color: #fff;
      background: #000;
      position: relative;
      border-radius: 50%;
      right: 50%;
      top: 5%;
    }
  }
}

.arrow-animation{
  animation: zoom 0.7s linear;
  -webkit-animation: zoom 0.7s linear;
}
</style>