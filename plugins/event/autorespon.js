neoxr.create(async (m , {
    body
}) => { 
 try {
  const d = new Date(new Date + 6 * 60 * 60 * 1000); // Menambah 6 jam dari waktu saat ini
  let week = d.toLocaleDateString('id', { weekday: 'long' })
  let date = d.toLocaleDateString('id', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
  })
  let time = d.toLocaleTimeString('id')
  global.db.setting.psn = global.db.setting.psn || ''
  const message = global.db.setting.psn.replace('+tag', `@${m.sender.replace(/@.+/g, '')}`).replace('+name', m.pushName).replace('+today', week + ', ' + date + ', ' + time).replace('+greeting', Func.greeting())
  global.db.users.find(v => v.jid == m.sender).time = global.db.users.find(v => v.jid == m.sender).time || 0
  let waktu = global.db.users.find(v => v.jid == m.sender).time
  let cur = global.db.users.find(v => v.jid == m.sender).time + 6 * 60 * 60 * 1000; // Menambah 6 jam dari waktu terakhir respons
  if (m.text && (!waktu || waktu == 0 || cur - new Date() <= 0 )) {
    global.db.users.find(v => v.jid == m.sender).time = new Date * 1
    m.reply(message)
    }
    } catch (e) {
    }
  }, {
  cache: true,
  error: false,
  private: true,
}, __filename)