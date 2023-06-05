// Función para registrar un usuario
function registerUser(){

    // Obtenemos los valores de los campos de entrada
    let user = document.getElementById("user").value;
    let mail = document.getElementById("mail").value;
    let pass = document.getElementById("pass").value;
    let codeCountry = document.getElementById("codeCountry").value;

    // Validamos el correo electrónico
    if(!validateEmail(mail)) {
        alert("Por favor ingrese un correo electrónico válido");
        return;
    }

    // Validamos la contraseña
    if(pass.trim() === "") {
        alert("Por favor ingrese una contraseña");
        return;
    }

    // Deshabilitamos los campos de entrada y mostramos un indicador de carga
    document.getElementById("user").disabled = true;
    document.getElementById("mail").disabled = true;
    document.getElementById("pass").disabled = true;
    document.getElementById("codeCountry").disabled = true;
    document.querySelector("button[type='submit']").innerHTML = "Cargando...";
    
    // Mostramos una alerta con los valores obtenidos
    alert(user+mail+pass+codeCountry);
    
    // Creamos una nueva solicitud HTTP
    var http = new XMLHttpRequest();
    
    // Abrimos la solicitud con el método POST y la URL especificada
    http.open("POST","http://localhost:8080/XatLLM/Register",true);
    
    // Establecemos el tipo de contenido de la solicitud
    http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    
    // Enviamos la solicitud con los datos del usuario
    http.send("user=" + user +"&mail=" + mail + "&pass=" + pass + "&codeCountry=" + codeCountry);
    
    // Cuando la solicitud se complete
    http.onload = function(){
        
        // Habilitamos los campos de entrada y ocultamos el indicador de carga
        document.getElementById("user").disabled = false;
        document.getElementById("mail").disabled = false;
        document.getElementById("pass").disabled = false;
        document.getElementById("codeCountry").disabled = false;
        document.querySelector("button[type='submit']").innerHTML = "Register";

        // Si el estado es correcto
        if(this.readyState== 4 && http.status==200){
            
            // Si la respuesta es verdadera
            if(http.responseText === "true"){
                
                // Mostramos una alerta de registro completado
                alert("Registro completado");
                
                // Redirigimos a la página de inicio
                window.location.href = "file:///C:\Users\ar_jo\Desktop\Lenguaje_final\html\Login.html";
            }else{
                
                // Mostramos una alerta de registro no completado
                alert("Registro no competado");
            }
        } else {
            // Mostramos un mensaje de error al usuario
            alert("Ocurrió un error al enviar la solicitud. Por favor intente nuevamente.");
        }
    }
}

// Función para obtener la lista de países
function getCountries(){
    
    // Creamos una nueva solicitud HTTP
    var http = new XMLHttpRequest();
    
    // Abrimos la solicitud con el método GET y la URL especificada
    http.open("GET","http://localhost:8080/XatLLM/Register",true);

    // Cuando la solicitud se complete
    http.onload = function(){
        
        // Si el estado es correcto
        if(this.readyState== 4 && http.status==200){
            
            // Obtenemos la lista de países en formato JSON
            let listCountry = JSON.parse(http.response);
            
            // Obtenemos el elemento select de países
            let selectCountry = document.getElementById("codeCountry");
            
            // Limpiamos el contenido del elemento select
            selectCountry.innerHTML= "";
            
            // Para cada país en la lista
            listCountry.forEach(function(country) {
                
                // Creamos un nuevo elemento option
                const option = document.createElement("option");
                
                // Establecemos el valor y el texto del elemento option
                option.value = country.code;
                option.text = country.name;
                
                // Agregamos el elemento option al elemento select
                selectCountry.appendChild(option);
            });
        }
    }
    
    // Enviamos la solicitud
    http.send();
}

// Función para ir a la página de inicio de sesión
function goLogin(){
    
    // Redirigimos a la página de inicio de sesión
    window.location.href = "file:///C:\Users\ar_jo\Desktop\Lenguaje_final\html\Login.html";
}

// Cuando se carga la página
window.onload = function(){
    
    // Llamamos a la función para obtener la lista de países
    codeCountry();
}

// Función para validar el correo electrónico
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
