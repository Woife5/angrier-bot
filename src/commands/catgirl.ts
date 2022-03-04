import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Catgirl, ICommand } from '../interfaces';
import { getRandomInt } from "../helpers";
const fetch = require('node-fetch');
const randomUrl = "https://nekos.moe/api/v1/random/image";
const imageUrl = "https://nekos.moe/image/";


export default {
    data: new SlashCommandBuilder().setName('catgirl').setDescription('Get a random catgirl image'),
    async execute(interaction: CommandInteraction) {
        // load result from api and parse response
        const res = await fetch(randomUrl);
        const result = await res.json() as Catgirl.ICatgirlResponse;

        const randomWord = result.images[0].tags[getRandomInt(0, result.images[0].tags.length - 1)];
        const image = imageUrl + result.images[0].id;

        // TODO possibly alter the image and make it angry?

        // send answer
        const embed = new MessageEmbed()
            .setTitle("Catgirl")
            .setDescription(`Look at this ${randomWord} catgirl i found uwu`)
            .setColor("DARK_GOLD")
            .setAuthor({
                name: "Angry Bot",
                iconURL: "https://cdn.discordapp.com/attachments/314440449731592192/912125148474245221/angry.png"
            })
            .setImage(image);


        interaction.reply({ embeds: [embed] });
    },
} as ICommand;
