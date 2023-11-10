#!/usr/bin/env node
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';

module.exports = async function bearScript () {
    yargs(hideBin(process.argv))
        .command('build [publicUrl] [dockerfile]', 'deploy docker build & push', (yargs) => {
            return yargs
                .positional('publicUrl', {
                    describe: 'react-script build public url (ex: /recommend)',
                    default: '/',
                })
                .positional('dockerfile', {
                    describe: 'custom dockerfile path (ex: ./)',
                    default: './node_modules/bear-node-docker/config/react/Dockerfile'
                });
        }, (argv) => {
            const run = require('./build-docker');
            run(argv);
        })

        // ====================================
        .command('push', 'svg merge symbols', (yargs) => {
            return yargs;
        }, (argv) => {
            const run = require('./push-docker');
            run(argv);
        })

        // ====================================
        .command('remove', 'svg merge symbols', (yargs) => {
            return yargs;
        }, (argv) => {
            const run = require('./remove-docker');
            run(argv);
        })
        .demandCommand(1)
        .parse();
};

