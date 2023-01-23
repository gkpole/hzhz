const qiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');
const {qiwiSecretKey, qiwiPublicKey, botId,} = require("../config");
const { addSale } = require('./usersService');

const qiwiApi = new qiwiBillPaymentsAPI(qiwiSecretKey);

const createQiWiForm = (amount, account, comment, lifetime) => {
    const billId = (account + Math.random().toString(16)).replace('.', '-');
    const params = {
        publicKey: qiwiPublicKey,
        billId,
        amount,
        account,
        comment,
        lifetime,
        successUrl: `https://t.me/${botId}`
    }
    return { qiwiLink: qiwiApi.createPaymentForm(params), qiwiBillId: billId };
}

const qiwiBuy = async (msg, amount, count, type) => {
            const qiwiForm = await createQiWiForm(
                amount,
                msg.from.id,
                `Заказ №${msg.message.message_id} HQD ${type} ${count}шт. Модель товара и адрес доставки у вас уточнит менеджер в течение 3 часов`
            );

            setTimeout(() => {
                qiwiApi.getBillInfo(qiwiForm.qiwiBillId).then((data) => {
                    if (data.status.value === 'PAID') {
                        addSale(qiwiForm.qiwiBillId, data.amount.value);
                        console.log('Прошла оплата на сумму: ' + data.amount.value);
                    } else {
                        qiwiApi.cancelBill(qiwiForm.qiwiBillId);
                    }
                }).catch((err) => {
                    console.log('Ошибка при проверке оплаты: ' + err);
                    qiwiApi.cancelBill(qiwiForm.qiwiBillId);
                });
            }, 900000);

            return `
➖➖➖➖➖➖➖➖➖➖➖
<a href="${qiwiForm.qiwiLink}">Перейти к форме оплаты</a>
➖➖➖➖➖➖➖➖➖➖➖
🕒 У вас есть 15 минут для оплаты заказа
💸 После оплаты с вами свяжется наш менеджер в течение 3 часов 
🚚 Он уточнит ваш номер заказа, модель товара и адрес доставки
📈 Чтобы проверить статус заказа после оплаты, сохраните этот id: <strong>${qiwiForm.qiwiBillId}</strong>
            `
}

module.exports = {qiwiBuy};