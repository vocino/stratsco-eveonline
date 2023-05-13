require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const commands = require('./commands');

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.BOT_TOKEN;

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
