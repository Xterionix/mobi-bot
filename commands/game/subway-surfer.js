const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('subway-surfer').setDescription('Start a game of subway surfers'),
    /**
     * @param {ChatInputCommandInteraction<import('discord.js').CacheType>} interaction 
     */
    async execute(interaction) {
        await interaction.reply({
            poll: {
                question: { text: 'Which direction next?' },
                answers: [
                    { text: 'Up', emoji: { name: '⬆️' } },
                    { text: 'Down', emoji: { name: '⬇️' } },
                    { text: 'Left', emoji: { name: '⬅️' } },
                    { text: 'Right', emoji: { name: '➡️' } }
                ],
                allowMultiselect: false
            }
        });
        setTimeout(async () => {
            const response = await interaction.fetchReply();
            const poll = response.poll
            await poll.end()

            const winner = Array.from(poll.answers.values()).sort((a, b) => a.voteCount - b.voteCount).pop().text
            
        }, 3000);
    },
};