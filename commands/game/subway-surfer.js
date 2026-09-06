const { SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const robot = require('robotjs');

const votes = {
    Up: 0,
    Down: 0,
    Left: 0,
    Right: 0
};

module.exports = {
    data: new SlashCommandBuilder().setName('subway-surfer').setDescription('Start a game of subway surfers'),
    /**
     * @param {ChatInputCommandInteraction<import('discord.js').CacheType>} interaction 
     */
    async execute(interaction) {

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('Up')
                .setLabel('⬆️ Up')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('Down')
                .setLabel('⬇️ Down')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('Left')
                .setLabel('⬅️ Left')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('Right')
                .setLabel('➡️ Right')
                .setStyle(ButtonStyle.Primary)
        );

        const channel = interaction.channel

        await interaction.reply({
            content: '🕹️ **Vote for the next direction!**',
            components: [row]
        });

        const message = await interaction.fetchReply();
        robot.mouseClick();

        const collector = message.createMessageComponentCollector();

        collector.on('collect', async buttonInteraction => {
            const direction = buttonInteraction.customId;
            votes[direction]++;

            await buttonInteraction.deferUpdate();
        });

        setInterval(async () => {
            
            const total = votes.Down + votes.Left + votes.Right + votes.Up;
            if (total == 0) return;

            const winner = Object.entries(votes).reduce((highest, current) => highest[1] > current[1] ? highest : current);
            robot.keyTap(winner[0].toLowerCase())

            votes.Down = 0; votes.Left = 0; votes.Right = 0; votes.Up = 0;

        }, 750);
    },
};