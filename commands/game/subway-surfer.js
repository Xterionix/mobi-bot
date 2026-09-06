const { SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const robot = require('robotjs');

const votes = {
    Up: 0,
    Down: 0,
    Left: 0,
    Right: 0
};

const THRESHOLD = 1;

module.exports = {
    data: new SlashCommandBuilder().setName('subway-surfer').setDescription('Start a game of subway surfers'),
    /**
     * @param {ChatInputCommandInteraction<import('discord.js').CacheType>} interaction 
     */
    async execute(interaction) {

        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('blank1')
                .setLabel('‎')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),

            new ButtonBuilder()
                .setCustomId('Up')
                .setLabel('⬆️')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('blank2')
                .setLabel('‎')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
        );

        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('Left')
                .setLabel('⬅️')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('Center')
                .setLabel('⚫')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),

            new ButtonBuilder()
                .setCustomId('Right')
                .setLabel('➡️')
                .setStyle(ButtonStyle.Primary)
        );

        const row3 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('blank3')
                .setLabel('‎')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),

            new ButtonBuilder()
                .setCustomId('Down')
                .setLabel('⬇️')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('blank4')
                .setLabel('‎')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
        );

        await interaction.reply({
            content: '🕹️ **Vote for the next direction!**',
            components: [row1, row2, row3]
        });

        const message = await interaction.fetchReply();
        robot.mouseClick();

        const collector = message.createMessageComponentCollector();

        collector.on('collect', async buttonInteraction => {
            const direction = buttonInteraction.customId;
            if (!direction.startsWith('blank')) votes[direction]++;

            await buttonInteraction.deferUpdate();
        });

        setInterval(async () => {

            const total = votes.Down + votes.Left + votes.Right + votes.Up;
            if (total == 0) return;

            const winner = Object.entries(votes).reduce((highest, current) => highest[1] > current[1] ? highest : current);
            if (winner[1] < THRESHOLD) return;
            robot.keyTap(winner[0].toLowerCase())

            votes.Down = 0; votes.Left = 0; votes.Right = 0; votes.Up = 0;

        }, 100);
    },
};