const buttons = {
    button1: '💸 Купить HQD',
    button2: '📜 Наличие товара',
    button3: '🚚 Доставка',
    button4: '🔥 Правила',
    button5: 'ℹ️ Помощь',
    button6: '💰 Проверить статус оплаты'
}

const mainMenu = {
    reply_markup: JSON.stringify({
        keyboard: [
            [{text: buttons.button1}, {text: buttons.button2}],
            [{text: buttons.button3}, {text: buttons.button4}],
            [{text: buttons.button5}, {text: buttons.button6}]
        ]
    })
}

module.exports = {mainMenu, buttons};
