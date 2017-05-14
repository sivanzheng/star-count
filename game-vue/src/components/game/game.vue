<template>
  <div>
  <audio src="../../../static/audio/right.mp3" ref="audio_right" preload="auto"></audio>
  <audio src="../../../static/audio/gadou.mp3"  ref="audio_error" preload="auto"></audio>
  <audio src="../../static/audio/WorldSceneBGM.mp3" ref="audio_bgm" preload="auto" loop="loop"></audio>
  <div class="main main-hook" id="main">
    <div class="allcanvas">
      <p class="score"><i class="scoreImg"></i>x<span>{{gameScore}}</span></p>
      <div class="graph">
        <strong id="bar" class="bar" style="width:1%;"></strong>
      </div>
      <canvas id="canvas1"></canvas>
      <div class="interactive" id="interactive">
          <p class="answerBox pointer" v-for="(item, index) in randomAnser" @click="setOption(item)">{{item}}</p>
      </div>
      <canvas id="canvas2"></canvas>
    </div>
  </div>
  </div>
</template>

<script>
  export default  {
    data(){
      return{
        can1: '',
        can2: '',
        ctx1: '',
        ctx2: '',
        availHeight: '',
        availWidth: '',
        operators: ['1','0'],
        operators_two: ['11','10','01','00'],
        operators_three: ['000','100','010','001','101','011','110','111'],
        randomAnser: ['','',''],
        answer:'',
        gameScore: 0,
        gameTime: 3000,
        interval: '',
        timeoutId: '',
        audioEle_right:'',
        audioEle_error:'',
        audio_bgm:'',
        audioBoolean: true,
        flag: false
      }
    },
    mounted(){
      this.flag = this.GetQueryString('play');
      this.audioEle_error = this.$refs.audio_error;
      this.audioEle_right = this.$refs.audio_right;
      this.audio_bgm = this.$refs.audio_bgm;
      this.availHeight = document.documentElement.clientHeight;
      this.availWidth = document.documentElement.clientWidth;
      this.setCavans();
      document.getElementById('main').style.height = `${this.availHeight}px`;
      this.GameLevel(this.gameScore);
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
      setOption(x){
        this.clearTimeStar(true);
        this.ifPlay(this.flag,this.audio_bgm);
        if (x === this.answer) {
          this.setCavans();
          this.gameScore++
          this.clear = true;
          this.GameLevel(this.gameScore)
          this.ifPlay(this.flag,this.audioEle_right);
        }else{
          this.ifPlay(this.flag,this.audioEle_error);
          setTimeout(()=>{
            this.$router.replace({path: `/gameover?score=${this.gameScore}&answer=${this.answer}&play=${this.flag}`});
          },650)
        }
      },
      ifPlay(audioBoolean,obj){
        if (audioBoolean === 'true') {
          obj.play();
        }else{
          obj.pause();
        }
      },
      setCavans(){
        this.can1 = document.getElementById('canvas1');
        this.ctx1 = this.can1.getContext("2d");
        this.can2 = document.getElementById('canvas2');
        this.ctx2 = this.can2.getContext("2d");
        this.can1.width = Math.min(640,this.availWidth);
        this.can1.height = Math.min(1136,this.availHeight);
        this.can2.width = Math.min(640,this.availWidth);
        this.can2.height = Math.min(1136,this.availHeight);
      },
      word(ctx,color,fcolor,weight,size,txt,x,y){
        ctx.strokeStyle = color || 'black';
        ctx.fillStyle = fcolor || 'black';
        ctx.font= weight+' '+size+' FireBlock';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(txt , x , y)
      },
      beginStar(total){
        //绘制星星
        for(let i = 0 ; i < total ; i ++ ){
        let r = Math.random() * 5 + 5;
        let x = Math.random() * this.can1.width;
        let y = Math.random() * this.can1.height;
        let a = Math.random() * 360;
        this.drawStar(this.ctx1 , x , y , r , r/2.0 , a);
        }
      },
      drawStar(ctx , x , y , r , R , rot ){
        ctx.beginPath();
        for(let i = 0 ; i < 5 ; i++){
          ctx.lineTo(Math.cos((18+i*72-rot)/180*Math.PI)*R+x,-Math.sin((18+i*72-rot)/180*Math.PI)*R+y);
          ctx.lineTo(Math.cos((54+i*72-rot)/180*Math.PI)*r+x,-Math.sin((54+i*72-rot)/180*Math.PI)*r+y);
        }
        ctx.closePath();
        ctx.strokeStyle = "#fd5";
        ctx.fillStyle = "#fb3";
        ctx.lineWidth = 3;
        ctx.lineJion = "round";
        ctx.fill();
        ctx.stroke();
      },
      drawBg(beiginColor,endColor){
        let bgColor = this.ctx2.createLinearGradient(0 , 0 , 0 , this.can2.height);
        bgColor.addColorStop(0.0 , beiginColor);
        bgColor.addColorStop(1.0 , endColor);
        this.ctx2.fillStyle = bgColor;
        this.ctx2.fillRect(0,0,this.can2.width,this.can2.height);
      },
      shuffle(arr){
        //洗牌算法
          var result = [],
              random;
          while(arr.length>0){
              random = Math.floor(Math.random() * arr.length);
              result.push(arr[random])
              arr.splice(random, 1)
          }
          return result;
      },
      returnAnswer(){
        //生成答案
        this.randomAnser[0] = this.answer;
        let tempC1,tempC2;
        tempC1 = this.answer+Math.round(3-(Math.random()*6));
        tempC2 = this.answer+Math.round(3-(Math.random()*6));
        if ((tempC1 != tempC2)&&(tempC1 != this.answer)) {
          this.randomAnser[1] = tempC1;
          if (tempC2 != this.answer) {
            this.randomAnser[2] = tempC2;
            return
          }else{
            this.randomAnser = [];
            this.returnAnswer();
          }
        }else{
          this.randomAnser = [];
          this.returnAnswer();
        }
      },
      clearTimeStar(clear){
        if (clear) {
          clearTimeout(this.interval);
          document.getElementById('bar').style.width = '0%';
        }
      },
      setTimeOutStar(time){
          var countdown = () => {
            // 时间到
            if(document.getElementById('bar').style.width == "100%"){
              this.ifPlay(this.flag,this.audioEle_error);
              clearTimeout(this.interval);
              this.interval = '';
              document.getElementById('bar').style.width = '0%';
              document.title='算的满天星才获得了'+this.gameScore+'分！好气啊！';
              setTimeout(()=>{
                this.$router.replace({path: `/gameover?score=${this.gameScore}&answer=${this.answer}&play=${this.flag}`});
              },300)
              return;
            }
              document.getElementById('bar').style.width = parseInt(document.getElementById('bar').style.width) + 1 + "%";
              let total = 1;
                  total++;
              this.beginStar(total);

            this.interval = setTimeout(countdown, time/100);
          };
          setTimeout(countdown, time/100);
      },
      GameLevel(score){
        this.setTimeOutStar(this.gameTime)
        if (score >= 0 && score < 10) {
          this.drawBg('#4a768f','#01b9af');
          let a = Math.round(Math.random()*3);
          let b = Math.round(Math.random()*3);
          let c;
          switch(this.operators[Math.round(Math.random())])
            {
            case '1':
              c=a+b;
              this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '80px' , a+'+'+b+'= ?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
              this.answer = c;
              break;
            case '0':
              c=a-b;
              this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '80px' , a+'-'+b+'= ?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
              this.answer = c;
              break;
            }
            this.returnAnswer();
            this.randomAnser = this.shuffle(this.randomAnser);

        }else if (score >= 10 && score < 20) {
          this.drawBg('#c29c2f','#ffed96')
          this.gameTime = 2600;
          let a = Math.round(Math.random()*3);
          let b = Math.round(Math.random()*3);
          let c;
          let d = Math.round(Math.random()*3);
          switch(this.operators_two[Math.round(Math.random()*3)])
                {
                case '11':
                  c=a+b+d
                  this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '64px' , a+'+'+b+'+'+d+'=?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
                  this.answer = c;
                  break;
                case '10':
                  c=a+b-d
                  this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '64px' , a+'+'+b+'-'+d+'=?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
                  this.answer = c;
                  break;
                case '01':
                  c=a-b+d
                  this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '64px' , a+'-'+b+'+'+d+'=?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
                  this.answer = c;
                  break;
                case '00':
                  c=a-b-d
                  this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '64px' , a+'-'+b+'-'+d+'=?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
                  this.answer = c;
                  break;
                }
                this.returnAnswer();
                this.randomAnser = this.shuffle(this.randomAnser);

        }else if (score >= 20 ) {
          this.drawBg('#ee2302','#fea700');
          this.gameTime = 2300;
          let a = Math.round(Math.random()*3);
          let b = Math.round(Math.random()*3);
          let c;
          let d = Math.round(Math.random()*3);
          let e = Math.round(Math.random()*3);
          switch(this.operators_three[Math.round(Math.random()*7)])
              {
              case '000':
                c=a-b-d-e
                this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '56px' , a+'-'+b+'-'+d+'-'+e+'=?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
                this.answer = c;
                break;
              case '100':
                c=a+b-d-e
                this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '56px' , a+'+'+b+'-'+d+'-'+e+'=?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
                this.answer = c;
                break;
              case '010':
                c=a-b+d-e
                this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '56px' , a+'-'+b+'+'+d+'-'+e+'=?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
                this.answer = c;
                break;
              case '001':
                c=a-b-d+e
                this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '56px' , a+'-'+b+'-'+d+'+'+e+'=?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
                this.answer = c;
                break;
              case '101':
                c=a+b-d+e
                this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '56px' , a+'+'+b+'-'+d+'+'+e+'=?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
                this.answer = c;
                break;
              case '011':
                c=a-b+d+e
                this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '56px' , a+'-'+b+'+'+d+'+'+e+'=?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
                this.answer = c;
                break;
              case '110':
                c=a+b+d-e
                this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '56px' , a+'+'+b+'+'+d+'-'+e+'=?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
                this.answer = c;
                break;
              case '111':
                c=a+b+d+e
                this.word(this.ctx2 , '#fff' , '#fff' , 'bold' , '56px' , a+'+'+b+'+'+d+'+'+e+'=?' , this.can1.width/2 ,(this.can1.height/20)*5.5);
                this.answer = c;
                break;
              }
              this.returnAnswer();
              this.randomAnser = this.shuffle(this.randomAnser);

        }
      }
    }
  }
