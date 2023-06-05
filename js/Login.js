// Función para enviar los datos del formulario
function enviar(){
    // Obtenemos los valores de los campos de entrada
    let mail = document.getElementById("mail").value;
    let pass = document.getElementById("pass").value;

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
    document.getElementById("mail").disabled = true;
    document.getElementById("pass").disabled = true;
    document.querySelector("button[type='submit']").innerHTML = "Cargando...";

    // Creamos una nueva solicitud HTTP
    var http = new XMLHttpRequest();
    
    // Abrimos la solicitud con el método GET y la URL especificada
    http.open("GET","http://localhost:8080/XatLLM//Login?mail=" + mail + "&pass="+ pass,true);

    // Cuando la solicitud cambie de estado
    http.onreadystatechange = function(){

        // Si el estado es correcto
        if(this.readyState=== 4 && http.status===200){
            
            // Habilitamos los campos de entrada y ocultamos el indicador de carga
            document.getElementById("mail").disabled = false;
            document.getElementById("pass").disabled = false;
            document.querySelector("button[type='submit']").innerHTML = "Log in";

            // Obtenemos la respuesta de la sesión
            var session =http.responseText;
            
            // Mostramos una alerta con la respuesta de la sesión
            alert(session);
            
            // Si la sesión es verdadera
            if(session !== "false"){
                
                // Guardamos los datos de la sesión en el almacenamiento de sesión
                sessionStorage.setItem("session",session);
                sessionStorage.setItem("mail",mail);
                
                // Redirigimos a la página de opciones
                window.location.href = "file:///C:/Users/ar_jo/Desktop/Lenguaje_final/html/Functions.html";
            } else{
                
                // Mostramos una alerta de sesión interrumpida
                alert("Sesion interrumpida.Vuelva a intentarlo.")
            }
        } else {
            // Habilitamos los campos de entrada y ocultamos el indicador de carga
            document.getElementById("mail").disabled = false;
            document.getElementById("pass").disabled = false;
            document.querySelector("button[type='submit']").innerHTML = "Log in";

            // Mostramos un mensaje de error al usuario
            alert("Ocurrió un error al enviar la solicitud. Por favor intente nuevamente.");
        }
    }
    
    // Enviamos la solicitud
    http.send();
}

// Función para validar el correo electrónico
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Función para ir a la página de registro
function goRegister(){
    
    // Redirigimos a la página de registro
    window.location.href = "file:///C:\Users\ar_jo\Desktop\Lenguaje_final\html\Register.html";
}
