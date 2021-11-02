import { Interaction, MessageEmbed, Constants } from 'discord.js';
import { ICommand } from 'wokcommands';
import { Bible } from '../interfaces';
const fetch = require('node-fetch');
const bookNames = require('../../data/book-names.json') as Bible.IBookNames;
const bibleAPI = 'https://getbible.net/v2/elberfelder/';
const numberOfBooks = 66;

import { getRandomInt } from '../helpers';

export default {
    category: 'Angrycore',
    description: 'Get a random bible verse. Optionally via the arguments a specific verse can be requested.',
    options: [
        {
            name: 'book',
            description: 'The number of the book within the bible (1-66)',
            required: false,
            type: Constants.ApplicationCommandOptionTypes.STRING,
        },
        {
            name: 'chapter',
            description: 'The number or name of the chapter within the book',
            required: false,
            type: Constants.ApplicationCommandOptionTypes.INTEGER,
        },
        {
            name: 'verse',
            description: 'The number of the verse within the chapter',
            required: false,
            type: Constants.ApplicationCommandOptionTypes.INTEGER,
        },
    ],
    slash: true,
    testOnly: true,
    callback: async ({ interaction }) => {
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
        verseText = verseText.replaceAll('Priester', 'Roman');
        verseText = verseText.replaceAll('Diener', 'Irmi');
        verseText = verseText.replaceAll('Jehovas', 'Angrys');
        verseText = verseText.replaceAll('Jesu Christi', 'Wolfgang Rader');
        verseText = verseText.replaceAll('Engel', 'Axel');
        verseText = verseText.replaceAll('Sünder', 'Thomas');
        verseText = verseText.replaceAll('Gottseligkeit', 'Angrylosigkeit (a.k.a. Freude)');

        const answer = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`Bible Verse`)
            .setDescription(verseText)
            .setFooter(`${book.name} ${chapterNumber}:${verseNumber}`);

        return answer;
    },
} as ICommand;
