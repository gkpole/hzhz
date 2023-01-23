const telegram = require("node-telegram-bot-api");
const { mainMenu, buttons } = require("./src/mainMenu");
const {
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
  buy2099Keyboard,
  adminKeyboard,
  adminRefactorKeyboard,
  adminStatisticKeyboard,
  checkQiwiKeyboard,
} = require("./src/inlineKeyboards");
const { token, adminPassword } = require("./src/config");
const {
  saveUser,
  getStatistic
} = require("./src/services/usersService");
const { changeMsg, getMsg } = require("./src/services/messagesService");
const { qiwiBuy } = require("./src/services/qiwiService");
const qiwiBillPaymentsAPI = require("@qiwi/bill-payments-node-js-sdk");
const { qiwiSecretKey } = require("./src/config");

const bot = new telegram(token, { polling: true });
const qiwiApi = new qiwiBillPaymentsAPI(qiwiSecretKey);
let isAdmin = false;

console.log("Bot started");

const adminChangeMsg = (type, msg) => {
  bot.deleteMessage(msg.from.id, msg.message.message_id, {});
  bot.sendMessage(msg.from.id, "Отправьте сообщение с новым текстом");
  bot.on("message", function changeMsgListener(listener) {
    changeMsg(type, listener.text.toString()).then(() => {
      bot.sendMessage(
        listener.chat.id,
        "Текст изменен, в целях безопасности произведен выход из админ панели"
      );
      isAdmin = false;
      bot.removeListener("message", changeMsgListener);
    });
  });
};

bot.onText(/\/start/, (msg) => {
  saveUser(msg.from.id, msg.from.username);
  getMsg("welcome").then((text) =>
    bot.sendMessage(msg.chat.id, text, mainMenu)
  );
});

bot.onText(/\/admin (.+)/, (msg) => {
  if (msg.text.toString().includes(adminPassword)) {
    isAdmin = true;
    bot.deleteMessage(msg.chat.id, msg.message_id, {});
    bot.sendMessage(msg.chat.id, "Вы вошли в админ панель", adminKeyboard);
  }
});

//Админ панель
bot.on("callback_query", (msg) => {
  if (isAdmin) {
    switch (msg.data) {
      case "Admin panel": {
        bot.deleteMessage(msg.from.id, msg.message.message_id, {});
        bot.sendMessage(msg.from.id, "Админ панель", adminKeyboard);
        break;
      }
      case "Admin logout": {
        bot.deleteMessage(msg.from.id, msg.message.message_id, {});
        isAdmin = false;
        break;
      }
      case "Admin users": {
        getStatistic().then((res) => {
          bot.deleteMessage(msg.from.id, msg.message.message_id, {});
          bot.sendMessage(
            msg.from.id,
            `
🧍‍♂️ Пользователей: ${res.users}
📜 Успешных оплат: ${res.sales}
💰 Общая сумма рублей: ${res.summ}
            `,
            adminStatisticKeyboard
          );
        });
        break;
      }
      case "Admin refactor": {
        bot.deleteMessage(msg.from.id, msg.message.message_id, {});
        bot.sendMessage(
          msg.from.id,
          "Выберите кнопку для редактирования",
          adminRefactorKeyboard
        );
        break;
      }
      case "welcome": {
        adminChangeMsg(msg.data, msg);
        break;
      }
      case "in stock": {
        adminChangeMsg(msg.data, msg);
        break;
      }
      case "delivery": {
        adminChangeMsg(msg.data, msg);
        break;
      }
      case "rules": {
        adminChangeMsg(msg.data, msg);
        break;
      }
      case "help": {
        adminChangeMsg(msg.data, msg);
        break;
      }
      case "status": {
        adminChangeMsg(msg.data, msg);
        break;
      }
      default:
        break;
    }
  }
});

//Главное меню
bot.on("message", (msg) => {
  switch (msg.text.toString()) {
    case buttons.button1: {
      bot.sendMessage(
            msg.from.id,
            `
Укажите ваши контакты.
- телеграм
- номер телефона
- адрес 
            `
          );
      bot.on("message", msg.chat.id);
      bot.sendMessage(msg.chat.id, "Отлично. Выберете категорию", categoriesKeyboard);
      break;
    }
    case buttons.button2: {
      getMsg("in stock").then((text) => bot.sendMessage(msg.chat.id, text));
      break;
    }
    case buttons.button3: {
      getMsg("delivery").then((text) => bot.sendMessage(msg.chat.id, text));
      break;
    }
    case buttons.button4: {
      getMsg("rules").then((text) => bot.sendMessage(msg.chat.id, text));
      break;
    }
    case buttons.button5: {
      getMsg("help").then((text) => bot.sendMessage(msg.chat.id, text));
      break;
    }
    case buttons.button6: {
      getMsg("status").then((text) => bot.sendMessage(msg.chat.id, text));
      bot.on("message", function qiwiCheckListener(listener){
        qiwiApi
        .getBillInfo(listener.text.toString())
        .then((data) => {
          bot.sendMessage(listener.chat.id, data.status.value);
          bot.removeListener("message", qiwiCheckListener);
        })
        .catch(() => {
          bot.sendMessage(listener.chat.id, "Ошибка");
          bot.removeListener("message", qiwiCheckListener);
        });
      });
      break;
    }
    default:
      break;
  }
});

