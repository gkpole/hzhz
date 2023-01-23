const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('src/models/messages.json');
const db = low(adapter);

const changeMsg = async (type, newMsg) => {
    await db.set(type, newMsg.toString()).write();
}

const getMsg = async (type) => {
    const msg = await db.get(type).value();
    return msg;
}

module.exports = {changeMsg, getMsg};