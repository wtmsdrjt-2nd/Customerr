"use strict";
const cron = require('node-cron'),
   fs = require('fs'),
   FormData = require('form-data'),
   axios = require('axios'),
   component = new(require('@kenss/kenshin-js')),
   { execSync } = require('child_process'),
   { Function: Func, Logs, Scraper } = new(require('@kenss/kenshin-js'))
require('./lib/system/functions')
const moment = require('moment-timezone')
moment.tz.setDefault(global.timezone).locale('id')
const d = new Date(new Date + 3600000)
  let week = d.toLocaleDateString('id', { weekday: 'long' })
  let date = d.toLocaleDateString('id', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
  })
  let time = d.toLocaleTimeString('id')
module.exports = async (client, m, store) => {
   try {
      require('./lib/system/schema')(m)
      const oi = global.db.setting.psn.replace('+tag', `@${m.sender.replace(/@.+/g, '')}`).replace('+name', m.pushName).replace('+today', week + ', ' + date + ', ' + time).replace('+greeting', Func.greeting())
      const isOwner = [global.owner, ...global.db.setting.owners].map(v => v + '@s.whatsapp.net').includes(m.sender)
      const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat) : {}
      const participants = m.isGroup ? groupMetadata.participants : [] || []
      const adminList = m.isGroup ? await client.groupAdmin(m.chat) : [] || []
      const isAdmin = m.isGroup ? adminList.includes(m.sender) : false
      const isBotAdmin = m.isGroup ? adminList.includes((global.client.user.id.split`:` [0]) + '@s.whatsapp.net') : false
      const blockList = typeof await (await client.fetchBlocklist()) != 'undefined' ? await (await client.fetchBlocklist()) : []
      const groupSet = global.db.groups.find(v => v.jid == m.chat),
         chats = global.db.chats.find(v => v.jid == m.chat),
         users = global.db.users.find(v => v.jid == m.sender),
         setting = global.db.setting
      const body = typeof m.text == 'string' ? m.text : false
     // if (!m.fromMe && !chats) return m.reply(`Ada yang bisa saya di bantu kak?`).then(() => require('./lib/system/schema')(m))
      if (!setting.online) await client.sendPresenceUpdate('unavailable', m.chat)
      if (setting.online) await client.sendPresenceUpdate('available', m.chat)
      if (setting.debug && !m.fromMe && isOwner) client.reply(m.chat, Func.jsonFormat(m), m)
      if (m.chat.endsWith('broadcast') && setting.viewstory) await client.readMessages([m.key])
      if (m.chat.endsWith('broadcast') && !/protocol/.test(m.mtype)) global.db.stories.push({
         jid: m.sender,
         msg: m,
         created_at: new Date * 1
      })
      if (m.isGroup) groupSet.activity = new Date() * 1
      if (users) users.lastseen = new Date() * 1
      if (chats) {
         chats.chat += 1
         chats.lastchat = new Date * 1
      }
      const getPrefix = body ? body.charAt(0) : ''
      const prefix = (setting.multiprefix ? setting.prefix.includes(getPrefix) : setting.onlyprefix == getPrefix) ? getPrefix : undefined
      Logs(client, m, prefix)
      if (m.isBot || m.chat.endsWith('broadcast') || body && body == prefix) return
      global.msgs = global.msgs ? global.msgs : []
      global.msgs.push(m)
      global.que = global.que ? global.que : []
      if (m.sender == client.decodeJid(client.user.id) && setting.rmvmsg) global.que.push({
         _id: m.id,
         chat: m.chat,
         created_at: new Date * 1
      })
      const plugins = neoxr.plugins.filter(v => !setting.pluginDisable.includes(v.pluginName))
      const commands = plugins.filter(v => v.usage).map(v => v.usage).concat(plugins.filter(v => v.hidden).map(v => v.hidden)).flat(Infinity)
      const args = body && body.replace(prefix, '').split` `.filter(v => v)
      const command = args && args.shift().toLowerCase()
      const clean = body && body.replace(prefix, '').trim().split` `.slice(1)
      const text = clean ? clean.join` ` : undefined
      const prefixes = setting.multiprefix ? setting.prefix : [setting.onlyprefix]
      const matcher = Func.matcher(command, commands).filter(v => v.accuracy >= 60)
      if (!setting.self && prefix && !commands.includes(command) && matcher.length > 0) return client.reply(m.chat, `🚩 Command you are using is wrong, try the following recommendations :\n\n${matcher.map(v => '➠ *' + (prefix ? prefix : '') + v.string + '* (' + v.accuracy + '%)').join('\n')}`, m)
      if (body && prefix && commands.includes(command) || body && !prefix && commands.includes(command) && setting.noprefix || body && !prefix && commands.includes(command) && global.evaluate_chars.includes(command)) {
         if (setting.error.includes(command) && !setting.self) return client.reply(m.chat, Func.texted('bold', `🚩 Command _${(prefix ? prefix : '') + command}_ disabled.`), m)
         if (!m.isGroup && global.blocks.some(no => m.sender.startsWith(no))) return client.updateBlockStatus(m.sender, 'block')
         neoxr.plugins.map(async cmd => {
            const turn = cmd.usage instanceof Array ? cmd.usage.includes(command) : cmd.usage instanceof String ? cmd.usage == command : false
            const turn_hidden = cmd.hidden instanceof Array ? cmd.hidden.includes(command) : cmd.hidden instanceof String ? cmd.hidden == command : false
            const name = cmd.pluginName
            if (!turn && !turn_hidden) return
            if (setting.self && !['option'].includes(name) && !isOwner && !m.fromMe) return
            if (m.isGroup && ['option'].includes(name) || ['option'].includes(name) && setting.whitelist.includes(m.sender.replace(/@.+/, ''))) return
            if (cmd.owner && !isOwner) return client.reply(m.chat, global.status.owner, m)
            if (cmd.group && !m.isGroup) {
               client.reply(m.chat, global.status.group, m)
               return
            } else if (cmd.botAdmin && !isBotAdmin) {
               client.reply(m.chat, global.status.botAdmin, m)
               return
            } else if (cmd.admin && !isAdmin) {
               client.reply(m.chat, global.status.admin, m)
               return
            }
            if (cmd.private && m.isGroup) return client.reply(m.chat, global.status.private, m)
            cmd.async(m, {
               client,
               args,
               text,
               prefix: prefix ? prefix : '',
               command,
               participants,
               blockList,
               isOwner,
               isAdmin,
               isBotAdmin,
               Func,
               Scraper,
               execSync,
               component,
               store
            })
         })
      } else {
         neoxr.plugins.filter(v => !v.usage).map(async event => {
            if (!m.isGroup && global.blocks.some(no => m.sender.startsWith(no))) return client.updateBlockStatus(m.sender, 'block')
            if (setting.self && !['chatbot', 'system_ev'].includes(event.pluginName) && !isOwner && !m.fromMe) return
            if (!m.isGroup && ['chatbot'].includes(event.pluginName) && body && Func.socmed(body)) return
            if (!m.isGroup && !setting.chatbot && chats && new Date() * 1 - chats.lastreply > global.timer && m.sender != client.decodeJid(client.user.id) && !setting.whitelist.includes(m.sender.replace(/@.+/, ''))) {
               chats.lastreply = new Date * 1
               let p = `📣 Terima kasih telah menghubungi Customer Support, silahkan pilih nomor 1 - 5 sesuai keperluan kamu :\n\n`
              p += `1 – Harga Script Kenshin Premium\n`
              p += `2 – Harga Scraper & Fitur\n`
              p += `3 – Harga Sewa Bot & Paket Premium\n`
              p += `4 – Unblock & Unban\n`
              p += `5 – Transaksi & Metode Pembayaran\n`
              p += `6 – Laporan Error & Request`
               client.sendFile(m.chat, await Func.fetchBuffer('https://telegra.ph/file/def5f60f0ba4a7ba5820e.jpg'), 'menu.jpg', oi, m)
}
            
            if (event.owner && !isOwner) return
            if (event.group && !m.isGroup) return
            if (event.botAdmin && !isBotAdmin) return
            if (event.admin && !isAdmin) return
            if (event.private && m.isGroup) return
            event.async(m, {
               client,
               body,
               participants,
               prefixes,
               isOwner,
               isAdmin,
               isBotAdmin,
               users,
               chats,
               groupSet,
               groupMetadata,
               setting,
               Func,
               Scraper,
               store
               
            })
         })
        }
   } catch (e) {
      console.log(e)
   }
}

Func.reload(require.resolve(__filename))