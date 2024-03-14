neoxr.create(async (m, {
   client,
   text,
   prefix,
   Func
}) => {
   try {
  	const plugins = neoxr.plugins.filter(v => !global.db.setting.pluginDisable.includes(v.pluginName))
      let cmd = plugins.filter(v => v.usage && v.category == 'owner')
      let category = []
      for (let obj of cmd) {
         if (!obj.category) continue
         if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
         else {
            category[obj.category] = []
            category[obj.category].push(obj)
         }
      }
      const keys = Object.keys(category).sort()
      let print = '\n'
      // print += '\n' + String.fromCharCode(8206).repeat(4001)
      for (let k of keys) {
         // print += '\n\n –  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
         let cmd = plugins.filter(v => v.usage && v.category == k.toLowerCase())
         if (cmd.length == 0) return
         let commands = []
         cmd.map(v => {
            switch (v.usage.constructor.name) {
               case 'Array':
                  v.usage.map(x => commands.push({
                     usage: x,
                     use: v.use ? Func.texted('bold', v.use) : ''
                  }))
                  break
               case 'String':
                  commands.push({
                     usage: v.usage,
                     use: v.use ? Func.texted('bold', v.use) : ''
                  })
            }
         })
         print += commands.sort((a, b) => a.usage.localeCompare(b.usage)).map((v, i) => {
            if (i == 0) {
               return `┌  ◦  ${prefix + v.usage} ${v.use}`
            } else if (i == commands.sort((a, b) => a.usage.localeCompare(b.usage)).length - 1) {
               return `└  ◦  ${prefix + v.usage} ${v.use}`
            } else {
               return `│  ◦  ${prefix + v.usage} ${v.use}`
            }
         }).join('\n')
      }
      await client.sendMessageModify(m.chat, Func.Styles(print.trim()) + '\n\n' + global.footer, m, {
         ads: false,
         largeThumb: true
      })
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['m'],
   owner: true
}, __filename)