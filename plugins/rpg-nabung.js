const xpperbalance = 1
neoxr.create(async (m, {
   client,
   prefix,
   command,
   args,
   Func
}) => {
   try {
  let count = command.replace(/^saving/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.users.find(v => v.jid == m.sender).balance / xpperbalance) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.users.find(v => v.jid == m.sender).money >= xpperbalance * count) {
    global.db.users.find(v => v.jid == m.sender).money -= xpperbalance * count
    global.db.users.find(v => v.jid == m.sender).bank += count
    client.reply(m.chat, `-Rp.${xpperbalance * count} 💹\n+ ${count} 💳\n\n[ ! ] Succes menabung !`, m)
  } else client.reply(m.chat, `[❗] Uang anda tidak mencukupi untuk menabung ${count} !`, m)

} catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['saving'],
   category: 'rpg games', 
   limit: true,
   group: true,
   game: true
}, __filename)