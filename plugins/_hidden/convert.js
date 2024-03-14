const { Converter } = new(require('@kenss/kenshin-js'))
const { readFileSync: read, unlinkSync: remove, writeFileSync: create } = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { tmpdir } = require('os')
neoxr.create(async (m, {
   client,
   command,
   Func,
   Scraper
}) => {
   try {
      if (m.quoted && typeof m.quoted.buttons != 'undefined' && typeof m.quoted.videoMessage != 'undefined') {
         client.sendReact(m.chat, '🕒', m.key)
         const media = await client.saveMediaMessage(m.quoted.videoMessage)
         const result = Func.filename('mp3')
         exec(`ffmpeg -i ${media} ${result}`, async (err, stderr, stdout) => {
            remove(media)
            if (err) return client.reply(m.chat, Func.texted('bold', `🚩 Conversion failed.`), m)
            let buff = read(result)
            if (/tomp3|toaudio/.test(command)) return client.sendFile(m.chat, buff, 'audio.mp3', '', m).then(() => remove(result))
            if (/tovn/.test(command)) return client.sendFile(m.chat, buff, 'audio.mp3', '', m, {
               ptt: true
            }).then(() => remove(result))
         })
      } else {
         let q = m.quoted ? m.quoted : m
         let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
         if (/audio|video/.test(mime)) {
            client.sendReact(m.chat, '🕒', m.key)
            const buff = await Converter.toAudio(await q.download(), 'mp3')
            if (/tomp3|toaudio/.test(command)) return client.sendFile(m.chat, buff, 'audio.mp3', '', m)
            if (/tovn/.test(command)) {
               const json = await Scraper.uploadImageV2(buff)
               client.sendMessage(m.chat, { audio: { url: json.data.url }, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [0,3,58,44,35,32,2,4,31,35,44,34,48,13,0,54,49,40,1,44,50,51,16,0,3,40,39,46,3,42,38,44,46,0,0,47,0,0,46,19,20,48,43,49,0,0,39,40,31,18,29,17,25,37,51,22,37,34,19,11,17,12,16,19] }, { quoted: m })
            }
         } else {
            client.reply(m.chat, Func.texted('bold', `🚩 This feature only for audio / video.`), m)
         }
      }
   } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['tomp3', 'tovn'],
   use: 'reply audio / video',
   category: 'owner'
}, __filename)