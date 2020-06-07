
//当obj传入我们需要的盒子时  控制三个盒子都隐藏
// 只有obj显示

function showContainer(obj){
    let box = document.querySelector(".search-container")
    let child = box.children
    for( i=0; i<child.length; i++){
        child[i].style.display = "none"
    }

    obj.style.display = "block"
}