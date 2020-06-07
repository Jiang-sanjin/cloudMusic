let tabBtn = document.querySelectorAll( ".tab>label" )
let screen = document.querySelectorAll( ".inner>.screen" )

for( let i = 0; i < tabBtn.length; i ++ ){
    console.log(tabBtn.length)
    tabBtn[i].onclick = function(){
        // parentNode  某某的父级    设置在content上
        changeHeight(screen[i], screen[i].parentNode.parentNode)
        // console.log(screen[i], screen[i].parentNode.parentNode)
    }
}


function changeHeight( obj, target ){
    //obj是获取高度的对象
    //target是控制对象
    // 获取外部样式
    target.style.height = obj.offsetHeight + "px"
    // console.log("运行" ,target.style.height, obj.offsetHeight  )
}