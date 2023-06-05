function addFriend() {
    // Obtener valores de la sesión y del formulario
    const mail = sessionStorage.getItem("mail");
    const session = sessionStorage.getItem("session");
    const friend = document.getElementById("friend").value;
  
    // Crear una solicitud HTTP
    const http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/XatLLM/Friend", true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // Enviar la solicitud con los datos del formulario
    http.send(`mail=${mail}&session=${session}&friend=${friend}`);
    // Manejar la respuesta del servidor
    http.onload = function () {
      if (this.readyState == 4 && http.status == 200) {
        const response = http.responseText;
        // Mostrar un mensaje de alerta dependiendo de la respuesta del servidor
        switch (response) {
          case "1":
            alert("Amigo agregado");
            break;
          case "2":
            alert("Amigo no encontrado");
            break;
          case "3":
            alert("La sesión ha expirado");
            break;
          default:
            alert("El servidor no responde");
        }
      }
    };
  }
  
  function goFunctions() {
    // Redirigir al usuario a otra página
    window.location.href =
      "file:///C:/Users/ar_jo/Desktop/Lenguaje_final/js/Functions.js";
  }
  