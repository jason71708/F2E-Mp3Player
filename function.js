let vm = new Vue({
    el:'#app',
    data() {
        return {
            isListShow : false,
            isPlayListShow : true,
            isSingerShow : true,
            isAlbumShow : false,
            isFavoriteShow : false,

            isplay : false,
            volumeX : 125, //進度條
            timeX : 0,  //進度條
            currentTime : '0:00', //顯示
            duration : '0:00', //顯示
            mp3Src : 'audio/遇见 Yu Jian （Encounter) - Stefanie Sun 孫燕姿 - Sungha Jung.mp3',
            
            singerList : ['周杰倫','盧廣仲'],
            singerAlbum : [
                ['魔杰座','依然范特西','12新作'],
                ['花甲男孩轉大人','幾分之幾']
            ],

            playList : [
                ['遇見','Photograph'],
                ['Lucid Dreamer','Sunspots'],
            ],
            singerSongs : [
                ['給我一首歌的時間','花海','說好的幸福呢','稻香','夜的第七章','听妈妈的话','千里之外','紅塵客棧','明明就','比較大的大提琴'],
                ['明仔載-演奏版','繁星五號','快魚仔','幾分之幾','你是我的水']
            ],
            AlbumSongs :[
                ['給我一首歌的時間','花海','說好的幸福呢','稻香'],
                ['夜的第七章','听妈妈的话','千里之外'],
                ['紅塵客棧','明明就','比較大的大提琴'],
                ['明仔載-演奏版','繁星五號','快魚仔'],
                ['幾分之幾','你是我的水']
            ],
            myFavorite : ['只能想念你','思念是一種病','稻香','愛情怎麼了嗎'],
            
            bigTitle : '工作歌單' ,
            albumImgSrc : 'img/maxresdefault (2).jpg',
            songTitle : '遇見',
            singer : 'Sungha Jung'
        }
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
        test(){
            let audio =document.querySelector('#audio');
            return this.minSec(audio.duration)
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
                audio.currentTime = this.timeX / 552 * audio.duration;
            };
            document.onmouseup = ()=> {
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
            let sec = '0' + Math.round(time%60);
            let sec2 = sec.slice(-2)
            return min+':'+sec2;
        },
        test3(){
            let audio =document.querySelector('#audio');
            console.log(audio.currentTime)
        },
        timeUpdate(){
            let timeStr = parseInt(this.$refs.mp3.currentTime);
            this.currentTime = this.minSec(timeStr);
            this.timeX = timeStr / this.$refs.mp3.duration * 552
        },
        canPlay(){
            this.duration = this.minSec(this.$refs.mp3.duration);
        }
    }
})
