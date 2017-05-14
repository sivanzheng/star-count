<template>
  <div>
    <audio src="../../static/audio/WorldSceneBGM.mp3" id="audio_bgm" ref="audio_bgm" preload="auto" loop="loop"></audio>
  </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    watch:{
      play(val,oldval){
        if(val){
          this.$refs.audio_bgm.play()
        }else{
          this.$refs.audio_bgm.pause()
        }
      }
    },
    props:{
      play: {
        type: [Boolean, String]
      }
    },
    mounted(){
    }
  }
</script>