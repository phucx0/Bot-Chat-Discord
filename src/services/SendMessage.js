const { logger } = require('../utils/helper.js')

const SendMessage = async (content, page) => {
    let isEmpty = await page.evaluate(async () => {
        const selector =  ".emptyText__1464f";
        const inputField = document.querySelector(selector)
        if (!inputField) {
            return false
        }
        return true
    })
    // console.log("isEmpty : ", isEmpty) 
    
    if(isEmpty){
        await page.type(".emptyText__1464f",content)
        await page.keyboard.press('Enter')
        logger.info(`Send message: ${content}`)
    }else{
        // logger.info(`Send message: ${content}`)
        await page.keyboard.press('Enter')
    }
}

module.exports = { SendMessage } 