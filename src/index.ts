import {bash} from './script/utils';
// import * as pkgConfig from '../../../package.json';
import * as child_process from 'child_process';

import ora from 'ora';
import chalk from 'chalk';
import logger from './script/logger';
import {CLIError} from './script/cli';
// import {ESiteEnv} from '../../../src/config/types';
// import {routePrefixPath} from '../../../src/config/app';
// const { Select } = require('enquirer');


/**
 * 重新命名 Docker Image
 * @param imageName
 * @param version
 * @param remoteAddress
 */
function renameDockerImage(imageName: string, version: string, remoteAddress: string){
    return `${remoteAddress}/${imageName}:${version}`;
}

function buildDockerImage(imageName: string, version: string, remoteAddress: string): Promise<string> {

    // bash(`docker build -t ${imageName} .`);

    return new Promise((resolve, reject) => {
        const dockerBuildArgs = ['build', '-t', imageName, '--build-arg', `PUBLIC_URL=`, '.'];

        const loader = ora();
        logger.info(
            `Building ${chalk.dim(
                `(using "docker ${dockerBuildArgs.join(' ')}")`,
            )}`
        );

        const buildProcess = child_process.spawn('docker', dockerBuildArgs,{
            env: {
                ...process.env,
                RCT_NO_LAUNCH_PACKAGER: 'true',
            },
        });
        let buildOutput = '';

        // docker build 例外使用 stderr, 不是 std
        buildProcess.stderr.on('data', (data: Buffer) => {
            const stringData = data.toString();
            buildOutput += stringData;

            if (logger.isVerbose()) {
                logger.debug(stringData);

            } else {
                loader.start(
                    `Building the app${'.'.repeat(buildOutput.length % 10)}`,
                );
            }
        });

        buildProcess.on('close', (code: number) => {

            loader.stop();

            if (code !== 0) {
                const msg = `Failed to build project.
            We ran "docker build" command but it exited with error code ${code}. To debug build
            logs further.`;
                logger.error(msg);
                reject(new CLIError(msg, buildOutput));
                return;
            }

            const targetImageName = renameDockerImage(imageName, version, remoteAddress);
            bash(`docker tag ${imageName} ${targetImageName}`);

            logger.success(`Successfully built the app: ${targetImageName}`);

            resolve(targetImageName);
            return;
        });
    });
}





new Promise(async () => {

    // 不使用多版本發佈
    // const siteEnv = ESiteEnv.prod;

    // ===========參數===============
    // const imageName = pkgConfig.name;
    // const imageVersion = pkgConfig.version;
    // const remoteAddress = pkgConfig.dockerRegistry;
    const imageName = 'bear-example';
    const imageVersion = '1.2.3';
    const remoteAddress = 'docker.bear.com:8443';

    console.log(`準備發布 ${imageName}:${imageVersion} ...`);


    // Build Image
    const targetImageName = await buildDockerImage(imageName, imageVersion, remoteAddress);

    // Push Image
    bash(`docker push ${targetImageName}`);
    logger.success(`Successfully push to ${remoteAddress}`);

    // Remove Image
    bash(`docker rmi ${imageName} ${targetImageName}`);
    logger.info(`remove image ${imageName}`);

    // By OSX Notice
    bash(`osascript -e 'display notification "${targetImageName} 發布完成" with title "完成發布"'`);



});
