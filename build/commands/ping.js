"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'testing',
    names: 'Ping',
    description: 'Reply with Pong!',
    testOnly: true,
    slash: true,
    callback: () => {
        return 'Pong!';
    },
};
