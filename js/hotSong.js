fetch("http://localhost:3000/top/list?idx=1",{
    method:"get",
    mode:"cors",

})
.then( function(data){
    return data.json()
})
.then( function(data){
    console.log(data.playlist.tracks)
    let str = ' '
    for( i=0; i<20; i++){
        let tmp = i+1
        if(tmp<10){
            tmp = addZero(tmp)
        }
        let des = data.playlist.tracks[i].alia[0] || ""
        str += `
        <a href="play.html?id=${data.playlist.tracks[i].id}">
                <div class="num"> ${ tmp} </div>
                <li>
                    
                    <div class="play-icon"></div>
                    
                    <div class="song-title-container">
                        <div class="song-title">
                            <p>${ data.playlist.tracks[i].name}</p>
                        </div>
                        <div class="song-des">
                            <p>${des}</p>
                        </div>
                    </div>
                    
                    <div class="singer">
                        <span class="sqicon"></span>
                        ${ data.playlist.tracks[i].ar[0].name}     
                        -${ data.playlist.tracks[i].al.name}
                    </div>
                </li>
    </a>
        
        `
    }
    let box=document.querySelector(".hotSong>ul")
    box.innerHTML=str
})

function addZero(count){
    // 添加 0 的函数
    return "0"+ count
}