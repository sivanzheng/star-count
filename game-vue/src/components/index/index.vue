<template>
  <div>
    <div class="beginPage">
      <div class="title"></div>
      <div class="starImg"></div>
      <div class="audioControl" @click="setAudio">
        <div class="imgWrapper fl"><img src="./audio.png"></div>
        <span class="audioState fl pointer" @click="startPlay">：{{flag}}</span>
      </div>
      <div class="starImg2"></div>
      <div class="options">
        <router-link class="option start pointer" tag="p" :to="{path:`/starCount?play=${(flag === 'ON')?'true':'false'}`}"></router-link>
        <p class="option help pointer" @click="setHelpContent"></p>
        <p class="option about pointer" @click="setAboutConent"></p>
      </div>
    </div>
    <bgm :play="isPlay"></bgm>
    <transition name="slide-fade">
      <popup v-model="isShow" :childMsg="content"></popup>
    </transition>
  </div>
</template>

<script>
  import popup from '../popup.vue'
  import bgm from '../bgm.vue'
  export default {
    data(){
      return{
        flag: 'OFF',
        content: '',
        isShow: false,
        isPlay: true
      }
    },
    methods:{
      startPlay(){
        if (this.isPlay) {
          document.getElementById('audio_bgm').play();
        }else{
          document.getElementById('audio_bgm').pause();
        }
      },
      setAudio(){
        if (this.flag === 'ON') {
          this.flag = 'OFF';
          this.isPlay = false;
        }else{
          this.flag = 'ON';
          this.isPlay = true;
        }
      },
      setHelpContent(){
        this.content =  
            '<p>1、In the specified time to complete the calculation, select the correct answer to complete the level;</p>'+
            '<p>2、Game time will be reduced with the increase of the level;</p>'+
            '<p>3、After the game you can be shared to the social platform;</p>';
        this.isShow = true;
      },
      setAboutConent(){
        this.content =
            '<p>Author:shiver</p>'+
            '<p>Version:1.0</p>'+
            '<p>URL:shiver.top</p>'+
            '<p>GitHub:uploading soon</p>'
        this.isShow = true;
      }
    },
    components:{
      popup,
      bgm
    }
  }
</script>

<style lang="less">
@rex : 1/75rem;
@keyframes zoom
{
  0%
  {
    transform:scale(0,0);
    top: 100%;
  }
  25%
  {
    transform:scale(0.25,0.25);
    top: 75%
  }
  50%
  {
    transform:scale(0.5,0.5);
    top: 50%
  }
  75%
  {
    transform:scale(0.75,0.75);
    top: 25%
  }
  100%
  {
    transform:scale(1,1);
    top: 0%;
  }
}

@-o-keyframes zoom
{
  0%
  {
    -o-transform:scale(0,0);
    top: 100%;
  }
  25%
  {
    -o-transform:scale(0.25,0.25);
    top: 75%;
  }
  50%
  {
    -o-transform:scale(0.5,0.5);
    top: 50%;
  }
  75%
  {
    -o-transform:scale(0.75,0.75);
    top: 25%;
  }
  100%
  {
    -o-transform:scale(1,1);
    top: 0%;
  }
}

@-webkit-keyframes zoom
{
  0%
  {
    -webkit-transform:scale(0,0);
    top: 100%;
  }
  25%
  {
    -webkit-transform:scale(0.25,0.25);
    top: 75%;
  }
  50%
  {
    -webkit-transform:scale(0.5,0.5);
    top: 50%;
  }
  75%
  {
    -webkit-transform:scale(0.75,0.75);
    top: 25%;
  }
  100%
  {
    -webkit-transform:scale(1,1);
    top: 0%;
  }
}



@keyframes swing
{
  0%
  {
    transform:rotate(-20deg);
  }
  25%
  {
    transform:rotate(0deg);
  }
  50%
  {
    transform:rotate(20deg);
  }
  75%
  {
    transform:rotate(0deg);
  }
  100%
  {
    transform:rotate(-20deg);
  }
}

@-o-keyframes swing
{
  0%
  {
    -o-transform:rotate(-20deg);
  }
  25%
  {
    -o-transform:rotate(0deg);
  }
  50%
  {
    -o-transform:rotate(20deg);
  }
  75%
  {
    -o-transform:rotate(0deg);
  }
  100%
  {
    -o-transform:rotate(-20deg);
  }
}

