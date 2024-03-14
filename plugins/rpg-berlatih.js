neoxr.create(async (m, {
   client,
   prefix,
   Func
}) => {
   try {
// Fungsi untuk mengubah waktu menjadi format jam:menit:detik
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

let user = global.db.users.find(v => v.jid == m.sender)

    // Cek apakah pengguna sudah bertarung dalam 1 jam terakhir
    if (new Date() - user.lastpractice < 3600000) {
      client.reply(m.chat, '🕒 Anda hanya dapat berlatih sekali dalam 1 jam.', m);
      return;
    }

    // Lakukan latihan
    user.lastpractice = new Date();

    // Hitung serangan pengguna (diubah sesuai kebutuhan)
    let userAttack = Math.floor(Math.random() * 100) + 50; // Serangan acak antara 50 hingga 149

    // Kalkulasi penambahan kesehatan pengguna
    let healthIncrease = userAttack * 3;

    // Tambahkan kesehatan baru ke pengguna
    user.health += healthIncrease;

    // Pesan hasil latihan
    let message = `🏋️ Anda sedang berlatih dan mendapatkan peningkatan kesehatan:\n\n`;
    message += `❤️ Kesehatan pengguna sekarang: ${user.health}\n`;
    message += `⚔️ Serangan yang dihasilkan: ${userAttack}\n`;
    message += `🔄 Anda dapat berlatih lagi dalam 1 jam.\n`;

    client.reply(m.chat, message, m);
  } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['berlatih'],
   category: 'rpg games', 
   limit: true,
   group: true,
   game: true
}, __filename)