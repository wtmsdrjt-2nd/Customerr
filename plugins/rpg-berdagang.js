neoxr.create(async (m, {
   client,
   prefix,
   Func
}) => {
   try {
let dapat = (Math.floor(Math.random() * 5000))
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) m.reply('• *Example :* .berdagang @user')
  if (typeof global.db.users.find(v => v.jid == who) == 'undefined') m.reply('Pengguna tidak ada didalam data base')
  let __timers = (new Date - global.db.users.find(v => v.jid == m.sender).lastdagang)
  let _timers = (28800000 - __timers) 
  let timers = clockString(_timers)
  let users = global.db.users
  let username = client.getName(who)
  if (new Date - global.db.users.find(v => v.jid == m.sender).lastdagang > 28800000){
  if (4999 > users.find(v => v.jid == who).balance) m.reply('Target tidak memiliki modal harap masukkan modal 5000')
  if (4999 > users.find(v => v.jid == m.sender).balance) m.reply('kamu tidak memiliki modal harap masukkan modal 5000')
  users.find(v => v.jid == who).balance -= dapat * 1
 users.find(v => v.jid == m.sender).balance -= dapat * 1
  global.db.users(v => v.jid == m.sender).lastdagang = new Date * 1
  client.reply(m.chat, `Mohon tunggu kak..\nKamu dan @${who.split`@`[0]} sedang berdagang.. 😅\n\nKamu dan @${who.split`@`[0]} meletakkan modal -${dapat} 😅`, m)
  setTimeout(() => {
					client.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan balance..\n\nPenghasilan dagang kamu didapatkan +5000\n${users.find(v => v.jid == m.sender).balance += 5000} balance kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users.find(v => v.jid == who).balance += 5000} balance @${who.split`@`[0]}`, m)
					}, 3600000)
  setTimeout(() => {
					client.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan balance..\n\nPenghasilan dagang kamu didapatkan +5000\n${users.find(v => v.jid == m.sender).balance += 5000} balance kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users.find(v => v.jid == who).balance += 5000} balance @${who.split`@`[0]}`, m)
					}, 7200000)
  setTimeout(() => {
					client.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan balance..\n\nPenghasilan dagang kamu didapatkan +5000\n${users.find(v => v.jid == m.sender).balance += 5000} balance kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users.find(v => v.jid == who).balance += 5000} balance @${who.split`@`[0]}`, m)
					}, 10800000)
  setTimeout(() => {
					client.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan balance..\n\nPenghasilan dagang kamu didapatkan +5000\n${users.find(v => v.jid == m.sender).balance += 5000} balance kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users.find(v => v.jid == who).balance += 5000} balance @${who.split`@`[0]}`, m)
					}, 14400000)
  setTimeout(() => {
					client.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan balance..\n\nPenghasilan dagang kamu didapatkan +5000\n${users.find(v => v.jid == m.sender).balance += 5000} balance kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users.find(v => v.jid == who).balance += 5000} balance @${who.split`@`[0]}`, m)
					}, 18000000)
  setTimeout(() => {
					client.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan balance..\n\nPenghasilan dagang kamu didapatkan +5000\n${users.find(v => v.jid == m.sender).balance += 5000} balance kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users.find(v => v.jid == who).balance += 5000} balance @${who.split`@`[0]}`, m)
					}, 21600000)
  setTimeout(() => {
					client.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan balance..\n\nPenghasilan dagang kamu didapatkan +5000\n${users.find(v => v.jid == m.sender).balance += 5000} balance kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users.find(v => v.jid == who).balance += 5000} balance @${who.split`@`[0]}`, m)
					}, 25200000)
  setTimeout(() => {
					client.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan balance..\n\nPenghasilan dagang kamu didapatkan +10000\n${users.find(v => v.jid == m.sender).balance += 10000} balance kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +10000\n${users.find(v => v.jid == who).balance += 10000} balance @${who.split`@`[0]}`, m)
					}, 28800000)
}else client.reply(m.chat, `Anda Sudah Berdagang , tunggu ${timers} lagi..`, m)

} catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['berdagang'],
   use: '@tag',
   category: 'rpg games', 
   limit: true,
   group: true,
   game: true
}, __filename)


function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}