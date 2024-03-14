neoxr.create(async (m, {
   client,
   text,
   prefix,
   command,
   Func
}) => {
   try {
      if (!m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Reply to a message to use this command.`), m)
      if (m.quoted && m.quoted.msg && m.quoted.msg.viewOnce) {
         let media = await client.downloadMediaMessage(m.quoted.msg)
         if (/image/.test(m.quoted.mtype)) {
            client.sendFile(m.chat, media, Func.filename('jpg'), '', m)
         } else if (/video/.test(m.quoted.mtype)) {
            client.sendFile(m.chat, media, Func.filename('mp4'), '', m)
         }
      }
   } catch (e) {
      console.log(e)
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['rvo'],
   use: 'reply viewonce',
   category: 'owner',
   owner: true
}, __filename)