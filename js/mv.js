
console.log(location.search.slice(4))
function getMvURL(){
    return axios.get("http://localhost:3000/mv/url?id="+location.search.slice(4),{withCredentials: true})
}
function getMvId(){
    return axios.get("http://localhost:3000/mv/detail?mvid="+location.search.slice(4),{withCredentials: true})
}
function getMvComment(){
    return axios.get("http://localhost:3000/comment/mv?id="+location.search.slice(4),{withCredentials: true})
}
axios.all( [ getMvURL(),getMvId() ,getMvComment() ] ,{withCredentials: true} )
.then(  axios.spread(  function(MvURLData, MvIdData, MvCommentData){
    console.log(MvIdData)
    $(".mv").setAttribute("src",MvURLData.data.data.url)
    console.log("mv评论",MvCommentData)

    $(".header>img").setAttribute("src",MvIdData.data.data.cover)
    $(".header>p").innerHTML = MvIdData.data.data.name
    $(".bg>img").setAttribute("src",MvIdData.data.data.cover)
    $("head>title").innerHTML  = MvIdData.data.data.name

    let hotStr = ``
    console.log("hot",MvCommentData.data)
    MvCommentData.data.hotComments.forEach( (value,index,arr)=>{
        
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


    let mvStr = ``
    MvCommentData.data.comments.forEach( (value,index,arr)=>{
        let repliedStr2  = ``
        if( value.beReplied.length!=0 ){
            repliedStr2 =  ` 
            <span>@${value.beReplied[0].user.nickname}:  ${value.beReplied[0].content} </span>`

        }
        mvStr += `
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
                ${repliedStr2}
            </div>
        </li>            
        
        `
    })
    $(".mv-comment>ul").innerHTML= mvStr
}))




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

function set(){

    let setTxt = ""
    setTxt=$(".comment-box").value
    console.log(setTxt)
    fetch("http://localhost:3000/comment?t=1&type=1&id="+location.search.slice(4) +"&content=" + setTxt,{
    
    method:"get",
    mode:"cors",   
    credentials: "include"   //跨域访问
    })
    .then( function (data){    
    // console.log(data)    
    return data.json()     
    })
    .then( function(data){
        console.log(data)
        console.log("http://localhost:3000/comment?t=1&type=1&id="+location.search.slice(4) +"&content=" + setTxt)
    }) 
}