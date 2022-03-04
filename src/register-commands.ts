import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types';
import fs from 'fs';
import { token, clientId } from './config.json';
import { ICommand } from './interfaces';
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
const commandFiles = fs.readdirSync('./build/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`).default as ICommand;
    commands.push(command.data.toJSON());
}

// Comment the next line out to register the commands on every guild (will take a while)
const testGuilds = ['949336261057994882'];
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
