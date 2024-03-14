neoxr.create(async (m, {
   client,
   args,
   prefix,
   command,
   Func
}) => {
   try {
      let system = global.db.setting
         if (!args || !args[0]) return client.reply(m.chat, Func.example(prefix, command, '#'), m)
         if (args[0].length > 1) return client.reply(m.chat, Func.texted('bold', `🚩 Enter only 1 prefix.`), m)
         if (evaluate_chars.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak bisa menggunakan prefix ${args[0]} karena akan terjadi error.`), m)
         if (args[0] == system.prefix) return client.reply(m.chat, Func.texted('bold', `🚩 Prefix ${args[0]} is currently used`), m)
         system.onlyprefix = args[0]
         client.reply(m.chat, Func.texted('bold', `🚩 Prefix successfully changed to : ${args[0]}`), m)
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['prefix'],
   use: 'symbol',
   category: 'owner',
   owner: true
}, __filename)