@-webkit-keyframes swing
{
  0%
  {
    -webkit-transform:rotate(-20deg);
  }
  25%
  {
    -webkit-transform:rotate(0deg);
  }
  50%
  {
    -webkit-transform:rotate(20deg);
  }
  75%
  {
    -webkit-transform:rotate(0deg);
  }
  100%
  {
    -webkit-transform:rotate(-20deg);
  }
}

@-moz-keyframes swing
{
  0%
  {
    -moz-transform:rotate(-20deg);
  }
  25%
  {
    -moz-transform:rotate(0deg);
  }
  50%
  {
    -moz-transform:rotate(20deg);
  }
  75%
  {
    -moz-transform:rotate(0deg);
  }
  100%
  {
    -moz-transform:rotate(-20deg);
  }
}


@keyframes flash{
  0%{opacity: 0}
  25%{opacity: .3}
  50%{opacity: .75}
  75%{opacity: .4}
  100%{opacity: 0}
}

@-webkit-keyframes flash{
  0%{-webkit-opacity: 0}
  25%{-webkit-opacity: .3}
  50%{-webkit-opacity: .75}
  75%{-webkit-opacity: .4}
  100%{-webkit-opacity: 0}
}

@-moz-keyframes flash{
  0%{-moz-opacity: 0}
  25%{-moz-opacity: .3}
  50%{-moz-opacity: .75}
  75%{-moz-opacity: .4}
  100%{-moz-opacity: 0}
}

@-o-keyframes flash{
  0%{-o-opacity: 0}
  25%{-o-opacity: .3}
  50%{-o-opacity: .75}
  75%{-o-opacity: .4}
  100%{-o-opacity: 0}
}

.beginPage{
  background: -webkit-linear-gradient(#f9ff9d, #fdffd8, #fff);
  background: -o-linear-gradient(#f9ff9d, #fdffd8, #fff);
  background: -moz-linear-gradient(#f9ff9d, #fdffd8, #fff);
  background: linear-gradient(#f9ff9d, #fdffd8, #fff);
  overflow: hidden;
  height: 100vh;
  position: relative;
  .title{
    width: 507*@rex;
    height: 178*@rex;
    margin: 0 auto;
    background: url(title.png) no-repeat center;
    background-size: contain;
    padding-top: 70*@rex;
  }
  .starImg{
    width: 231*@rex;
    height: 228*@rex;
    background: url(star.png) no-repeat center;
    background-size: contain;
    position: absolute;
    right: 0;
    top: 280*@rex;
    animation: swing 1.5s infinite  cubic-bezier(0.25, 0.46, 0.45, 0.94);
    -webkit-animation: swing 1.5s infinite  cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .starImg2{
    width: 231*@rex;
    height: 228*@rex;
    background: url(star2.png) no-repeat center;
    background-size: contain;
    position: absolute;
    left: 10%;
    top: 480*@rex;
    animation: flash 2s infinite linear;
    -webkit-animation: flash 2s infinite linear;
  }
  .options{
    margin-top: 530*@rex;
    .start{
      background: url(start.png) no-repeat center;
    }
    .help{
      background: url(help.png) no-repeat center;
    }
    .about{
      background: url(about.png) no-repeat center;
    }
    .option{
      width: 334*@rex;
      height: 74*@rex;
      background-size: contain;
      margin: 30*@rex auto;
    }
    .helpContent{
      margin: 0 auto;
      text-align: center;
      font-size: 20*@rex;
      overflow-y: scroll;
    }
    .aboutContent{
      margin: 0 auto;
      text-align: center;
      font-size: 20*@rex;
      overflow-y: scroll;
    }
  }
  .audioControl{
    display: inline-block;
    position: absolute;
    left: 40*@rex;
    top: 380*@rex;
    .imgWrapper{
      width: 100*@rex;
      height: 100*@rex;
      img{
        width: 100%;
        display: inline-block;
      }
    }
    .audioState{
      display: inline-block;
      font-size: 80*@rex;
      color: cadetblue;
    }
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>