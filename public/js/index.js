const form = document.querySelector("form");
const socket = io();
form.addEventListener("submit", event =>{
    socket.emit("new-user",form.name.value);
    sessionStorage.setItem("name",form.name.value);
    form.reset();
});