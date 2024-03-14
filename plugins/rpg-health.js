neoxr.create(async (m, { args, prefix, client }) => {
    let user = global.db.users.find(v => v.jid == m.sender)
    if (user.health >= 200) return client.reply(m.chat, `
Your ❤️health is full!
`, m)
    const heal = 50 
    let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((200 - user.health) / heal)))) * 1
    if (user.potion < count) return client.reply(m.chat, `🧃Potion kamu tidak cukup, kamu hanya punya *${user.potion}* 🧃Potion
type *${prefix}.shop buy potion ${count - user.potion}* untuk membeli 🧃Potion
`, m)
    user.potion -= count * 1
    user.health += heal * count
    client.reply(m.chat, `
Berhasil memakai *${count}* 🧃Potion(s)
`, m)
}, { 
  usage: ['heal'],
  category: 'rpg games',
  group: true,
  limit: true,
  game: true
  }, __filename)
  

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}
