let vm = new Vue({
    el:'#app',
    data:{
        isListShow : false,
        isPlayListShow : true,
        isSingerShow : true,
        isAlbumShow : false,
        isFavoriteShow : false,
        isplay : false,
        volumeX : 125,
        timeX : 0,
        currentTime : 0,
        maxTime : 0,
    },
    computed:{
        outPutIcon(){
            if(this.isplay){
                return 'url(img/stop.svg)'
            }else{
                return 'url(img/Polygon_9.svg)'
            }
        },
        colorV(){
            let percent = this.volumeX / 152 * 100
            return 'linear-gradient(to right, #c5c5c5 '+percent+'% , #fff '+percent+'%)'
        },
        colorT(){
            let percent = this.timeX / 552 * 100
            return 'linear-gradient(to right, #c5c5c5 '+percent+'% , #fff '+percent+'%)'
        },
        timeqqq(){
            let audio = document.querySelector('#audio');
            let xxx = audio.currentTime / audio.duration * 552
            this.timeX = xxx
        },
        
    },
    methods:{
        listShow(){
            this.isListShow = !this.isListShow;
        },
        mousedownVol(e){
            let or = this.volumeX;
            let audio = document.querySelector('#audio');
            document.onmousemove = (e2) => {
                let Xer = (e2.clientX-e.clientX);
                if(Xer + or  > 152){
                    this.volumeX == 152
                }else if(Xer + or < 0){
                    this.volumeX == 0
                }else{
                    this.volumeX = Xer + or
                }
                audio.volume = this.volumeX / 152 ;
            };
            document.onmouseup = ()=> {
                document.onmousemove=null;
                document.onmousedown=null;
            };
        },
        mousedownTime(e){
            let or = this.timeX
            let audio = document.querySelector('#audio');
            document.onmousemove = (e2) => {
                let Xer = (e2.clientX-e.clientX);
                if(Xer + or  > 552){
                    this.timeX == 552
                }else if(Xer + or < 0){
                    this.timeX == 0
                }else{
                    this.timeX = Xer + or
                }
            };
            document.onmouseup = ()=> {
                audio.currentTime = this.timeX / 552 * audio.duration;
                document.onmousemove=null;
                document.onmousedown=null;
            };
        },
        playOrStop(){
        let audio =document.querySelector('#audio');
            if(!this.isplay){
                audio.play();
                this.isplay = true;
            }else if(this.isplay){
                audio.pause();
                this.isplay = false;
            }
        },
        minSec(time){
            let min = Math.floor(time/60);
            let sec = Math.round(time%60);
            return min+':'+sec;
        },
        onTimeUpdate () {
            console.log(this)
            this.currentTime = this.$refs.mp3.currentTime
        }
    }
})