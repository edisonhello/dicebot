const config = require('./config.json')
const fs = require('fs')
const colors = require('colors/safe')

const Linebot = require('linebot')
const express = require('express')
const app = express()
const parsedice = require('./parsedice.js')

const linebot = Linebot({
    channelId: config.channelID,
    channelSecret: config.channelSecret,
    channelAccessToken: config.channelAccessToken
})
const linebotParser = linebot.parser()
app.post('/', linebotParser)

function writelog(e, a, b, c, d){
    let time = '['+(new Date()).toLocaleTimeString('en-US', { hour12: false })+']'
    let tag = '[' + e + ']'
    if(e == "NMSG") console.log(colors.cyan(time), colors.green(tag), 'from', colors.magenta(b), '(', a, ')')
    else if(e == "INFO") console.log(colors.cyan(time), colors.green(tag), a)
    else if(e== "MSG") console.log(colors.cyan(time), colors.green(tag), colors.magenta(a) + ' : ' + b)
}

const port = config.port || 3000
app.listen(port, () => writelog('INFO', 'server is running at port ' + port))

linebot.on('message', e => {
    if(e.type !== 'message') return
    parsedice(e)
})
