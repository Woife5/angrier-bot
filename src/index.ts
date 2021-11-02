import DiscordJS, { Guild, Intents } from 'discord.js';
import { token } from './config.json';
import WOKCommands from 'wokcommands';
import path from 'path';

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

client.on('ready', () => {
    console.log('Ready!');

    const testGuilds = ['314440449731592192', '840157171647905802'];

    /* Remove all commands from all test guilds
    testGuilds.forEach(async guildId => {
        const guild = client.guilds.cache.get(guildId);
        if (guild) {
            guild.commands.set([]);
        }
    });
    return;
    //*/

    const commandClient = new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        testServers: testGuilds,
        ephemeral: false,
    });
});

client.on('messageCreate', async message => {
    // If the message includes the word "angry" add an angry reaction to the message
    if (message.content.toLowerCase().includes('angry')) {
        try {
            await message.react('😡');
        } catch (error) {
            console.error(error);
        }
    }
});

client.login(token);
