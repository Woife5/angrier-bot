import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../interfaces';

export default {
    data: new SlashCommandBuilder().setName('about').setDescription('Get information about Angery.'),
    async execute(interaction: CommandInteraction) {
        const embed = new MessageEmbed()
            .setColor('WHITE')
            .setTitle('About')
            .addField(
                'Invite me to your server:',
                'https://discord.com/api/oauth2/authorize?client_id=889871547152617542&permissions=0&scope=bot%20applications.commands'
            )
            .setAuthor(
                'Angery',
                'https://cdn.discordapp.com/attachments/314440449731592192/912125148474245221/angry.png',
                'https://github.com/Woife5/angrier-bot'
            )
            .setFooter('Angrier Bot v1.3');

        interaction.reply({ embeds: [embed] });
    },
} as ICommand;
