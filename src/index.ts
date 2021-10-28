import DiscordJS, { Intents } from 'discord.js';
import { token } from './config.json';
import WOKCommands from 'wokcommands';
import path from 'path';

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

client.on('ready', () => {
    console.log('Ready!');

    const testGuildID = '314440449731592192';
    const angry2GuildID = '840157171647905802';

    const commandClient = new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        testServers: [testGuildID, angry2GuildID],
        ephemeral: false,
    });
});

client.on('messageCreate', message => {
    if (message.content === 'ping') {
        message.reply('Pong!');
    }
});

client.login(token);
