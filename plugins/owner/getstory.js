neoxr.create(async (m, {
   client,
   text,
   Func
}) => {
   try {
      if (m.quoted && m.quoted.chat == 'status@broadcast') return client.copyNForward(m.chat, m.quoted.fakeObj)
      let input = text ? text : m.quoted ? m.quoted.sender : m.mentionedJid.length > 0 ? m.mentioneJid[0] : false
      if (!input) return client.reply(m.chat, Func.texted('bold', `🚩 Mention or reply chat target.`), m)
      let p = await client.onWhatsApp(input.trim())
      if (p.length == 0) return client.reply(m.chat, Func.texted('bold', '🚩 Number not registered on WhatsApp.'), m)
      let jid = client.decodeJid(p[0].jid)
      const stories = global.db.stories.filter(v => v.jid == jid)
      if (stories.length < 1) return client.reply(m.chat, `🚩 She/He has no story.`, m)
      for (let v of stories) {
         await Func.delay(1500)
         client.copyNForward(m.chat, v.msg)
      }
   } catch (e) {
      client.reply(m.chat, `🚩 Can't get stories.`, m)
   }
}, {
   usage: ['getstory'],
   hidden: ['getsw'],
   use: 'mention or reply',
   category: 'owner',
   owner: true
}, __filename)