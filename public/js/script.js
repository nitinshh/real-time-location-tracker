const socket=io()

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
         const {latitude,longitude} = position.coords
         socket.emit("send-location",{latitude,longitude})
    },(error)=>{
        console.error("error", error);
    },{
        enableHighAccuracy:true,
        timeout:500,
        maximumAge:0, // milliseconds 
    })
}

const map=L.map("map").setView([0,0],16)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attributes:"Shreyians Coding School"
}).addTo(map)

const markers={}

socket.on('location-emit',(data)=>{
    const {id,latitude,longitude} = data;
    // map.setView([latitude,longitude],16) //16 miles
    map.setView([latitude,longitude])

    if(markers[id]){
        markers[id].setLatLng([latitude,longitude])
    }else{
        markers[id]=L.marker([latitude,longitude]).addTo(map)
    }
})

socket.on("user-disconnect",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id])
        delete markers[id]
    }
})