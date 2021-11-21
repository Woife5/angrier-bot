import { Client, Intents, Collection } from 'discord.js';
import { token } from './config.json';
import { ICommand } from './interfaces';
import fs from 'fs';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

const commands: Collection<string, ICommand> = new Collection();
const commandFiles = fs.readdirSync('./build/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`).default as ICommand;
    commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) {
        return console.error(`Command ${interaction.commandName} not found.`);
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('ready', () => {
    console.log('Ready!');

    /* Remove all commands from all test guilds
    testGuilds.forEach(async guildId => {
        const guild = client.guilds.cache.get(guildId);
        if (guild) {
            guild.commands.set([]);
        }
    });
    return;
    //*/
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
