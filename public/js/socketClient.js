//referencias del HTML
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

const socket = io();

//Listener -> escuchando o esperando: cambios o eventos
socket.on("connect", () => {
  //   console.log("Conectado");
  lblOffline.style.display = "none";
  lblOnline.style.display = "";
  socket.on("chatMessage", (msg) => {
    console.log(`message: ${msg.mensaje}`);
  });
});

socket.on("disconnect", () => {
  //   console.log("Desconectado del servidor");
  lblOnline.style.display = "none";
  lblOffline.style.display = "";
});

socket.on("chatMessage", (payload) => {
  console.log("Wey ya:", payload.mensaje);
});

btnEnviar.addEventListener("click", () => {
  const mensaje = txtMensaje.value;
  const payload = {
    mensaje,
    id: "123ABC",
    fecha: new Date().getTime(),
  };

  socket.emit("chatMessage", payload, (id) => {
    console.log("Desde el server", id);
  });
});
