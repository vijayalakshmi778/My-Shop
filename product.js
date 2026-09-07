function showMessage() {
    let name = "Shameem";
    let message = "Welcome to my website!";
    
    document.getElementById("title").innerHTML = message;
    document.getElementById("title").style.color = "green";
    
    alert("Hello " + name);
}