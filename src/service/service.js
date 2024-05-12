const {pool} = require('../../config/db');

const service = {
    retrieveUserList: async (roomName) => {
        const connection = await pool.getConnection(async(conn) => conn);
        const getUserListQuery = `SELECT * FROM Users WHERE room_name = ?`;
        const [userList] = await connection.query(getUserListQuery, roomName);
        connection.release();
        return userList;
    },

    createUser: async (roomName, userName) => {
        try{
            const connection = await pool.getConnection(async(conn) => conn);
            const postUserQuery = `INSERT INTO Users(room_name, user_name) VALUES(?, ?)`;
            const res = await connection.query(postUserQuery, [roomName, userName]);
            connection.release();
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
        
    },
    retrieveUser: async (roomName, userName) => {
        const connection = await pool.getConnection(async(conn) => conn);
        const getUserQuery = `SELECT * FROM Users WHERE room_name=? and user_name=?`;
        const [res] = await connection.query(getUserQuery, [roomName, userName]);
        connection.release();
        return res
    }
}
module.exports = service;