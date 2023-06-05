function enviarmsg(){
    // Obtener valores de correo electrónico y sesión del almacenamiento de la sesión
    let mail = sessionStorage.getItem("mail");
    let session = sessionStorage.getItem("session");

    // Obtener valores de receptor y mensaje de los elementos de entrada en la página
    let receptor = document.getElementById("receptor").value;
    let sms = document.getElementById("sms").value;

    // Crear un nuevo objeto XMLHttpRequest para enviar una solicitud HTTP
    var http = new XMLHttpRequest();

    // Configurar la solicitud HTTP como una solicitud POST a la URL del servidor de chat
    http.open("POST","http://localhost:8080/XatLLM/Xat",true);

    // Establecer el encabezado "Content-Type" de la solicitud como "application/x-www-form-urlencoded"
    http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

    // Enviar la solicitud HTTP con los datos del correo electrónico, sesión, receptor y mensaje
    http.send("mail=" + mail +"&session=" + session + "&receptor=" + receptor + "&sms="+ sms);

    // Agregar un controlador de eventos para manejar la respuesta de la solicitud HTTP
    http.onload = function(){
        // Verificar si la solicitud fue exitosa
        if(this.readyState== 4 && http.status==200){
        }       
    }
}

function recibirmsg(){
    // Obtener valores de correo electrónico y sesión del almacenamiento de la sesión
    let mail = sessionStorage.getItem("mail");
    let session = sessionStorage.getItem("session");

    // Crear un nuevo objeto XMLHttpRequest para enviar una solicitud HTTP
    var http = new XMLHttpRequest();

    // Configurar la solicitud HTTP como una solicitud GET a la URL del servidor de chat con los parámetros de correo electrónico y sesión
    http.open("GET","http://localhost:8080/XatLLM/Xat?mail=" + mail + "&session="+ session,true);
    
    // Agregar un controlador de eventos para manejar la respuesta de la solicitud HTTP
    http.onreadystatechange = function(){
        // Verificar si la solicitud fue exitosa
        if(this.readyState== 4 && http.status==200){
            // Analizar la respuesta JSON para obtener la lista de amigos
            let listFriends = JSON.parse(http.response);

            // Obtener el elemento de tabla en la página
            let tab = document.getElementById("tab");

            // Limpiar el contenido de la tabla
            tab.innerHTML= "";
            
            // Iterar sobre la lista de amigos utilizando un bucle for...of
            for(let friend of listFriends){
                // Crear un nuevo elemento de lista para cada amigo
                const option = document.createElement("li");

                // Establecer el texto del elemento de lista como el nombre del amigo
                option.textContent = JSON.stringify(friend);

                // Agregar el elemento de lista a la tabla
                tab.appendChild(option);
            }
        }
    }

    // Enviar la solicitud HTTP
    http.send();
}
// Llamar a la función recibirmsg() cada segundo utilizando setInterval()
setInterval(recibirmsg, 100);
