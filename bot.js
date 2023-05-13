const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();
const prefix = '!'; // Command prefix

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'character') {
    // Check if the argument is provided
    if (!args.length) {
      return message.reply('Please provide a character name.');
    }

    try {
      const characterName = args.join(' ');
      const characterInfo = await getCharacterInfo(characterName);

      // Process and display the character information
      // Customize this part based on your bot's functionality

      message.channel.send(`Character Name: ${characterInfo.name}`);
      message.channel.send(`Character ID: ${characterInfo.character_id}`);
      // Add more fields as needed
    } catch (error) {
      console.error('Error retrieving character information:', error);
      message.reply('An error occurred while retrieving character information.');
    }
  }
});

async function getCharacterInfo(characterName) {
  try {
    const response = await axios.get(`https://esi.evetech.net/latest/search/?categories=character&datasource=tranquility&language=en&search=${characterName}&strict=true`);
    const characterId = response.data.character[0];

    const characterResponse = await axios.get(`https://esi.evetech.net/latest/characters/${characterId}/?datasource=tranquility`);
    const characterInfo = characterResponse.data;

    return characterInfo;
  } catch (error) {
    throw error;
  }
}

client.login('YOUR_DISCORD_BOT_TOKEN');
