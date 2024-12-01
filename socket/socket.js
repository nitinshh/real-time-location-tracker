module.exports = function(io){
    io.on("connection",function(socket){
        const userAgent = socket.handshake.headers['user-agent'];
        console.log(`Device Info: ${userAgent}`);
        socket.on("send-location",async(data)=>{
            try {
                console.log(`data`,data)
                io.emit("location-emit",{id:socket.id,...data})
            } catch (error) {
                console.log("error",error)
                throw error
            }
        });
        socket.on("disconnect",async()=>{
            socket.emit("user-disconnect",socket.id)
        })
    })
}