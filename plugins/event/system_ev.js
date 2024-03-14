neoxr.create(async (m, {
   client,
   body,
   isOwner,
   participants,
   users,
   setting,
   Func,
   Scraper
}) => {
   try {
      // Clear DB
      setInterval(async () => {
         let day = 86400000 * 30,
            now = new Date() * 1
         global.db.users.filter(v => now - v.lastseen > day && !v.premium && !v.banned && v.point < 1000000).map(v => {
            let user = global.db.users.find(x => x.jid == v.jid)
            if (user) Func.removeItem(global.db.users, user)
         })
         global.db.chats.filter(v => now - v.lastchat > day).map(v => {
            let chat = global.db.chats.find(x => x.jid == v.jid)
            if (chat) Func.removeItem(global.db.chats, chat)
         })
         global.db.groups.filter(v => now - v.activity > day).map(v => {
            let group = global.db.groups.find(x => x.jid == v.jid)
            if (group) Func.removeItem(global.db.groups, group)
         })
      }, 60_000)

      // Auto Delete Chat Session
      setInterval(async () => {
         const room = global.db.chatroom.find(v => v.jid == m.sender)
         if (room && new Date - room.created_at > 180000) {
            Func.removeItem(global.db.chatroom, room)
         }
      }, 60_000)

      // Auto Delete Message
      setInterval(async () => {
         if (!setting.rmvmsg || global.que.length < 1) return
         const key = global.que.filter(v => new Date - v.created_at > 180000)
         if (key.length < 1) return
         for (let keys of key) {
            await Func.delay(1500)
            Func.removeItem(global.que, keys)
            client.sendMessage(keys.chat, {
               delete: {
                  remoteJid: keys.chat,
                  fromMe: true,
                  id: keys._id,
                  participant: client.decodeJid(client.user.id)
               }
            })
         }
      }, 60_000)
   } catch (e) {
      console.log(e)
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   error: false
}, __filename)