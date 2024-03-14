neoxr.create(async (m, {
   client,
   blockList,
   Func
}) => {
   try {
      let users = global.db.users.length
      let chats = global.db.chats.filter(v => v.jid.endsWith('.net')).length
      let groupList = async () => Object.entries(await client.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
      let groups = await (await groupList()).map(v => v.id).length
      let plugins = neoxr.plugins.filter(v => !global.db.setting.pluginDisable.includes(v.pluginName))
      let commands = plugins.filter(v => v.usage).map(v => v.usage).concat(plugins.filter(v => v.hidden).map(v => v.hidden)).flat(Infinity)
      const stats = {
         users,
         chats,
         groups,
         cmd: commands.length,
         blocked: blockList.length,
         receiver: global.db.setting.receiver.length,
         marked: global.db.setting.whitelist.length,
         bots: global.db.bots,
         uptime: Func.toTime(process.uptime() * 1000)
      }
      const system = global.db.setting
      client.sendMessageModify(m.chat, statistic(stats, system, Func), m, {
         largeThumb: true
      })
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['botstat'],
   hidden: ['stat'],
   category: 'owner'
}, __filename)

const statistic = (stats, system, Func) => {
   return ` –  *B O T S T A T*

┌  ◦  ${Func.texted('bold', Func.formatter(stats.groups))} Groups Joined
│  ◦  ${Func.texted('bold', Func.formatter(stats.chats))} Personal Chats
│  ◦  ${Func.texted('bold', Func.formatter(stats.users))} Users In Database
│  ◦  ${Func.texted('bold', Func.formatter(stats.blocked))} Users Blocked
│  ◦  ${Func.texted('bold', Func.formatter(stats.marked))} Users Marked
│  ◦  ${Func.texted('bold', Func.formatter(stats.receiver))} Users Receiver
│  ◦  ${Func.texted('bold', Func.formatter(stats.cmd))} Available Commands
└  ◦  Runtime : ${Func.texted('bold', stats.uptime)}

 –  *S Y S T E M*

┌  ◦  ${Func.texted('bold', system.online ? '[ √ ]' : '[ × ]')}  Always Online
│  ◦  ${Func.texted('bold', system.rmvmsg ? '[ √ ]' : '[ × ]')}  Auto Delete
│  ◦  ${Func.texted('bold', system.chatbot ? '[ √ ]' : '[ × ]')}  Chatbot
│  ◦  ${Func.texted('bold', system.debug ? '[ √ ]' : '[ × ]')}  Debug Mode
│  ◦  ${Func.texted('bold', system.noprefix ? '[ √ ]' : '[ × ]')}  No Prefix
│  ◦  ${Func.texted('bold', system.self ? '[ √ ]' : '[ × ]')}  Self Mode
│  ◦  ${Func.texted('bold', system.viewstory ? '[ √ ]' : '[ × ]')}  Story Viewer
└  ◦  Prefix : ${Func.texted('bold', system.multiprefix ? '( ' + system.prefix.map(v => v).join(' ') + ' )' : '( ' + system.onlyprefix + ' )')}

${global.footer}`
}