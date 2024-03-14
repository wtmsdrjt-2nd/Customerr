neoxr.create(async (m, {
   client,
   text,
   prefix,
   command,
   Func
}) => {
   try {
      if (!text) return client.reply(m.chat, Func.example(prefix, command, 'how to create web api'), m)
      client.sendReact(m.chat, '🕒', m.key)
      const json = await Func.fetchJson(`https://api.neoxr.eu/api/bard?q=${text}&apikey=kntulyks`)
      if (!json.status) return client.reply(m.chat, Func.texted('bold', `🚩 Server sedang down.`), m)
      m.reply(json.data.message)
   } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['oi'],
   use: 'query',
   category: 'owner',
   limit: true
}, __filename)