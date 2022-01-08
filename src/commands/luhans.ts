import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../interfaces';
import { getRandomInt } from '../helpers';

const { names, medienDispositive, geschmacksliste, funStuff } = require('../../data/angry-luhans.json');
const medienKlausur = new Date('2021-07-02T11:00:00');

export default {
    data: new SlashCommandBuilder().setName('luhans').setDescription('Get McLuhans current wisdom.'),
    async execute(interaction: CommandInteraction) {
        const embed = new MessageEmbed().setColor('DARK_VIVID_PINK');

        switch (getRandomInt(0, 2)) {
            // Case to get fun stuff
            case 0: {
                // Calculate the time since the medien-t test.
                let msSinceKlausur = Date.now() - medienKlausur.getTime();
                const dSinceKlausur = Math.floor(msSinceKlausur / 1000 / 60 / 60 / 24);
                msSinceKlausur -= dSinceKlausur * 1000 * 60 * 60 * 24;

                const hSinceKlausur = Math.floor(msSinceKlausur / 1000 / 60 / 60);
                msSinceKlausur -= hSinceKlausur * 1000 * 60 * 60;

                const mSinceKlausur = Math.floor(msSinceKlausur / 1000 / 60);
                msSinceKlausur -= mSinceKlausur * 1000 * 60;

                const sSinceKlausur = Math.floor(msSinceKlausur / 1000);

                // Setting the variables for the dynamic time description (difference between singular and plural)
                let hourText, minuteText, secondText;

                // No need to calculate dayText since it has been days when this code was created!
                sSinceKlausur > 1 ? (secondText = 'Sekunden') : (secondText = 'Sekunde');
                mSinceKlausur > 1 ? (minuteText = 'Minuten') : (minuteText = 'Minute');
                hSinceKlausur > 1 ? (hourText = 'Stunden') : (hourText = 'Stunde');

                embed
                    .addField(
                        'McKlausur',
                        `Sei glücklich, es sind bereits ${dSinceKlausur} Tage ${hSinceKlausur} ${hourText} ${mSinceKlausur} ${minuteText} und ${sSinceKlausur} ${secondText} sind seit der Medientheorie Klausur mit ${
                            names[getRandomInt(0, names.length)]
                        } vergangen!\nEine rachsüchtige Erinnerung - ich hoffe, sie macht dich wütend.`
                    )
                    .setTimestamp(medienKlausur);

                break;
            }

            // Case to get some proper medienDispositive!
            case 1: {
                const name = names[getRandomInt(0, names.length - 1)];
                embed.addField(
                    `Hallo, ich bin ${name} und das ist meine momentane, unverständliche Weisheit:`,
                    medienDispositive[getRandomInt(0, medienDispositive.length - 1)]
                );
                embed.setAuthor(name);
                break;
            }

            // Good to know when this exam ended
            case 2: {
                let text = funStuff[getRandomInt(0, funStuff.length - 1)];
                text = text.replaceAll('<name>', names[getRandomInt(0, names.length - 1)]);
                text = text.replaceAll('<geschmack>', geschmacksliste[getRandomInt(0, geschmacksliste.length - 1)]);
                text = text.replaceAll(
                    '<dispositiv>',
                    medienDispositive[getRandomInt(0, medienDispositive.length - 1)]
                );
                embed.setDescription(text);
                break;
            }
        }

        interaction.reply({ embeds: [embed] });
    },
} as ICommand;
