const socket = io();
const form = document.querySelector("form");
const newli = (text,className)=>{
    let newli = document.createElement("li");
    newli.innerHTML = text;
    newli.setAttribute("class",className);
    document.getElementById("ulid").appendChild(newli);
}
newli("Made by Ezra :) Click me to get projects","git");
newli("You joined the chat","users");
socket.on("new-user",name =>{
    newli(name,"users");
});
form.addEventListener("submit", event=>{
    event.preventDefault();
    socket.emit("texts",{text:form.text.value,name:sessionStorage.getItem("name")});
    newli(`You : ${form.text.value}`,"text");
    form.reset();
});
socket.on("texts",({text,name})=>{
    newli(`${name} : ${text}`,"text");
});
socket.on("left", text => newli(text,"users"));
//git
const git = document.querySelector(".git");
const gitter = document.querySelector("#git");
const clicker = elem =>{
    elem.addEventListener("click",e =>{
        window.location.href = "https://github.com/ACING-TECHNOLOGY/REAL-TIME-CHAT-WEB.git";
    });
}
clicker(git);
clicker(gitter);