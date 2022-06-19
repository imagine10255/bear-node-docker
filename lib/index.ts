#!/usr/bin/env node
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';

module.exports = async function bearScript () {
    yargs(hideBin(process.argv))
        .command('docker [publicUrl] [dockerfile]', 'deploy docker build & push', (yargs) => {
            return yargs
                .positional('publicUrl', {
                    describe: 'react-script build public url (ex: /recommend)',
                    default: '/'
                })
                .positional('dockerfile', {
                    describe: 'custom dockerfile path (ex: ./)',
                    default: './node_modules/bear-script/config/Dockerfile'
                });
        }, (argv) => {
            const run = require('./build-docker');
            run(argv);
        })
        .demandCommand(1)
        .parse();
};

