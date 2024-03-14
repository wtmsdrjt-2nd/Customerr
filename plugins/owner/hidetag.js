neoxr.create(async (m, {
   client,
   text,
   participants,
   Func
}) => {
   try {
      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || q.mtype || ''
      let member = participants.map(v => v.id)
      if (text) {
         client.reply(m.chat, text, null, {
            mentions: member
         })
      } else if (/extended|conver/.test(mime)) {
         client.reply(m.chat, q.text, null, {
            mentions: member
         })
      } else if (/video|image\/(jpe?g|png)/.test(mime)) {
         let media = await q.download()
         let caption = q.text || ''
         client.sendFile(m.chat, media, '', caption, null, null, {
            contextInfo: {
               mentionedJid: member
            }
         })
      } else if (/audio/.test(mime)) {
         let media = await q.download()
         let caption = q.text || ''
         client.sendFile(m.chat, media, '', '', null, {
            ptt: true
         }, {
            contextInfo: {
               mentionedJid: member
            }
         })
      } else if (/image\/webp/.test(mime)) {
         let media = await q.download()
         client.sendSticker(m.chat, media, null, {
            packname: global.db.setting.sk_pack,
            author: global.db.setting.sk_author,
            mentions: member
         })
      } else return client.reply(m.chat, Func.texted('bold', `🚩 Media / text not found or media is not supported.`), m)
   } catch (e) {
      console.log(e)
      client.reply(m.chat, Func.texted('bold', `🚩 Media / text not found or media is not supported.`), m)
   }
}, {
   usage: ['hidetag'],
   hidden: ['o'],
   use: 'text',
   category: 'owner',
   owner: true,
   group: true
}, __filename)