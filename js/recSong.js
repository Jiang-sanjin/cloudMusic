// fetch获取接口的数据

// fetch(地址，配置)   
// {} 对象 以key value形式存在


fetch("http://localhost:3000/personalized",{
    // method:   get获取   post上传  delete删除   update修改
    method:"get",
    mode:"cors",   //  cors跨域  no-cors不跨域    端口不一致需要跨域
})
.then( function (data){    //data  形参
    // console.log(data)    //data是数据流    第一步数据转换
    return data.json()     //数据流转换成 json格式
})
.then( function(data){    
    // data.result是最新歌单的数据
    //console.log(data.result.slice(0,6))  
    
    // data.result是一个数组  slice切割数组  左闭右开
    data.result.slice(0,6)

    
    // 获取网页页面的盒子  document指的是盒子
    // querySelector只会找到符合要求的第一个元素，要找全部用querySelectorAll
    let box=document.querySelector(".rec-song")

    for( i=0; i<data.result.slice(0,6).length; i++)
    {
        box.innerHTML +=
        `
        <a href="recMusic.html?id=${data.result[i].id}">   
        <div class="song-item">
            <img src="${data.result[i].picUrl}" alt="">
            <p>${data.result[i].name}</p>
        </div>
        </a>
        `
    
    }
})

