import fs from 'fs';
import { token, clientId } from './config.json';
import { ICommand } from './interfaces';
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands: any = [];
const commandFiles = fs.readdirSync('./build/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`).default as ICommand;
    commands.push(command.data.toJSON());
}

const testGuilds = ['314440449731592192', '840157171647905802'];
const rest = new REST({ version: '9' }).setToken(token);

if (testGuilds) {
    testGuilds.forEach(async guild => {
        rest.put(Routes.applicationGuildCommands(clientId, guild), { body: commands })
            .then(() => console.log(`Successfully registered application commands on ${guild}.`))
            .catch(console.error);
    });
} else {
    rest.put(Routes.applicationCommands(clientId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}
