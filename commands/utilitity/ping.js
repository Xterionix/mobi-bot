const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    /**
     * @param {ChatInputCommandInteraction<import('discord.js').CacheType>} interaction 
     */
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};