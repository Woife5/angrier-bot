import { ICommand } from 'wokcommands';

export default {
    category: 'testing',
    names: 'Ping',
    description: 'Reply with Pong!',
    testOnly: true,
    slash: true,
    callback: () => {
        return 'Pong!';
    },
} as ICommand;
