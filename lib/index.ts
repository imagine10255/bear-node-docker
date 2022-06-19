#!/usr/bin/env node
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';

module.exports = async function bearScript () {
    yargs(hideBin(process.argv))
        .command('docker [publicUrl] [dockerfile]', 'deploy docker build & push', (yargs) => {
            return yargs
                .positional('publicUrl', {
                    describe: 'react-script build public url (ex: /recommend)',
                    default: '/',
                })
                .positional('dockerfile', {
                    describe: 'custom dockerfile path (ex: ./)',
                    default: './node_modules/bear-script/config/Dockerfile'
                });
        }, (argv) => {
            const run = require('./build-docker');
            run(argv);
        })

        // ====================================
        .command('svg-symbols [path] [idPrefix]', 'svg merge symbols', (yargs) => {
            return yargs
                .positional('path', {
                    describe: 'svg source path',
                    default: './public/static/plugins/iconsvg/_sources',
                })
                .positional('idPrefix', {
                    describe: 'id prefix name (ex: icon -> icon-arrow-right)',
                    default: 'icon',
                });
        }, (argv) => {
            const run = require('./svg-symbols');
            run(argv);
        })
        .demandCommand(1)
        .parse();
};

