
module.exports = (app) => {
    const controller = require('../controller/controller');

    //방에 존재하는 사용자 전체 조회
    app.get('/users/:roomName', controller.getUsers);
    //방에 들어온 사용자 등록
    app.post('/room/:roomName/:userName', controller.postUser);
    //특정 방에 사용자가 등록되어 있는지 반환
    app.get('/user/:roomName/:userName', controller.getUserInRoom);
}