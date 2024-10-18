const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const bot = new TelegramBot(process.env.BOT_TOKEN);

const sendNotification = async (message) => {
    try {
      await bot.sendMessage(process.env.CHAT_ID, message);
      console.log('Successfully sent notification:', message);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
module.exports =  sendNotification;