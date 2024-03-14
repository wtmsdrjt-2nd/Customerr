const { Function: Func } = new(require('@kenss/kenshin-js'))
const fs = require('fs')

module.exports = client => {


  client.parseMention = (text = '') => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }
    
    
    
   client.sendMessageVerify = async (jid, text, thumb, caption) => {
      let location = {
         key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(jid ? {
               remoteJid: 'status@broadcast'
            } : {})
         },
         message: {
            "locationMessage": {
               "name": caption || Func.makeId(20),
               "jpegThumbnail": await Func.createThumb(thumb ? await Func.fetchBuffer(thumb) : await Func.fetchBuffer('https://telegra.ph/file/af0a64ab57ea2872bf2ca.jpg'))
            }
         }
      }
      return client.sendMessageModify(jid, text, location, {
         ads: false,
         largeThumb: true
      })
   }
}