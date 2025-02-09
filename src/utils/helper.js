const readline = require('readline');
const fs = require('fs');
const winston = require('winston');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask question function
const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

// Sleep function
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Get Json function
const GetJson = () => {
    const data = fs.readFileSync('data/messages.json', 'utf8');
    return JSON.parse(data).response;
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({ filename: 'log/app.log' })
    ]
});

const saveToJSON = (data) => {
    fs.writeFileSync('data/messages.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log("\x1b[32mDữ liệu đã được lưu vào file messages.json\x1b[0m");
}

module.exports = { askQuestion, sleep, GetJson, logger, saveToJSON}