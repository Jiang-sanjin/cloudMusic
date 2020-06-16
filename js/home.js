// 获取id
console.log(location.search.slice(4))


function getUserURL(){
//     mv 地址
// 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
    return axios.get("http://localhost:3000/user/detail?uid="+location.search.slice(4),{withCredentials: true})
}

function getUserSong(){
    // 获取用户歌单
    // 说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
    return axios.get("http://localhost:3000/user/playlist?uid="+location.search.slice(4),{withCredentials: true})
}

function getSubCount(){
    // 获取用户信息 , 歌单，收藏，mv, dj 数量
    // 说明 : 登陆后调用此接口 , 可以获取用户信息
    return axios.get("http://localhost:3000/user/subcount",{withCredentials: true})
}
function getMv(){
    // 最新 mv
    // 说明 : 调用此接口 , 可获取最新 mv
    return axios.get("http://localhost:3000/mv/first?limit=10",{withCredentials: true})
}
function getMusic(){
    // 获取每日推荐歌曲
    // 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
    return axios.get("http://localhost:3000/recommend/songs",{withCredentials: true})
}
function getRecMv(){
    // 推荐 mv
    // 说明 : 调用此接口 , 可获取推荐 mv
    return axios.get("http://localhost:3000/personalized/mv",{withCredentials: true})
}
function getWYMv(){
    // 网易出品mv
    // 说明 : 调用此接口 , 可获取网易出品 mv
    return axios.get("http://localhost:3000/mv/exclusive/rcmd?limit=10",{withCredentials: true})
}


// /mv/exclusive/rcmd?limit=10
axios.all( [ getUserURL(), getUserSong(), getSubCount(), getMv(),getMusic(),getRecMv(),getWYMv() ] ,{withCredentials: true} )
.then(  axios.spread(  function(UserData , UserSong , SubCountData, mvData, musicData, recMvData, wyMvData){
    console.log("用户信息",UserData.data)
    console.log("用户数量",SubCountData.data)
    console.log("用户歌单",UserSong.data)
    console.log("日推歌曲",musicData.data)
    console.log("推荐mv",recMvData.data)
    console.log("网易出品mv",wyMvData.data)
    console.log("最新mv",mvData)
    $(".avatar>img").setAttribute("src",UserData.data.profile.avatarUrl)
    $(".bg>img").setAttribute("src",UserData.data.profile.backgroundUrl)
    $(".name").innerHTML = UserData.data.profile.nickname
    $(".signature").innerHTML = "简介："+UserData.data.profile.signature
    $(".userTxt>p").innerHTML = "总歌单："+SubCountData.data.artistCount + "<br>"
    +"收藏专辑："+SubCountData.data.djRadioCount + "<br>" +"关注的歌手："+SubCountData.data.artistCount 
    console.log(UserSong.data.playlist)
    let str = ``
    for ( let i=0 ; i<UserSong.data.playlist.length; i++){
        str +=
        `
        <a href="recMusic.html?id=${UserSong.data.playlist[i].id}">
        <li>
            <img src="${UserSong.data.playlist[i].coverImgUrl}" alt="">
            <p>${UserSong.data.playlist[i].name}</p>
        </li>
        </a>
        `
    }
    $(".main>ul").innerHTML = str

    // 网易出品mv
    str = ``
    
    // console.log(mvData.data.data.length)
    for ( let i=0 ; i<wyMvData.data.data.length; i++){
        str +=
        `
        <a href="mv.html?id=${wyMvData.data.data[i].id}">
            <div class="mv-item">
                <img src="${wyMvData.data.data[i].cover}" alt="">
                <p>${wyMvData.data.data[i].name}</p>
            </div>
        </a>

        `
    }
    $(".wy-mv").innerHTML = str

    // 推荐mv
    str = ``
    
    // console.log(mvData.data.data.length)
    for ( let i=0 ; i<recMvData.data.result.length; i++){
        str +=
        `
        <a href="mv.html?id=${recMvData.data.result[i].id}">
            <div class="mv-item">
                <img src="${recMvData.data.result[i].picUrl}" alt="">
                <p>${recMvData.data.result[i].name}</p>
            </div>
        </a>

        `
    }
    $(".rec-mv").innerHTML = str
    
// 最新mv
    str = ``
    
    // console.log(mvData.data.data.length)
    for ( let i=0 ; i<mvData.data.data.length; i++){
        str +=
        `
        <a href="mv.html?id=${mvData.data.data[i].id}">
            <div class="mv-item">
                <img src="${mvData.data.data[i].cover}" alt="">
                <p>${mvData.data.data[i].name}</p>
            </div>
        </a>

        `
    }
    $(".mv").innerHTML = str
    // changeHeight($(".inner>.screen:nth-child(3)"),$(".content") )



//  歌单
    str = ``
    for( let i=0; i<musicData.data.recommend.length; i++){
        let tmp = i+1
        if(tmp<10){
            tmp = addZero(tmp)
        }

        str +=
         `
         <a href="play.html?id=${musicData.data.recommend[i].id}">
            <div class="num"> ${ tmp} </div>
            <li>
                
                <div class="play-icon"></div>
                
                <div class="song-title-container">
                    <div class="song-title">
                        <p>${ musicData.data.recommend[i].name}</p>
                    </div>
                    <div class="song-des">
                        <p></p>
                    </div>
                </div>
                
                <div class="singer">
                    <span class="sqicon"></span>
                    ${ musicData.data.recommend[i].artists[0].name}     
                    -${musicData.data.recommend[i].album.name}
                </div>
            </li>
        </a>
        
        `
    }

    $(".song-list>.play-list").innerHTML = str
}))



function addZero(count){
    // 添加 0 的函数
    return "0"+ count
}
