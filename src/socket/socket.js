import io from "socket.io-client";

const socket = io("http://localhost:3002", { autoConnect: false });
console.log("scoket");
export default socket;
