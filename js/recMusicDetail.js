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


        // 热门评论
        let hotStr = ``
        SongCommentData.data.hotComments.forEach( (value,index,arr)=>{
            let repliedStr  = ``
            if( value.beReplied.length!=0 ){
                repliedStr =  ` 
                <span>@${value.beReplied[0].user.nickname}:  ${value.beReplied[0].content} </span>`

            }

            hotStr += `
            <li>
                <div class="user">
                    <div class="left-img">
                        <div class="head">
                            <img src="${value.user.avatarUrl}" alt="">
                        </div>
                    </div>
                    <div class="user-info">
                        <p>${value.user.nickname}</p>
                        <span>${parseTime( new Date(value.time) )}</span>
                    </div>
                    <div class="right-icon">
                        <span>${value.likedCount}</span>
                        <svg class="u-svg u-svg-unzancmt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="#999" d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"></path></svg>
                    </div>
                </div>
                <div class="comment">
                    <p>${value.content}</p>
                    ${repliedStr}
                </div>
            </li>            
            
            `
        })
        $(".hot-comment>ul").innerHTML= hotStr


        
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

//时间戳转换方法

// Date.prototype.Format = function (fmt) {
//     var o = {
//             "M+": this.getMonth() + 1, // 月份
//             "d+": this.getDate(), // 日
//             "h+": this.getHours(), // 小时
//             "m+": this.getMinutes(), // 分
//             "s+": this.getSeconds(), // 秒
//             "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
//             "S": this.getMilliseconds() // 毫秒
//     };
//     if (/(y+)/.test(fmt))
//         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
//     for (var k in o)
//         if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//     return fmt;
// }
// console.log(new Date(1542274800000).Format('yy-MM-dd hh:mm:ss')); //"2018-11-15 17:40:00"



// 时间戳转换方法   简化

//13位数时间戳  自定义格式转换方法
function parseTime(now){
    // now要传入的时间戳
    let year = now.getFullYear()
    let month = now.getMonth()+1
    let date = now.getDate()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}





