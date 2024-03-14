neoxr.create(async (m, {
   client,
   prefix,
   Func
}) => {
// Fungsi untuk mengubah waktu menjadi format jam:menit:detik
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

// Fungsi untuk memilih secara acak dari daftar
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Daftar nama-nama bos dari anime isekai
const animeIsekaiBossNames = [
  'Demon Lord Vermudol',
  'Giant Spider Queen',
  'White Whale',
  'Shadow of the Colossus',
  'Dragon King Veldora',
  'Witch of Envy Satella',
  'Demon King Darios',
  'Majin Boo',
  'Beast of Calamity Rimuru',
  'Darkness Knight Gulzak',
  'Beast King Gazel',
  'Dragon of Destruction Carrion',
  'Overlord Ainz Ooal Gown',
  'Royal Knight Alice',
  'Beelzebub Lord of the Flies',
  'Beast of Wrath Gaia',
  'Winged Serpent Quetzalcoatl',
  'Ice Wolf Lest',
  'Demon King Leon Cromwell',
  'Storm Dragon Velgrynd'
];

// Inisialisasi data pertarungan bos
const bossData = {
  health: 10000, // Nyawa awal bos
  maxHealth: 10000, // Nyawa maksimal bos
  attack: 500, // Serangan bos
};

  try {
    let user = global.db.users.find(v => v.jid == m.sender)

    // Cek apakah pengguna memiliki cukup kesehatan untuk bertarung
    if (user.health <= 0) {
      client.reply(m.chat, '😓 Nyawa Anda habis. Anda perlu memulihkan nyawa Anda terlebih dahulu.', m);
      return;
    }

    // Cek apakah pengguna sudah bertarung dalam 1 jam terakhir
    if (new Date() - user.lastbossbattle < 3600000) {
      client.reply(m.chat, '⏰ Anda hanya dapat bertarung dengan bos sekali dalam 1 jam.', m);
      return;
    }

    // Lakukan pertarungan dengan bos
    user.lastbossbattle = new Date();

    // Menghitung serangan pengguna
    let sword = user.sword || 0; // Menggunakan sword yang dimiliki oleh pengguna, defaultnya 0 jika tidak punya
    let userAttack = Math.floor(Math.random() * (1000 - sword)) + 1; // Serangan acak antara 1 hingga (1000 - sword)

    // Menghitung serangan bos
    let bossAttack = bossData.attack;

    // Kurangi nyawa bos sesuai dengan serangan pengguna
    bossData.health -= userAttack;

    // Menghitung efek armor pengguna
    let armor = user.armor || 0; // Menggunakan armor yang dimiliki oleh pengguna, defaultnya 0 jika tidak punya

    // Kurangi nyawa pengguna sesuai dengan serangan bos dikurangi efek armor
    let damageToUser = bossAttack - armor;
    if (damageToUser < 0) {
      damageToUser = 0; // Pastikan serangan bos tidak bisa menghasilkan damage negatif
    }
    user.health -= damageToUser;

    // Pesan hasil pertarungan
    let message = `🗡️ Hasil pertarungan dengan bos ${pickRandom(animeIsekaiBossNames)} 🐉:\n\n`;
    message += `❤️ Nyawa pengguna: ${user.health}/${user.maxHealth}\n`;
    message += `❤️ Nyawa bos: ${bossData.health}/${bossData.maxHealth}\n`;

    // Hitung reward dan tambahkan ke pengguna jika bos telah dikalahkan
    if (bossData.health <= 0) {
      let expReward = Math.floor(Math.random() * 100) + 50; // Reward exp acak antara 50 hingga 149
      let moneyReward = Math.floor(Math.random() * 1000) + 500; // Reward money acak antara 500 hingga 1499

      user.exp += expReward;
      user.money += moneyReward;

      message += `\n🎉 Anda menang dalam pertarungan! Bos telah dikalahkan.\n`;
      message += `💰 Anda mendapatkan +${moneyReward} Money\n`;
      message += `🌟 Anda mendapatkan +${expReward} Exp\n`;

      // Anda dapat menambahkan lebih banyak reward atau item di sini sesuai kebutuhan
    } else {
      message += `\n⚔️ Serangan pengguna: ${userAttack}\n`;
      message += `⚔️ Serangan bos: ${bossAttack}\n\n`;
      message += `🔄 Pertarungan berlanjut...`;
    }

    // Batasi penggunaan perintah ini sekali dalam 1 jam
    let cooldown = 3600000; // 1 jam dalam milidetik
    user.bosbattle = new Date() * 1 + cooldown;

    client.reply(m.chat, message, m);
  } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['bosbattle'],
   category: 'rpg games', 
   limit: true,
   group: true,
   game: true
}, __filename)