</script>

<style lang="less">
@rex : 1/75rem;
.h(@number){height:@number*@rex;line-height:@number*@rex;}
.f(@size){font-size: @size*@rex;}
.main{margin: 0 auto;max-width: 640px;max-height: 1136px;position: relative;height: 100%;background: #000;}

#canvas1{
  position: absolute;
  width: 100%;
  z-index: 1;
}
#canvas2{
  position: absolute;
  z-index: 0;
}
.interactive{position: absolute;z-index: 100;width: 100%;text-align: center;bottom: 8%;
  .answerBox{width: 450*@rex;height: 138*@rex;line-height: 180*@rex;.f(60);margin: 15*@rex auto;position: relative;
    &:nth-child(1){
      background: url(options_1.png) no-repeat center;
      background-size: contain;
    }
    &:nth-child(2){
      background: url(options_2.png) no-repeat center;
      background-size: contain;
    }
    &:nth-child(3){
      background: url(options_3.png) no-repeat center;
      background-size: contain;
    }
  }
}
.score{position: absolute;z-index: 100;.f(60);color: #fff;width: 100%;text-align: center;
  .scoreImg{
    display: inline-block;
    width: 52*@rex;
    height: 59*@rex;
    padding-top: 20*@rex;
    background: url(scoreStar.png) no-repeat center;
    background-size: contain;
    position: relative;
    top: 15*@rex;
  }
}


.graph{
    width:450*@rex;
    border:2px solid #F8B3D0;
    height:30*@rex;
    position: absolute;
    top: 440*@rex;
    z-index: 1000;
    left: 50%;
    margin-left: -225*@rex;
    box-shadow: 0px 2px 1px rgba(95, 78, 85, 0.79);
    border-radius: 10px;
  .bar{
      display:block;
      background:red;
      float:right;
      height:100%;
      text-align:center;
      border-radius: 10px;
  }
}
</style>