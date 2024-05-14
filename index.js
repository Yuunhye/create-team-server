import app from './config/express.js';
import http from "http";
import service from './src/service/service.js';
import members from './public/member.js';

const port = 3000;
const server = http.createServer(app);

//const io = SocketIO(server);
const io = require("socket.io")(server, {
    cors: {
      origin: process.env.FRONT_URI,
      methods: ["GET", "POST"],
      allowedHeaders: ["extra-custom-headers"],
      credentials: true
    },
    allowEIO3: true 
});

io.on("connection", (socket) => {
    socket.on("enter_room", async (roomName, userName, done) => {
        socket.join(roomName);
        socket['roomName'] = roomName;
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

    // //선택된 팀의 코인값을 배팅금액만큼 빼서 알림
    // socket.on("successful_bid", (roomName, userName, coin) => {
    //     io.to(roomName).emit("return_coin", userName, coin)
    // })

    // //낙찰된 멤버를 팀에 추가
    // socket.on("req_add_member", (roomName, team, memberId) => {
    //     io.to(roomName).emit("res_add_member", team, memberId);
    // })

    // //카드에 나타나는 멤버 정보
    // socket.on("req_next_member", (roomName, memberId) => {
    //     io.to(roomName).emit("res_next_member", memberId);
    // })

    //준비 상태 변경
    socket.on("req_change_ready_status", (roomName, userName, status) => {
        io.to(roomName).emit("res_change_ready_status", userName, status)
    })
    
    //랜덤하게 섞인 멤버 정보 반환
    socket.on("req_members_info", (roomName) => {
        io.to(roomName).emit("res_members_info", members);
    })

    //사용자가 나감
    socket.on("disconnect", () => {
        io.to(socket['roomName']).emit("user_disconnecting", socket['userName']);
    })

    //서버 시간 전송
    socket.on("req_server_time", () => {
        const server_time = Date.now();
        socket.emit("res_server_time", server_time);
    })

})


server.listen(port, (req, res) => (console.log(`${port}에서 작동중`)));


module.exports = app;





