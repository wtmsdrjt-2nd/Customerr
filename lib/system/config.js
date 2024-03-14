const { NeoxrCommands: Commands, Function: Func } = new(require('@kenss/kenshin-js'))
// Owner number
global.owner = '17862755061'
// Database name (Default: database)
global.database = 'database'
// Maximum upload file size limit (Default : 50 MB)
global.max_upload = 50
// Delay for spamming protection (Default : 3 seconds)
global.cooldown = 3
// Time to be temporarily banned and others (Default : 30 minutes)
global.timer = 18000000
// Symbols that are excluded when adding a prefix (Don't change it)
global.evaluate_chars = ['=>', '~>', '~', '>', '$', '£']
// Country code that will be automatically blocked by the system, when sending messages in private chat
global.blocks = ['212']
// Timezone (Default : Asia/Jakarta)
global.timezone = 'America/Port-au-Prince'
// Bot name
global.botname = `@SELF BOT`
// Footer text
global.footer = '@andymrlit'
global.atlaapi = '9u9rlEyTv6fNrJgXR1bFJ6zSjN0mJJXZ4i6VooZQ9xnYHDn4kcJjCaL8CafdHnK2QRVI2VrlxhwCYO1ZjEfJ88D2eqWJtWQ64BoT'
// Commands
global.neoxr = Commands
// Global status
global.status = Object.freeze({
   fail: Func.texted('italic', `❌ Can\'t get metadata!`),
   error: Func.texted('italic', `❌ Error occurred!`),
   errorF: Func.texted('italic', `❌ Sorry this feature is in error.`),
   owner: Func.texted('italic', `❌ This command only for owner.`),
   group: Func.texted('italic', `❌ This command will only work in groups.`),
   botAdmin: Func.texted('italic', `❌ This command will work when I become an admin.`),
   admin: Func.texted('italic', `❌ This command only for group admin.`),
   private: Func.texted('italic', `❌ Use this command in private chat.`)
})