//Выбор товара
bot.on("callback_query", (msg) => {
  switch (msg.data) {
    case "Cuvie":
      bot.deleteMessage(msg.from.id, msg.message.message_id, {});
      bot.sendMessage(msg.from.id, "📃 Категория: HQD Cuvie 🟡", cuvieKeyboard);
      break;
    case "Ultra":
      bot.deleteMessage(msg.from.id, msg.message.message_id, {});
      bot.sendMessage(msg.from.id, "📃 Категория: HQD Ultra 🔴", ultraKeyboard);
      break;
    case "Slot 220":
      bot.deleteMessage(msg.from.id, msg.message.message_id, {});
      bot.sendMessage(
        msg.from.id,
        "📃 Категория: HQD Cuvie 🟡 Выберите количество:",
        count220Keyboard
      );
      break;
    case "Slot 390":
      bot.deleteMessage(msg.from.id, msg.message.message_id, {});
      bot.sendMessage(
        msg.from.id,
        "📃 Категория: HQD Ultra 🔴 Выберите количество:",
        count390Keyboard
      );
      break;
    case "Sold":
      bot.sendMessage(msg.from.id, "Товар распродан! 🚚 Скоро будет завоз");
      break;
    case "220-1":
      bot.deleteMessage(msg.from.id, msg.message.message_id, {});
      bot.sendMessage(
        msg.from.id,
        "📃 Категория: HQD Cuvie 🟡 Количество 1 шт, 💰 Цена: 220 руб",
        buy220Keyboard
      );
      break;
    case "220-2":
      bot.deleteMessage(msg.from.id, msg.message.message_id, {});
      bot.sendMessage(
        msg.from.id,
        "📃 Категория: HQD Cuvie 🟡 Количество 2 шт, 💰 Цена: 400 руб",
        buy400Keyboard
      );
      break;
    case "220-6":
      bot.deleteMessage(msg.from.id, msg.message.message_id, {});
      bot.sendMessage(
        msg.from.id,
        "📃 Категория: HQD Cuvie 🟡 Количество 6 шт, 💰 Цена: 1099 руб",
        buy1099Keyboard
      );
      break;
    case "390-1":
      bot.deleteMessage(msg.from.id, msg.message.message_id, {});
      bot.sendMessage(
        msg.from.id,
        "📃 Категория: HQD Ultra 🔴 Количество 1 шт, 💰 Цена: 390 руб",
        buy390Keyboard
      );
      break;
    case "390-2":
      bot.deleteMessage(msg.from.id, msg.message.message_id, {});
      bot.sendMessage(
        msg.from.id,
        "📃 Категория: HQD Ultra 🔴 Количество 2 шт, 💰 Цена: 750 руб",
        buy750Keyboard
      );
      break;
    case "390-6":
      bot.deleteMessage(msg.from.id, msg.message.message_id, {});
      bot.sendMessage(
        msg.from.id,
        "📃 Категория: HQD Ultra 🔴 Количество 6 шт, 💰 Цена: 2099 руб",
        buy2099Keyboard
      );
      break;
    default:
      break;
  }
});

//QIWI
bot.on("callback_query", (msg) => {
  switch (msg.data) {
    case "Qiwi 220": {
      bot.deleteMessage(msg.from.id, msg.message.message_id, {});
      qiwiBuy(msg, 220, 1, "Cuvie").then((text) =>
        bot.sendMessage(msg.from.id, text, {
          parse_mode: "HTML",
          reply_markup: checkQiwiKeyboard,
        })
      );
      break;
    }
    case "Qiwi 400": {
      bot.deleteMessage(msg.from.id, msg.message.message_id, {});
      qiwiBuy(msg, 400, 2, "Cuvie").then((text) =>
        bot.sendMessage(msg.from.id, text, {
          parse_mode: "HTML",
          reply_markup: checkQiwiKeyboard,
        })
      );
      break;
    }
    case "Qiwi 1099": {
      qiwiBuy(msg, 1099, 6, "Cuvie").then((text) =>
        bot.sendMessage(msg.from.id, text, {
          parse_mode: "HTML",
          reply_markup: checkQiwiKeyboard,
        })
      );
      break;
    }
    case "Qiwi 390": {
      qiwiBuy(msg, 390, 1, "Ultra").then((text) =>
        bot.sendMessage(msg.from.id, text, {
          parse_mode: "HTML",
          reply_markup: checkQiwiKeyboard,
        })
      );
      break;
    }
    case "Qiwi 750": {
      qiwiBuy(msg, 759, 2, "Ultra").then((text) =>
        bot.sendMessage(msg.from.id, text, {
          parse_mode: "HTML",
          reply_markup: checkQiwiKeyboard,
        })
      );
      break;
    }
    case "Qiwi 2099": {
      qiwiBuy(msg, 2099, 6, "Ultra").then((text) =>
        bot.sendMessage(msg.from.id, text, {
          parse_mode: "HTML",
          reply_markup: checkQiwiKeyboard,
        })
      );
      break;
    }
    case "Qiwi check": {
      bot.sendMessage(msg.from.id, "Введите сохраненный ранее id заказа:");
      bot.on("message", function qiwiCheckListener(listener){
        qiwiApi
        .getBillInfo(listener.text.toString())
        .then((data) => {
          bot.sendMessage(listener.chat.id, data.status.value);
          bot.removeListener("message", qiwiCheckListener);
        })
        .catch(() => {
          bot.sendMessage(listener.chat.id, "Ошибка");
          bot.removeListener("message", qiwiCheckListener);
        });
      });
      break;
    }
    default:
      break;
  }
});
