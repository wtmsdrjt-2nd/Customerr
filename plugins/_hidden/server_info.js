neoxr.create(async (m, {
   client,
   command,
   Func
}) => {
   try {
      if (command == 'runtime' || command == 'run') return m.reply(`*Running for : [ ${Func.toTime(process.uptime() * 1000)} ]*`)
      if (command == 'server') {
         const json = await Func.fetchJson('http://ip-api.com/json')
         client.reply(m.chat, Func.jsonFormat(json), m)
      }
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['runtime', 'server'],
   hidden: ['run'],
   category: 'owner'
}, __filename)