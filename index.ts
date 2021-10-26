import DiscordJS, { Intents } from 'discord.js';
import { token } from './config.json';

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

client.on('ready', () => {
    console.log('Ready!');

    const testGuildID = '314440449731592192';
});

client.on('messageCreate', message => {
    if (message.content === 'ping') {
        message.reply('Pong!');
    }
});

client.login(token);
