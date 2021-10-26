import { Interaction, MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';
const wait = require('util').promisify(setTimeout);

interface ITarot {
    text: string;
    media?: string;
}

const tarots = require('../../data/angry-tarot.json') as ITarot[];
const angrys = require('../../data/angry-emojis.json');

export default {
    category: 'Angrycore',
    description: 'Get your daily angry tarot',
    slash: true,
    testOnly: true,
    cooldown: '23h',
    callback: async ({ interaction }) => {
        const embed = new MessageEmbed().setColor('DARK_RED').setFields({
            name: 'Angry Tarot',
            value: 'Let me sense your angry',
            inline: false,
        });

        await interaction.reply({ embeds: [embed] });
        for (let i = 0; i < 6; i++) {
            embed.fields[0].value += '.';
            await interaction.editReply({ embeds: [embed] });
            await wait(500);
        }
        const result = Math.floor(Math.random() * tarots.length);
        embed.fields[0].value = `Your angry today is :angry${result + 1}: ${angrys[result]}`;
        embed.addField('Die Weißheit des angrys besagt:', tarots[result].text);
        if (tarots[result].media) {
            embed.setImage(tarots[result].media!);
        }
        await interaction.editReply({ embeds: [embed] });
    },
} as ICommand;
