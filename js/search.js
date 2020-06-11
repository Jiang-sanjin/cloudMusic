

let searchInput = document.querySelector(".search-bar>input")

let arr = JSON.parse( localStorage.getItem("singerName")) || [""]

// // onblur 表示失去焦点
// searchInput.onblur = function(){
//     console.log("失去焦点")
// }
searchHot()
getInfo()
// onfocus表示有焦点search
searchInput.onfocus = function(){
    console.log("有焦点")
    searchInput.onkeyup = function (e){ 
        console.log("e",e)
        if( searchInput.value==""){
            // 输入框为空展示默认页面
            // showContainer 切换页面
            showContainer(document.querySelector(".search-def"))
            changeHeight($(".inner>.screen:nth-child(3)"),$(".content") )
            
        }
        else{

            if(e.keyCode==13){
                // 回车键显示的界面
                showContainer(document.querySelector(".search-res"))


                 // 离线存储以key:value形式
                // let arr = []
                // arr.push(searchInput.value)
                // localStorage.setItem("singerName",JSON.stringify(arr))

                // 先从离线存储里面取出数据
                // 在这个数据之上push
                // 离线存取关键:整存整取
                
               
                
                
                
               
                getInfo()

                
                //发送请求  渲染
                axios_request()
                
            

            }
            else{
                // 搜索建议
                showContainer(document.querySelector(".search-rem"))
                searchAdv()
            }
        }

        
    }
    
}


function searchHot(){
    fetch("http://localhost:3000/search/hot",{
        method:"get",
        mode:"cors",
    })
    .then(function(data){
        return data.json()
    })
    .then(function(data){
        let box =document.querySelector(".search-hot")
        let str = ``
        for( i=0; i<data.result.hots.length; i++ ){
            str += `<span onclick="get_name('${data.result.hots[i].first}')" > 
            ${data.result.hots[i].first} </span>`
        }
        box.innerHTML = str
    })
}

// 渲染存储
function getInfo(){
    if( !arr.includes(searchInput.value) ){    
        //判断是否存在
        arr.push(searchInput.value) 
        localStorage.setItem("singerName",JSON.stringify(arr))
    }
    // let arr = JSON.parse(localStorage.getItem("singerName")) || []
    let str = ''
    let box = document.querySelector(".search-list")
    for( i=1; i<arr.length; i++ ){
        console.log(arr.length)
        str += 
        `
        <li>  
            <p onclick="get_name('${arr[i]}')"> ${arr[i]}</p>
            <span onclick="delInfo(${i})">X</span>
        
        </li>
        `
    }
    box.innerHTML = str
    
}



// 离线存储删除
function delInfo(x){

    // 整存整取
    // 取出离线存储数据转换成数组
    // let arr = JSON.parse(localStorage.getItem("singerName"))  || []
    arr.splice(x,1)
    localStorage.setItem("singerName", JSON.stringify(arr))
    changeHeight($(".inner>.screen:nth-child(3)"),$(".content") )
    getInfo()    //操作过后的离线数据   再次渲染
}


function searchAdv(){
  
    let box = document.querySelector(".search-rem>.search-list") 
    fetch(`http://localhost:3000/search/suggest?keywords=${searchInput.value}&type=mobile`)
    .then( function(data){
        return data.json()
    } )
    .then( function(data){
        console.log("搜索建议",data)
        let str = ''
        for( i=0; i<data.result.allMatch.length; i++ )
        {
            str +=
            `
            <li onclick="get_name('${data.result.allMatch[i].keyword}')">
             ${data.result.allMatch[i].keyword} </li>
            `
        }    
      
        box.innerHTML = str
    })

}
// 搜索歌手信息和专辑介绍
// http://localhost:3000/multimatch?keywords=
// 搜索歌曲列表：
// http://localhost:3000/search?keywords=

function getAblum(){
    return axios.get(`http://localhost:3000/search/multimatch?keywords=${searchInput.value}`)
}
function getSongList(){
    return axios.get(`http://localhost:3000/search?keywords=${searchInput.value}`)
}
// axios请求  渲染
function axios_request() {

    axios.all([getAblum(),getSongList()])
    .then(axios.spread((getAblumInfo,getSongListInfo)=>{
        console.log("专辑歌手信息",getAblumInfo)
       
        
        console.log("歌曲列表",getSongListInfo)
        

        let ablumBox = document.querySelector(".search-res>ol")
        let songListBox = document.querySelector(".search-res>ul")
        let ablumStr =``
        let songListStr =``

        let ablumInfo = getAblumInfo.data.result
    //    Object.keys取出对象属性  
        if( Object.keys(ablumInfo)!=0)
        {
            
          
            if(Object.keys(ablumInfo).includes("album") && Object.keys(ablumInfo).includes("artist")){
                ablumStr += 
                `
                <li>
                    <img src="${ablumInfo.artist[0].picUrl}" alt="">
                    <p>${ablumInfo.artist[0].name}</p>
                </li>

                <li>
                    <img src="${ablumInfo.album[0].blurPicUrl}" alt="">
                    <p>${ablumInfo.album[0].name}</p>
                </li>
                `
                ablumBox.innerHTML = ablumStr
            
            }
            else{
                ablumStr =``
                ablumBox.innerHTML = ablumStr
            }
                
        }
        


        let songArr = getSongListInfo.data.result.songs

        for( i=0; i<songArr.length; i++){
            songListStr+=
            `
            <a href="play.html?id=${songArr[i].id}">
                <li>
                    <div class="play-icon"></div>
                    <div class="song-title-container">
                        <div class="song-title">
                            <p>${songArr[i].name}</p>
                        </div>
                        <div class="song-des">
                           
                        </div>    
                    </div>
                    <div class="singer">
                            <span class="sqicon"></span>
                            ${songArr[i].artists[0].name}- ${songArr[i].album.name}
                        </div>
                </li>
            </a>

            `
           
        }
        songListBox.innerHTML = songListStr

      changeHeight($(".inner>.screen:nth-child(3)"),$(".content") )
    }))

}


function get_name(x){
    console.log(x)
    searchInput.value = x 
    getInfo()
    axios_request()
    showContainer(document.querySelector(".search-res"))
}

