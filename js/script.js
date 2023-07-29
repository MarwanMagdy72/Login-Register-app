///////Login And Rester Pages////////////////////////
var signInLink = document.getElementById('signIn');
var signInPage = document.getElementById('signInPage');
var signUpLink = document.getElementById('signUp');
var signUpPage = document.getElementById('signUpPage');
var passLogin = document.getElementById('passLogin');
var emailLogin = document.getElementById('emailLogin');
var emailRegister = document.getElementById('emailRegister');
var nameUser = document.getElementById('userName');
var registerBtn= document.getElementById('register');
var loginBtn= document.getElementById('login');
var passRegister1 = document.getElementById('passRegister1');
var passRegister2 = document.getElementById('passRegister2');


var registerList=[];

if(localStorage.getItem('user') == null){
    registerList=[];

}else{
    registerList = JSON.parse(localStorage.getItem('user'))
}

// To Check If SinUp Inputs Empty Or Not
function emptySignUp(){
    if(nameUser.value == '' || emailRegister.value == ''  || passRegister1.value == '' || passRegister2.value == ''){
        return false;

    }else{
        return true ;
    }
}

// To Check If SinIn Inputs Empty Or Not
function emptySignIn(){
    if(emailLogin.value=='' || passLogin.value==''){
        return false;
    }else{
        return true;
    }
}

// To Check If Entered Email Used Before Or Not
function existEmail(){
    for(var i =0 ; i<registerList.length ; i++){
        if(emailRegister.value == registerList[i].userEmail ){
            return false;
        }
        else{
            return true;
        }
    }
}
// To Check Pass1 == pass2 In SignUp
function matchPass(){
    for(var i =0 ; i<registerList.length ; i++){
        if( passRegister1.value == passRegister2.value){
            return true;
        }
        else{
            return false ;
        }
    }
}

// To empty all inputs
function reset(){
    nameUser.value='';
    emailRegister.value='';
    passRegister1.value='';
    passRegister2.value='';
    emailLogin.value='';
    passLogin.value='';
}

var matchPassword = document.getElementById('matchPass');
var message1 = document.getElementById('message1');

function createUser(){
    if(emptySignUp() == false){
        document.getElementById('message1').innerHTML='all inputs are required !'
        return false;
    }

        if( validUserName() == true && validEmail() == true){
            if(existEmail() == false){
                message1.innerHTML='This Email Entered Before , Please Try Anothre One  '
            }else if(matchPass() == false ){

                message1.innerHTML =  `Two Passwords Dosen't Matched !`;
            }
            else {
                
                // Create Object For New User's Data

                var user = {
                    userName: nameUser.value ,
                    userEmail: emailRegister.value,
                    pass1: passRegister1.value,
                    pass2: passRegister2.value
                    
                };
                registerList.push(user);
                localStorage.setItem('user' , JSON.stringify(registerList));
                console.log(registerList);
                reset();
                signInPage.classList.replace('d-none' , 'd-block');
                signUpPage.classList.replace('d-block' , 'd-none');
                message1.classList.replace('d-block' , 'd-none');
            }
        }else{
            Swal.fire({
                type: "error",
                title: "Not Valid Email OR Password !",
                text: `Make Sure That You Entered A Valid E-mail , Password and UserName`
              });
        }             
}

 
registerBtn.addEventListener('click' , function(){ 
    createUser();
})
// localStorage.clear();

function loginUser(){

    if(emptySignIn() == false){
        document.getElementById('message').innerHTML='all inputs are required !'
        return false;
    }
    var email = emailLogin.value; 
    var pass = passLogin.value ;

    for(var i =0 ; i<registerList.length ; i++){
        if(email == registerList[i].userEmail && pass == registerList[i].pass1){
            window.location.href = ('helloUser.html');
        }
        else{
            Swal.fire({
                type: "error",
                title: " Incorrect Email OR Password",
                text: `Make Sure That Password And Email Are Correct`
              });        }
        break;
    }
}


loginBtn.addEventListener('click' , function(){
    loginUser();
})

// To go from signUp To signIn Page
signInLink.addEventListener('click' , function(){
signInPage.classList.replace('d-none' , 'd-block')
signUpPage.classList.replace('d-block' , 'd-none')
})

// To go from signIn To signUp Page
signUpLink.addEventListener('click' , function(){
signInPage.classList.replace('d-block' , 'd-none')
signUpPage.classList.replace('d-none' , 'd-block')
})


// Validate Inputs 

function validUserName(){
var regex = /^[a-zA-Z\-]+$/;
return regex.test(nameUser.value);
}

function validEmail(){
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(emailRegister.value);
}
