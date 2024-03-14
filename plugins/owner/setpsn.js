neoxr.create(async (m, {
      client,
      text,
      prefix,
      command,
      Func
   }) => {
      try {
         let name = m.pushName
         let setting = global.db.setting
         if (!text) return client.reply(m.chat, gabener(prefix, command), m)
         setting.psn = text
         client.reply(m.chat, Func.texted('bold', `🚩 Auto response Message successfully set.`), m)
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   }, {
   usage: ['setpsn'],
   use: 'text',
   category: 'owner',
   owner: true,
   cache: true,
   private: true,
   }, __filename)

const gabener = (prefix, command) => {
   return `Tidak dapat mengatur pesan kosong! Mungkin ini dapat membantu:

*1.* +tag : tag pengirim pesan.
*2.* +name : menyebut nama pengirim pesan.
*3.* +greeting : menampilkan ucapan sesuai dengan jam.
*4.* +today : menampilkan hari, tanggal, dan waktu hari jni

• *Contoh* : ${prefix + command} Halo +name +tag, +greeting, Saya adalah bot yang siap membantu anda\n+today`
}