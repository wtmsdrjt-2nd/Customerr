const timeout = 600000
neoxr.create(async (m, { client, prefix, text }) => {
	                                 let aqua = global.db.users.find(v => v.jid == m.sender).aqua
	                                 let time = global.db.users.find(v => v.jid == m.sender).lastnebang + 3600000
                                     if (aqua == 0) return m.reply(`*Pastikan kamu memiliki semua aqua*\nKetik :\n${prefix}shop buy aqua 5`)
                                     if (new Date - global.db.users.find(v => v.jid == m.sender).lastnebang< timeout) m.reply(`Anda sudah menebang\nMohon tunggu hasil tebangan mu\nTunggu selama ${msToTime(time - new Date())} lagi`)
                                     if (global.db.users.find(v => v.jid == m.sender).aqua > 9) {
                                     let kayus = `${Math.floor(Math.random() * 1000)}`.trim()
                                     let aquas = `${Math.floor(Math.random() * 10)}`.trim()
                                     global.db.users.find(v => v.jid == m.sender).kayu += kayus * 1
                                     global.db.users.find(v => v.jid == m.sender).tiketcoin += 1
                                     global.db.users.find(v => v.jid == m.sender).aqua  -= aquas * 1
                                     global.db.users.find(v => v.jid == m.sender).lastnebang = new Date * 1
                                     client.reply(m.chat, `Selamat kamu mendapatkan : \n+${kayus} Kayu\n+1 Tiketcoin\n\nKamu sudah menghabiskan aqua\n-${aquas} Aqua`, m)
                                     setTimeout(() => {
					                      client.reply(m.chat, `Waktunya nebang pohon lagi kak 😅`, m)
					                  }, timeout)
                              } else m.reply(`Pastikan aqua kamu *10* untuk bisa nebang, Karena menguras tenaga`)
                         }, { 
                          usage: ['nebang'],
                          category: 'rpg games',
                          limit: true,
                          group: true,
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