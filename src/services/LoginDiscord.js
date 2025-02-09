const { askQuestion } = require('../utils/helper.js')

async function LoginDiscord(page){

    await page.goto('https://discord.com/login', {waitUntil : 'load'});
    console.log("\x1b[32mLogin Discord! \x1b[0m")

    const token = await askQuestion("Enter your token: ")
    const result = await page.evaluate((token) => {
        try{
            setInterval(() => {
                document.body.appendChild(document.createElement `iframe`).contentWindow.localStorage.token = `"${token}"`;
            }, 50);
            setTimeout(() => {
                location.reload();
            }, 2500);
            return true
        }
        catch(e){
            console.log(e)
            return false
        }
    }, token);
    return result
}

module.exports = { LoginDiscord }

