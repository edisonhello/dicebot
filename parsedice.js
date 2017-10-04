function dice(dices, faces){
    dices = parseInt(dices)
    faces = parseInt(faces)

    let result = []
    for(let i=0;i<dices;i++) result.push(Math.ceil(Math.random() * faces))
    let total = 0
    for(let i in result) total += result[i]

    return [result, total]
}
function notalldigit(str){
    for(let i in str) if(str[i] < '0' || str[i] > '9') return true
    return false
}
module.exports = (e) => {
    let str = e.message.text
    str = str.toLowerCase()
    
    let dat = str.indexOf('d')
    if(dat === -1) return

    let dices = str.substr(0, dat)
    let faces = str.substr(dat+1, str.length)

    let pat = faces.indexOf('+')
    let reply = ""
    if(pat !== -1){
    console.log('meow')
        let offset = faces.substr(pat+1, faces.length)
        faces = faces.substr(0, pat)

        if(notalldigit(dices) || notalldigit(faces) || notalldigit(offset)) return

        offset = parseInt(offset)

        let dicedata = dice(dices, faces)
        reply = str + ' : \n[ ' + dicedata[0].toString() + ' ] + ' + offset + ' -> ' + (dicedata[1] + offset)
    }
    else{
        if(notalldigit(dices) || notalldigit(faces)) return

        let dicedata = dice(dices, faces)
        reply = str + ' : \n[ ' + dicedata[0].toString() + ' ] -> ' + dicedata[1]
    }
    e.reply(reply)
}
