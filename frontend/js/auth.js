function signup(){

let name=document.getElementById("name").value
let email=document.getElementById("email").value
let password=document.getElementById("password").value

if(name=="" || email=="" || password==""){
alert("Please fill all fields")
return
}

let user={
name:name,
email:email,
password:password
}

localStorage.setItem("user",JSON.stringify(user))

alert("Signup Successful")

window.location.href="login.html"

}



// Login

function login(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

let storedUser=JSON.parse(localStorage.getItem("user"))

if(storedUser && storedUser.email===email && storedUser.password===password){

alert("Login Successful")

window.location.href="deshbord.html"

}else{

alert("Invalid Email or Password")

}

}

// logout

function logout(){

localStorage.removeItem("user");

window.location.href="login.html";

}