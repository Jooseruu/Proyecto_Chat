function listFriends() {
    // Obtener valores de la sesión
    const mail = sessionStorage.getItem("mail");
    const session = sessionStorage.getItem("session");
  
    // Crear una solicitud HTTP
    const http = new XMLHttpRequest();
    http.open(
      "GET",
      `http://localhost:8080/XatLLM/Friend?mail=${mail}&session=${session}`, 
      true
    );
  
    // Manejar la respuesta del servidor
    http.onreadystatechange = function () {
      if (this.readyState == 4 && http.status == 200) {
        // Convertir la respuesta del servidor en un objeto JavaScript
        const listFriends = JSON.parse(http.response);
        // Obtener el elemento de la lista de amigos
        const tab = document.getElementById("tab");
        // Limpiar el contenido de la lista
        tab.innerHTML = "";
  
        // Recorrer la lista de amigos y agregar cada uno a la lista
        for (const friend of listFriends) {
          const option = document.createElement("li");
          option.textContent = JSON.stringify(friend);
          tab.appendChild(option);
        }
      }
    };
    // Enviar la solicitud
    http.send();
  }
  
  function goOptions() {
    // Redirigir al usuario a otra página
    window.location.href =
      "file:///C:/Users/ar_jo/Desktop/Lenguaje_final/html/Functions.html";
  }
  