const {buttons} = require('./mainMenu');

const checkQiwiKeyboard = JSON.stringify({
    inline_keyboard: [
        [{text: '💰 Проверить статус оплаты', callback_data: 'Qiwi check'}]
    ]
})

const adminKeyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '📈 Статистика', callback_data: 'Admin users'}, 
            {text: '🛠️ Редактировать кнопки', callback_data: 'Admin refactor'}],
            [{text: 'Выйти из режима админа', callback_data: 'Admin logout'}]
        ]
    })
}

const adminStatisticKeyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Вернуться в админ панель', callback_data: 'Admin panel'}, 
            {text: 'Выйти из режима админа', callback_data: 'Admin logout'}]
        ]
    })
}

const adminRefactorKeyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Приветственное сообщение', callback_data: 'welcome'}, {text: buttons.button2, callback_data: 'in stock'}],
            [{text: buttons.button3, callback_data: 'delivery'}, {text: buttons.button4, callback_data: 'rules'}],
            [{text: buttons.button5, callback_data: 'help'}, {text: buttons.button6, callback_data: 'status'}],
            [{text: 'Вернуться в админ панель', callback_data: 'Admin panel'}, 
            {text: 'Выйти из режима админа', callback_data: 'Admin logout'}]
        ]
    })
}

const categoriesKeyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'HQD Cuvie 🟡', callback_data: 'Cuvie'}],
            [{text: 'HQD Ultra 🔴', callback_data: 'Ultra'}]
        ]
    })
}

const cuvieKeyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'HQD Cuvie Мята 💰 220 руб ℹ️ В наличии', callback_data: 'Slot 220'}],
            [{text: 'HQD Cuvie Кола 💰 220 руб ℹ️ В наличии', callback_data: 'Slot 220'}],
            [{text: 'HQD Cuvie Вишня 💰 220 руб ℹ️ В наличии', callback_data: 'Slot 220'}],
            [{text: 'HQD Cuvie Дыня 💰 220 руб ℹ️ Скоро будет', callback_data: 'Sold'}],
            [{text: 'HQD Cuvie Клубника 💰 220 руб ℹ️ В наличии', callback_data: 'Slot 220'}],
            [{text: 'HQD Cuvie Банан 💰 220 руб ℹ️ Скоро будет', callback_data: 'Sold'}],
            [{text: 'HQD Cuvie Персик 💰 220 руб ℹ️ В наличии', callback_data: 'Slot 220'}],
            [{text: 'HQD Cuvie Личи 💰 220 руб ℹ️ Скоро будет', callback_data: 'Sold'}],
            [{text: 'HQD Cuvie Лимонный пирог 💰 220 руб ℹ️ В наличии', callback_data: 'Slot 220'}],
            [{text: 'HQD Cuvie Корица 💰 220 руб ℹ️ В наличии', callback_data: 'Slot 220'}],
            [{text: 'HQD Cuvie Жвачка 💰 220 руб ℹ️ В наличии', callback_data: 'Slot 220'}],
        ]
    })
}

const ultraKeyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'HQD Ultra Мята 💰 390 руб ℹ️ Скоро будет', callback_data: 'Sold'}],
            [{text: 'HQD Ultra Кола 💰 390 руб ℹ️ Скоро будет', callback_data: 'Sold'}],
            [{text: 'HQD Ultra Вишня 💰 390 руб ℹ️ В наличии', callback_data: 'Slot 390'}],
            [{text: 'HQD Ultra Дыня 💰 390 руб ℹ️ В наличии', callback_data: 'Slot 390'}],
            [{text: 'HQD Ultra Клубника 💰 390 руб ℹ️ В наличии', callback_data: 'Slot 390'}],
            [{text: 'HQD Ultra Банан 💰 390 руб ℹ️ В наличии', callback_data: 'Slot 390'}],
            [{text: 'HQD Ultra Персик 💰 390 руб ℹ️ В наличии', callback_data: 'Slot 390'}],
            [{text: 'HQD Ultra Личи 💰 390 руб ℹ️ Скоро будет', callback_data: 'Sold'}],
            [{text: 'HQD Ultra Лимонный пирог 💰 390 руб ℹ️ В наличии', callback_data: 'Slot 390'}],
            [{text: 'HQD Ultra Корица 💰 390 руб ℹ️ В наличии', callback_data: 'Slot 390'}],
            [{text: 'HQD Ultra Жвачка 💰 390 руб ℹ️ В наличии', callback_data: 'Slot 390'}],
        ]
    })
}

const count220Keyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1 шт', callback_data: '220-1'}, {text: '2 шт', callback_data: '220-2'}, {text: '6 шт', callback_data: '220-6'},],
        ]
    })
}

const count390Keyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1 шт', callback_data: '390-1'}, {text: '2 шт', callback_data: '390-2'}, {text: '6 шт', callback_data: '390-6'},],
        ]
    })
}

const buy220Keyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Оплатить с помощью QIWI', callback_data: 'Qiwi 220'}],
        ]
    })
}

const buy400Keyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Оплатить с помощью QIWI', callback_data: 'Qiwi 400'}],
        ]
    })
}

const buy1099Keyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Оплатить с помощью QIWI', callback_data: 'Qiwi 1099'}],
        ]
    })
}

const buy390Keyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Оплатить с помощью QIWI', callback_data: 'Qiwi 390'}],
        ]
    })
}

const buy750Keyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Оплатить с помощью QIWI', callback_data: 'Qiwi 750'}],
        ]
    })
}

const buy2099Keyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Оплатить с помощью QIWI', callback_data: 'Qiwi 2099'}],
        ]
    })
}

module.exports = {
    checkQiwiKeyboard,
    adminKeyboard,
    adminRefactorKeyboard,
    adminStatisticKeyboard,
    categoriesKeyboard,
    cuvieKeyboard,
    ultraKeyboard,
    count220Keyboard,
    count390Keyboard,
    buy220Keyboard,
    buy400Keyboard,
    buy1099Keyboard,
    buy390Keyboard,
    buy750Keyboard,
    buy2099Keyboard
};