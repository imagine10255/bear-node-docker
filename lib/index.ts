#!/usr/bin/env node
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';

async function bearScript() {
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
            console.log('sss');
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const run = require('./script/docker');
            run(argv);
        })
        .demandCommand(1)
        .parse();
}

export default bearScript;