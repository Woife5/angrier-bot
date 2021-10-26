import { MessageEmbed, Constants } from 'discord.js';
import { ICommand } from 'wokcommands';
const fetch = require('node-fetch');

interface IYesNo {
    answer: string;
    forced: boolean;
    image: string;
}

export default {
    category: 'Funstuff',
    description: 'Get a yes or no answer to a question',
    options: [
        {
          name: 'question',
          description: 'Your question to the angry-oracle',
          required: true,
          type: Constants.ApplicationCommandOptionTypes.STRING,
        },
      ],
    slash: true,
    testOnly: true,
    callback: async ({ interaction, args }) => {
        const res = await fetch('https://yesno.wtf/api');
        const result = (await res.json()) as IYesNo;

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(args[0])
            .setDescription(`The answer is ${result.answer}. I have spoken.`)
            .setImage(result.image);

        return embed;
    },
} as ICommand;
