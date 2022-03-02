import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Bible, ICommand } from '../interfaces';

const fetch = require('node-fetch');
const bookNames = require('../../data/book-names.json') as Bible.IBookNames;
const bibleAPI = 'https://getbible.net/v2/elberfelder/';
const numberOfBooks = 66;

import { getRandomInt } from '../helpers';

export default {
    data: new SlashCommandBuilder()
        .setName('bibleverse')
        .setDescription('Get a random bible verse. Optionally via the arguments a specific verse can be requested.')
        .addStringOption(option =>
            option
                .setName('book')
                .setDescription('The name or number of the book within the bible (1-66).')
                .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('chapter').setDescription('The number of the chapter.').setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('verse').setDescription('The number of the verse.').setRequired(false)
        ),
    async execute(interaction: CommandInteraction) {
        const int_book = interaction.options.get('book')?.value as string;
        const int_chapter = interaction.options.get('chapter')?.value as number;
        const int_verse = interaction.options.get('verse')?.value as number;

        // Check provided book
        let bookNumber: number;
        if (int_book) {
            if (isNaN(Number(int_book))) {
                // Check if int_book is a valid book name
                bookNumber = bookNames[int_book.toLowerCase()];
                if (!bookNumber) {
                    interaction.reply({ content: 'Invalid book name!', ephemeral: true });
                    return;
                }
            } else {
                // Check if the provided book number is valid
                if (Number(int_book) < 1 || Number(int_book) > numberOfBooks) {
                    interaction.reply({ content: 'Invalid book number!', ephemeral: true });
                    return;
                } else {
                    bookNumber = Number(int_book);
                }
            }
        } else {
            // No book defined, get a random book number
            bookNumber = getRandomInt(1, numberOfBooks);
        }
        // end of book check

        // Download provided book
        let book: Bible.IBibleBook;
        try {
            const response = await fetch(`${bibleAPI}${bookNumber}.json`);
            book = await response.json();
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Error while downloading the bible!', ephemeral: true });
            return;
        }

        // Check provided chapter
        let chapterNumber: number;
        if (int_chapter) {
            if (book.chapters.length >= int_chapter && int_chapter > 0) {
                chapterNumber = Number(int_chapter);
            } else {
                interaction.reply({ content: 'Invalid chapter number!', ephemeral: true });
                return;
            }
        } else {
            // No chapter defined, get a random chapter number
            chapterNumber = getRandomInt(1, book.chapters.length);
        }
        // end of chapter check

        // Check provided verse
        let verseNumber: number;
        if (int_verse) {
            if (book.chapters[chapterNumber - 1].verses.length >= int_verse && int_verse > 0) {
                verseNumber = int_verse;
            } else {
                interaction.reply({ content: 'Invalid verse number!', ephemeral: true });
                return;
            }
        } else {
            // No verse defined, get a random verse number
            verseNumber = getRandomInt(1, book.chapters[chapterNumber - 1].verses.length);
        }
        // end of verse check

        let verseText = book.chapters[chapterNumber - 1].verses[verseNumber - 1].text;

        // Replace some words in the text with some random others
        verseText = verseText.replaceAll('König', 'Paul');
        verseText = verseText.replaceAll('Gott', 'Paul');
        verseText = verseText.replaceAll('Christus', 'Felix');
        verseText = verseText.replaceAll('Mose', 'Valentin');
        verseText = verseText.replaceAll('Priester', 'Axel');
        verseText = verseText.replaceAll('Diener', 'Kinder');
        verseText = verseText.replaceAll('Jehovas', 'Angrys');
        verseText = verseText.replaceAll('Jesu Christi', 'Wolfgang Rader');
        verseText = verseText.replaceAll('Engel', 'Axel');
        verseText = verseText.replaceAll('Sünder', 'Thomas');
        verseText = verseText.replaceAll('Gottseligkeit', 'Angrylosigkeit (a.k.a. Freude)');

        const answer = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`Bible Verse`)
            .setDescription(verseText)
            .setFooter({
                text: `${book.name} ${chapterNumber}:${verseNumber}`,
            });

        interaction.reply({ embeds: [answer] });
    },
} as ICommand;
