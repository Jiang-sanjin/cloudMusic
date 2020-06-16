// 登录


let phone
let password
let phoneInput = $(".register>input")
let passwordInput = $(".password>input")



// 登录

function login(){
    console.log("登录")
    // 获取手机号
    phone = phoneInput.value
    // console.log("手机号",phone)
    
    // 获取密码
    password = passwordInput.value
    // console.log("密码",password)

    fetch("http://localhost:3000/login/cellphone?phone="+phone+"&password=" +password ,{

        method: "get",
        mode: "cors",
        credentials: "include"   //跨域访问

    })
    .then( function(data){
        return data.json()
    })
    .then( function (data){
        console.log("用户信息",data)

        if(data.code == 200){
                // console.log("用户信息",data.code)
                //跳转页面
                window.location.href='home.html?id='+ data.account.id;
                alert("登录成功");
            }
            else{
                confirm("登录失败")
            }
        
    })
    
}





