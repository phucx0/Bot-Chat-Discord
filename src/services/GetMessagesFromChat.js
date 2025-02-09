const getMessagesFromChat = async (page) => {
    const messages = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('[id^="message-content-"]'))
            .slice(-100)
            .map(div => Array.from(div.querySelectorAll('span'))
                .map(span => span.textContent.trim())
                .join(' ')
            )
    });
    const filteredMessages = messages.filter(msg => 
        msg && msg.length !== 1
    )
    return filteredMessages
}
module.exports = {getMessagesFromChat}