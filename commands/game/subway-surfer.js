const { SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('subway-surfer').setDescription('Start a game of subway surfers'),
    /**
     * @param {ChatInputCommandInteraction<import('discord.js').CacheType>} interaction 
     */
    async execute(interaction) {

        await interaction.reply({ flags: MessageFlags.Ephemeral, content: 'Starting game!' })

        let message = await interaction.channel.send({
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

        setInterval(async () => {
            const response = await message.fetch();
            const poll = response.poll

            const winner = Array.from(poll.answers.values()).reduce((highest, answer) => answer.voteCount > highest.voteCount ? answer : highest).text

            await message.delete();
            message = await interaction.channel.send({
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

        }, 3000);
    },
};