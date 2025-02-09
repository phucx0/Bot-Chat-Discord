const puppeteer = require('puppeteer');
const { getMessagesFromChat } = require('./services/GetMessagesFromChat.js');
const { LoginDiscord } = require('./services/LoginDiscord.js');
const { SendMessage } = require('./services/SendMessage.js');
const { askQuestion, logger, saveToJSON } = require('./utils/helper.js');

let interval = null

const Menu_1 = `
\x1b[31m================ MENU =================\x1b[0m
\x1b[33m1. Start Chat
2. Stop Chat
3. Get messages from Chat
4. Change channel URL
0. STOP
\x1b[31m=======================================\x1b[0m
`

const startChat = (timeDelay, page) => {
    if(interval){
        console.log("\x1b[31mChat is running! \x1b[0m")
        return
    }
    console.log("\x1b[32mChat started! \x1b[0m")
    interval = setInterval(async () => {
        await SendMessage("Hello World!", page)
    }, timeDelay * 1000);
}

const stopChat = () => {
    if(interval){
        clearInterval(interval)
        interval = null
        console.log("\x1b[31mChat stopped! \x1b[0m")
    }
    else{
        console.log("\x1b[31mChat is not running! \x1b[0m")
    }
}

async function startBrowser(){
    console.log("\x1b[32mBrowser is running! \x1b[0m")
    browser = await puppeteer.launch({ 
        headless: false,
    });
    
    return browser
}

const START_SERVER = async () => {
    let browser = null
    let page = null
    try{
        browser = await startBrowser()
        if (!browser) throw new Error("Cannot start browser!");

        page = await browser.newPage()
    }catch(e){
        console.log(`\x1b[31m ${e} \x1b[0m`)
        logger.error(e)
    }

    await LoginDiscord(page)

    let urlChannel = await askQuestion("Enter the channel URL: ")
    await page.goto(urlChannel, {waitUntil : 'load'});
    console.log("\x1b[32mChannel loaded! \x1b[0m")
    
    do{
        try{
            console.log(`${Menu_1}`)
            const choice = await askQuestion("Enter your choice: ")
            switch(parseInt(choice)){
                case 0:
                    console.log("\x1b[31mSTOP! \x1b[0m")
                    process.exit(0)
                case 1:
                    const timeDelay = await askQuestion("Enter the time delay (s): ")
                    startChat(timeDelay, page)
                    break
                case 2: 
                    stopChat()
                    break;
                case 3:
                    const data = await getMessagesFromChat(page)
                    saveToJSON(data)
                    // console.log("\x1b[32mMessages: \x1b[0m", data)
                    break              
                case 4:
                    urlChannel = await askQuestion("Enter the channel URL: ")
                    await page.goto(urlChannel, {waitUntil : 'load'});
                    console.log("\x1b[32mChannel loaded! \x1b[0m")
                    break
                default:
                    console.log("\x1b[31mInvalid choice! \x1b[0m")
            }
        }
        catch(e){ 
            console.log(`\x1b[31m ${e} \x1b[0m`)
            logger.error(e)
        }
    }
    while(true)
}

START_SERVER()