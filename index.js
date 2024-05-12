import app from './config/express.js';
import http from "http";
import service from './src/service/service.js';


const port = 3000;
const server = http.createServer(app);

//const io = SocketIO(server);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
      allowedHeaders: ["extra-custom-headers"],
      credentials: true
    },
    allowEIO3: true 
});

io.on("connection", (socket) => {
    socket.on("enter_room", async (roomName, userName, done) => {
        socket.join(roomName);
        socket['userName'] = userName;
        if (userName != "관리자"){
            const res = await service.retrieveUser(roomName,userName);
            if(res.length == 0){
                io.to(roomName).emit("join", userName);
                await service.createUser(roomName, userName);
            } 
        }
        done();
        //socket.to(userName).emit("welcome");
    })
    socket.on("send_message", (roomName, message) => {
        io.to(roomName).emit("get_message", socket["userName"], message);
    })

    //선택된 팀의 코인값을 배팅금액만큼 빼서 알림
    socket.on("successful_bid", (roomName, userName, coin) => {
        io.to(roomName).emit("return_coin", userName, coin)
    })

    //낙찰된 멤버를 팀에 추가
    socket.on("req_add_member", (roomName, team, memberId) => {
        io.to(roomName).emit("res_add_member", team, memberId);
    })

    //카드에 나타나는 멤버 정보
    socket.on("req_next_member", (roomName, memberId) => {
        io.to(roomName).emit("res_next_member", memberId);
    })

})


server.listen(port, (req, res) => (console.log(`${port}에서 작동중`)));


module.exports = app;

// app.listen(3000, (req, res) => {console.log(`${port}에서 작동중`)});





