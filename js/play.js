

console.log(location.search)
// 高并发 处理 axios

// 1.获取音乐地址  2.专辑图片+名字   3.歌词信息
function getMusicURL(){
    return axios.get("http://localhost:3000/song/url"+location.search)
}

function ablumImg(){
    return axios.get("http://localhost:3000/song/detail?ids="+location.search.slice(4))
}

function getLyric(){
    return axios.get("http://localhost:3000/lyric"+location.search)
}
axios.all( [ getMusicURL(), ablumImg(), getLyric() ]  )
.then(  axios.spread(  function(musicUrlData , ablumImgData , lyricData){

    console.log("歌词",lyricData);   
    console.log(musicUrlData.data.data[0].url);   //歌曲地址
    console.log(ablumImgData.data.songs[0].name)   //名字 
    console.log(ablumImgData.data.songs[0].al.picUrl)  //专辑图片
    // console.log(lyricData.data.lrc.lyric)   //歌词
    
   

    let songImg = document.querySelector(".song-img>img")
    let bg = document.querySelector(".bg>img")
    let title = document.querySelector(".song-lyric>h2")
    let lyricTxt = document.querySelector(".song-lyricTxt>p")
    let musicAudio = document.querySelector("#audio")
    let disc = document.querySelector(".disc")
    let rangeBar = document.querySelector("#range")
    var flag = 0
    let lyric =""
    let txt = ""
    // 定义一个歌词播放lyric对象
    console.log(Object.keys(lyricData.data))
    if(Object.keys(lyricData.data).includes("lrc") ){
        console.log("有歌词")
         lyric = new window.Lyric(lyricData.data.lrc.lyric, function (obj) {
        
        
        
            txt +=obj.txt
                lyricTxt.innerHTML += obj.txt +"<br>"
                // lyricTxt.innerHTML = obj.txt +"<br>"
                flag +=1;
            console.log(flag)
           
        })
    }
    
   

    //背景和专辑头像设置
    songImg.setAttribute("src",ablumImgData.data.songs[0].al.picUrl)
    bg.setAttribute("src",ablumImgData.data.songs[0].al.picUrl)

    //歌词设置
    title.innerHTML = ablumImgData.data.songs[0].name
    

    // 音乐设置
    musicAudio.setAttribute("src",musicUrlData.data.data[0].url)

    // 播放和暂停    定义点击的监听事件
    disc.addEventListener("click",isplay)
    
    function isplay(){
      
        if(musicAudio.paused){
            musicAudio.play()
            disc.classList.remove("paused")
            disc.classList.add("playing")
            console.log("播放")
         
                lyric.togglePlay()
            
            
        }
        else{
            musicAudio.pause()
            disc.classList.remove("playing")
            disc.classList.add("paused")
            console.log("暂停")
            
                lyric.togglePlay()
            
        }
    
    }


    // onloadedmetadata 媒体的元数据已经加载完毕
    musicAudio.onloadedmetadata = function(){
        // 进度条当前位置    ontimeupdate  更新当前时间    
        // 公式 当前value /100 =  歌曲当前是时间 /总时间
        musicAudio.ontimeupdate = function(){
            rangeBar.value = musicAudio.currentTime * 100 /musicAudio.duration
        }

        // 进度拖动
        rangeBar.oninput = function(){
            musicAudio.currentTime = rangeBar.value * musicAudio.duration / 100
            // currentTime单位是秒  需要转换成毫秒
          
               lyric.seek(musicAudio.currentTime*1000)
            
            
        }
    }
    

} ) )

