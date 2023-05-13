const { Client, GatewayIntentBits } = require('discord.js');
const commands = require('./commands');

const clientId = 'YOUR_CLIENT_ID'; // Replace with your bot's client ID
const guildId = 'YOUR_GUILD_ID'; // Replace with your guild ID
const token = 'YOUR_DISCORD_BOT_TOKEN'; // Replace with your bot token

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  commands.register(client, guildId);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isCommand()) return;

  commands.handleInteraction(interaction);
});

client.login(token);
