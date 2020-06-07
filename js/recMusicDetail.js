// 匿名函数简写   把function改成 =>
// 只有一个形式参数可以去掉圆括号
// 如果花括号里面只有一行代码可以去掉{}  也可不写return

// function (data){
//     return data.json()
// }

// (data)>={
//     return data.json()
// }
// data >= data.json

// fetch( "http://localhost:3000/playlist/detail" + location.search )
// .then( data => data.json() )
// .then( data => console.log("歌单详情", data ) )

// fetch( "http://localhost:3000/comment/playlist" + location.search )
// .then( data => data.json() )
// .then( data => console.log( "歌单评论",data ) )



//********         使用axios高并发        *****************    */

// 专辑图： data.playlist.coverImgUrl
// 专辑名：data.playlist.name
// 标签 ： data.playlist.tags   数组
// 歌曲列表： data.playlist.tracks   数组

// 播放量：data.playlist.playCount
// 歌单描述： data.playlist.description

// 精彩评论：
// 最新评论：
function addZero(count){
    // 添加 0 的函数
    return "0"+ count
}


function getSongDetail(){
    return axios.get("http://localhost:3000/playlist/detail" + location.search )
}

function SongComment(){
    return axios.get("http://localhost:3000/comment/playlist" + location.search)
}

axios.all( [ getSongDetail() , SongComment() ] )
.then(  axios.spread(  (SongDetailData,SongCommentData)=>{
        console.log( "歌单详情",SongDetailData )
        console.log( "歌单评论",SongCommentData )
        let songImg = document.querySelector(".songImg>img")
        let avatar = document.querySelector(".avatar>img")
        let songTitle = document.querySelector(".songTxt>h2")
        let author = document.querySelector(".user>p")
        let bg = document.querySelector(".bg>img")
        let span = document.querySelector(".intro_title")
        let introTxt = document.querySelector(".intro_txt>p")
        let playList = document.querySelector(".song-list>.play-list")
        // console.log( "歌单详情",SongDetailData.data.playlist.coverImgUrl )


        
        let songList  = SongDetailData.data.playlist
        songImg.setAttribute("src",songList.coverImgUrl)
        bg.setAttribute("src",songList.coverImgUrl)
        avatar.setAttribute("src",songList.creator.avatarUrl)
        songTitle.innerHTML = songList.name
        author.innerHTML = songList.creator.nickname

        // 正侧表达      g表示全局替换      \N是回车符号
        let reg = /\n/g
        console.log(reg)
        let str2 = songList.description.replace(reg,"<br>")
        console.log(str2)
        let str = ``
        for( let i=0; i<songList.tags.length; i++){
            str += `<span>${songList.tags[i]}</span>`
        }
        $(".intro_title").innerHTML = `标签：`+str 

        introTxt.innerHTML = `简介：` + `<br>` + str2

        str = ``
        for( let i=0; i<songList.tracks.length; i++){
            let tmp = i+1
            if(tmp<10){
                tmp = addZero(tmp)
            }

            str +=
             `
             <a href="play.html?id=${songList.tracks[i].id}">
                <div class="num"> ${ tmp} </div>
                <li>
                    
                    <div class="play-icon"></div>
                    
                    <div class="song-title-container">
                        <div class="song-title">
                            <p>${ songList.tracks[i].name}</p>
                        </div>
                        <div class="song-des">
                            <p></p>
                        </div>
                    </div>
                    
                    <div class="singer">
                        <span class="sqicon"></span>
                        ${ songList.tracks[i].ar[0].name}     
                        -${songList.tracks[i].al.name}
                    </div>
                </li>
            </a>
            
            `
        }
        playList.innerHTML = str

} ))


let num = 0
function show(obj){
    num++;
    if(num%2==1){
        // 奇数次
        obj.style.height  ="auto"

        $(".intro").style.height = "auto"

        console.log("奇数次")
        // 控制箭头向上
        $("icon").classList.remove("down")
        $("icon").classList.add("up")
        
    }
    else{
        // 偶数点击
        obj.style.height = "115px"
        $(".intro").style.height = "130px"
        console.log("偶数次")
        $("icon").classList.remove("up")
        $("icon").classList.add("down")
    }
}