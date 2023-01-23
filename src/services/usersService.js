const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('src/models/users.json');
const db = low(adapter);

const saveUser = (id, username) => {
    if (!db.get("users").find({"id": id}).value()) {
        const users = db.get('users').value();

        users.push({"id": id, "username": username});

        db.get('users').assign({"id": id}).write();
    }
}

const addSale = (id, value) => {
    if (!db.get("sales").find({"id": id}).value()) {
        const sales = db.get("sales").value();

        sales.push({"id": id, "amount": value});

        db.get('sales').assign({"id": id}).write();
    }
}

const getStatistic = async () => {
    const users = await db.get('users').value();
    const sales = await db.get('sales').value();
    let summ = 0;
    for (let bill of sales){
        summ += +bill.amount;
    }

    return {users: users.length, sales: sales.length, summ}
}

module.exports = {saveUser, addSale, getStatistic};