const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
let uppass = [];
let inpass = [];

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});


signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});
// adding and removing border
function upimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            uppass.splice(uppass.indexOf(element.id), 1);
            // console.log(element.id);
            // console.log(uppass);
        }
        else {
            Image.classList.add('clicked');
            uppass.push(element.id);
            // console.log(element.id);
            // console.log(uppass);
        }
    }
}

function inimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            inpass.splice(inpass.indexOf(element.id), 1);
            // console.log(element.id);
            // console.log(inpass);
        }
        else {
            Image.classList.add('clicked');
            inpass.push(element.id);
            // console.log(element.id);
            // console.log(inpass);
        }
    }
}
// element image recognition
function signup() {
    sessionStorage.setItem("upname", document.getElementById('upmail').value);
    sessionStorage.setItem("uppass", uppass);
    var password = document.getElementById("signup-password").value;
  
    var encryptedUsername = rc4Encrypt(username, password);
    var myText = "Account Created Succesfully";
    alert(myText);
}
// image pattern authentication
var v2 = new Boolean(false);
function signin() {
    let str = document.getElementById('inmail').value;
    let array = sessionStorage.getItem("uppass");
    let check1 = array.localeCompare(inpass.toString());
    if ((!str.localeCompare(sessionStorage.getItem("upname"))) && !check1) {
        var myText = "Login is successful";
        alert(myText);
        NewTab();
        
    }
    else{
        var myText = "Login Failed";
        alert(myText);
   
        sendMail3();
       

    }
}
// RC4 encryption and decryption functions

function rc4Encrypt(text, key) {
    var s = [];
    for (var i = 0; i < 256; i++) {
      s[i] = i;
    }
    
    var j = 0;
    for (var i = 0; i < 256; i++) {
      j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
      var temp = s[i];
      s[i] = s[j];
      s[j] = temp;
    }
    
    var encrypted = "";
    var i = 0;
    var j = 0;
    
    for (var k = 0; k < text.length; k++) {
      i = (i + 1) % 256;
      j = (j + s[i]) % 256;
      var temp = s[i];
      s[i] = s[j];
      s[j] = temp;
      
      var t = (s[i] + s[j]) % 256;
      var cipherChar = String.fromCharCode(text.charCodeAt(k) ^ s[t]);
      encrypted += cipherChar;
    }
    
    return encrypted;
  }
  
  function rc4Decrypt(encryptedText, key) {
    return rc4Encrypt(encryptedText, key);
  }