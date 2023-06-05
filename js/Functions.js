function goAgregar(){
    window.location.href = "file:///C:\Users\ar_jo\Desktop\Lenguaje_final\html\Friend.html";
}

function goAmigos(){
    window.location.href = "file:///C:\Users\ar_jo\Desktop\Lenguaje_final\html\List.html";
}

function goChat(){
    window.location.href = "file:///C:\Users\ar_jo\Desktop\Lenguaje_final\html\Chat.html";
}

function logOut(){
    sessionStorage.removeItem('session');
    sessionStorage.removeItem('mail');
    window.location.href = "file:///C:\Users\ar_jo\Desktop\Lenguaje_final\html\Login.html";
}