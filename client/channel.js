const channel =  io("http://localhost:3000/group");
channel.on("connect", () => {
    console.log("Connected!");
    channel.emit("list", {message: "Send channel list"});
    channel.on("list", data => {
        console.log("Channel list:", data);
    })
})