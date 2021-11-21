import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Yesno, ICommand } from '../interfaces';
const fetch = require('node-fetch');

export default {
    data: new SlashCommandBuilder()
        .setName('yesno')
        .setDescription('Get a yes or no answer to a question.')
        .addStringOption(option =>
            option.setName('question').setDescription('Your question to the angry-oracle').setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        const res = await fetch('https://yesno.wtf/api');
        const result = (await res.json()) as Yesno.IYesNo;

        let question: string = interaction.options.get('question')?.value as string;

        if (!question) {
            question = 'Ehm how?';
        }

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(question)
            .setDescription(`The answer is ${result.answer}. I have spoken.`)
            .setImage(result.image);

        return embed;
    },
} as ICommand;
