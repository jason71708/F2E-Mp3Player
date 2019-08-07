let vm = new Vue({
    el:'#app',
    data() {
        return {
            isListShow : false,
            isPlayListShow : true,
            isSingerShow : true,
            isAlbumShow : true,
            isFavoriteShow : false,

            isplay : false,
            volumeX : 125, //進度條
            timeX : 0,  //進度條
            currentTime : '0:00', //顯示
            duration : '0:00', //顯示
            
            playList : ['工作清單','youtube精選'],
            singerList : ['周杰倫','盧廣仲'],
            singerAlbum : [
                ['魔杰座','依然范特西','12新作'],
                ['花甲男孩轉大人','幾分之幾']
            ],
            // singerSongs : [
            //     ['給我一首歌的時間','花海','說好的幸福呢','稻香','夜的第七章','听妈妈的话','千里之外','紅塵客棧','明明就','比較大的大提琴'],
            //     ['明仔載-演奏版','繁星五號','快魚仔','幾分之幾','你是我的水']
            // ],
            // AlbumSongs :[
            //     ['給我一首歌的時間','花海','說好的幸福呢','稻香'],
            //     ['夜的第七章','听妈妈的话','千里之外'],
            //     ['紅塵客棧','明明就','比較大的大提琴'],
            //     ['明仔載-演奏版','繁星五號','快魚仔'],
            //     ['幾分之幾','你是我的水']
            // ],
            myFavorite : ['只能想念你','思念是一種病','稻香','愛情怎麼了嗎','Photograph'],
            
            bigTitle : '工作歌單' ,
            albumImgSrc : 'img/album0.jpg',

            songTitle : '遇見',
            singer : 'Sungha Jung',
            // mp3Src : 'audio/遇见 Yu Jian （Encounter) - Stefanie Sun 孫燕姿 - Sungha Jung.mp3',
            songImgSrc : 'img/album0.jpg',

            workSongs : {
                son1 :{title:'遇見',time:"3:32",like:false,singer:'Sungha Jung',album:'同名專輯',Img:'img/album0.jpg',src:'audio/遇见 Yu Jian （Encounter) - Stefanie Sun 孫燕姿 - Sungha Jung.mp3'},
                son2 :{title:'Photograph',time:"3:27",like:true,singer:'Sungha Jung',album:'同名專輯',Img:'img/album0.jpg',src:'audio/(Ed Sheeran) Photograph - Sungha Jung.mp3'},
            },
            youtubeSongs : {
                son1 :{title:'Lucid Dreamer',time:"3:10",like:false,singer:'Alice Janne',album:'無版權音樂',Img:'img/album1.jpg',src:'audio/Lucid_Dreamer.mp3'},
                son2 :{title:'Sunspots',time:"5:43",like:false,singer:'John Winston',album:'無版權音樂',Img:'img/album1.jpg',src:'audio/Sunspots.mp3'}
            },
            currentAlbum : -1,
            currentList : 0
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
        }
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
        timeUpdate(){
            let timeStr = parseInt(this.$refs.mp3.currentTime);
            this.currentTime = this.minSec(timeStr);
            this.timeX = timeStr / this.$refs.mp3.duration * 552
        },
        canPlay(){
            this.duration = this.minSec(this.$refs.mp3.duration);
        },
        end(){
            this.isplay = false
            timeX = 0
            let audio =document.querySelector('#audio');
            audio.currentTime = 0
        },
        selectSong(event){
            let Src = event.currentTarget.getAttribute("num")
            let title = event.currentTarget.getAttribute('til')
            let sir = event.currentTarget.getAttribute('sir')
            let img = event.currentTarget.getAttribute('img')
            let audio = document.querySelector("#audio")
            this.end()
            audio.src = Src
            this.songTitle = title
            this.singer = sir
            this.songImgSrc = img
            this.playOrStop()
        },
        targetList(event){
            let el = document.querySelector(".point_active")
            el.classList.remove('point_active')
            let el2 = event.currentTarget
            el2.classList.add('point_active')
        },
        changeAlbum(index){
            this.currentAlbum = index
        },
        changeList(index){
            this.currentList = index
            this.albumImgSrc = `img/album${index}.jpg`
            this.bigTitle = this.playList[index]
        },
        likeHeart(){
            let ppp = event.currentTarget.getAttribute('num')
            if(this.currentList==0){
                this.workSongs[ppp].like = !this.workSongs[ppp].like
                if(this.workSongs[ppp].like){
                    this.myFavorite.push(this.workSongs[ppp].title)
                }else{
                    let num = this.myFavorite.indexOf(this.workSongs[ppp].title)
                    this.myFavorite.splice(num, 1)
                }
            }
            else{
                this.youtubeSongs[ppp].like = !this.youtubeSongs[ppp].like
                if(this.youtubeSongs[ppp].like){
                    this.myFavorite.push(this.youtubeSongs[ppp].title)
                }else{
                    let num = this.myFavorite.indexOf(this.youtubeSongs[ppp].title)
                    this.myFavorite.splice(num, 1)
                }
            }
        }
    }
})
