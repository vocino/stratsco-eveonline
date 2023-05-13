const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const axios = require('axios');

const commands = [
  {
    name: 'character',
    description: 'Get EVE Online character information',
    options: [
      {
        name: 'name',
        type: 'STRING',
        description: 'Character name',
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '9' }).setToken(token);

async function register(client, guildId) {
  try {
    await rest.put(Routes.applicationGuildCommands(client.user.id, guildId), { body: commands });
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
}

async function handleInteraction(interaction) {
  const { commandName, options } = interaction;

  if (commandName === 'character') {
    const characterName = options.getString('name');

    try {
      const characterInfo = await getCharacterInfo(characterName);

      // Process and display the character information
      // Customize this part based on your bot's functionality

      await interaction.reply(`Character Name: ${characterInfo.name}`);
      await interaction.followUp(`Character ID: ${characterInfo.character_id}`);
      // Add more fields as needed
    } catch (error) {
      console.error('Error retrieving character information:', error);
      await interaction.reply('An error occurred while retrieving character information.');
    }
  }
}

async function getCharacterInfo(characterName) {
  try {
    const response = await axios.get(
      `https://esi.evetech.net/latest/search/?categories=character&datasource=tranquility&language=en&search=${characterName}&strict=true`
    );
    const characterId = response.data.character[0];

    const characterResponse = await axios.get(
      `https://esi.evetech.net/latest/characters/${characterId}/?datasource=tranquility`
    );
    const characterInfo = characterResponse.data;

    return characterInfo;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
  handleInteraction
};
