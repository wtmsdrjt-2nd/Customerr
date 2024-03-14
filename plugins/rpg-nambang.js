const timeout = 28800000

neoxr.create(async (m, { client, prefix, text }) => {
  //      let timerand = `${Math.floor(Math.random() * 259200000)}`.trim()
	    let time = global.db.users.find(v => v.jid == m.sender).lastnambang + 28800000
  if (new Date - global.db.users.find(v => v.jid == m.sender).lastnambang< 28800000) throw `Anda sudah menambang\nMohon tunggu hasil pertambangan mu\nTunggu selama ${msToTime(time - new Date())} lagi`
   // if (global.db.data.users[m.sender].aqua > 9) {
   // let aquah = `${Math.floor(Math.random() * 5)}`.trim()
    let berlians = `${Math.floor(Math.random() * 3)}`.trim()
    let emasbiasas = `${Math.floor(Math.random() * 4)}`.trim()
    let emasbatangs = `${Math.floor(Math.random() * 3)}`.trim()
    // global.db.data.users[m.sender].aqua -= aquah * 1
    global.db.users.find(v => v.jid == m.sender).berlian += berlians * 1
    global.db.users.find(v => v.jid == m.sender).emas += emasbiasas * 1
    global.db.users.find(v => v.jid == m.sender).diamond += emasbatangs * 1
    global.db.users.find(v => v.jid == m.sender).tiketcoin += 1
	/*let pisangnye = `${Math.floor(Math.random(global.db.data.users[m.sender].pisang = pisangpoin) * 1)}`.trim()
	let jeruknye = `${Math.floor(Math.random(global.db.data.users[m.sender].jeruk = jerukpoin) * 1)}`.trim()
	let mangganye = `${Math.floor(Math.random(global.db.data.users[m.sender].mangga = manggapoin) * 1)}`.trim()
	let anggurnye = `${Math.floor(Math.random(global.db.data.users[m.sender].anggur = anggurpoin) * 1)}`.trim()
	let apelnye = `${Math.floor(Math.random(global.db.data.users[m.sender].apel = apelpoin) * 10000)}`.trim()*/
	global.db.users.find(v => v.jid == m.sender).lastnambang = new Date * 1
 // else conn.reply(m.chat, 'Minimal 10 Aqua untuk kamu menambang, karena menambang membutuhkan energi, seperti mendapat dia >,,<', m)
  client.reply(m.chat, `Selamat kamu mendapatkan : \n+${berlians} Berlian\n+${emasbiasas} Emas\n+${emasbatangs} Diamond\n\n+1 Tiketcoin`, m)
  setTimeout(() => {
					client.reply(m.chat, `Waktunya nambang lagi kak 😅`, m)
					}, timeout)
}, { 
  usage: ['nambang'],
  category: 'rpg games',
  group: true,
  limit: true,
  game: true
  }, __filename)

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
  
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit " + seconds + " detik"
}
