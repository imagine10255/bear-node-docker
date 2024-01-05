import * as child_process from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import {
    bash,
    renameDockerImage,
    isEmpty
} from '../script/utils';
import {CLIError} from '../script/cli';
import logger from '../script/logger';
import {initDefault} from '../config';
import pushDocker from '../push-docker';
import * as fs from 'fs';
import Logger
    from '../script/logger';

const {Select} = require('enquirer');

interface IArgs {
    publicUrl?: string
    dockerfile?: string
}

interface IOptions {
    publicUrl?: string
}


/**
 * Object.keys 型別增強
 * @param object
 */
export function objectKeys<T extends object>(object: T): Array<keyof T> {
    return Object.keys(object) as Array<keyof T>;
}




function buildDockerImage(imageName: string, version: string, remoteAddress: string, dockerfile: string, publicUrl?: string): Promise<string> {

    return new Promise((resolve, reject) => {
        const options: IOptions = {
            publicUrl: isEmpty(publicUrl) ? undefined: `PUBLIC_URL=${publicUrl}`,
        };
        const optionsLength = objectKeys(options).filter((key)=> typeof options[key] !== 'undefined').length;
        const buildArgTag = optionsLength > 0 ? '--build-arg': undefined;

        const dockerBuildArgs = ['build', '-t', imageName, '-f', dockerfile, buildArgTag, options.publicUrl, '.']
            .filter(arg => typeof arg !== 'undefined') as string[];

        logger.info(
            `Building ${chalk.dim(
                `(using "docker ${dockerBuildArgs.join(' ')}")`,
            )}`
        );

        // 檢查Docker存在
        if (!fs.existsSync(dockerfile)) {
            throw new Error('dockerfile not exists, please check your dockerfile path');
        }

        const loader = ora();
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




async function run(args?: IArgs) {
    const imageName = process.env.npm_package_name ?? initDefault.packageName;
    const imageVersion = process.env.npm_package_version ?? initDefault.packageVersion;
    const remoteAddress = process.env.npm_package_dockerRegistry ?? initDefault.dockerRegistry;
    const publicUrl = typeof args?.publicUrl !== 'undefined' ? args.publicUrl: initDefault.publicUrl;
    const dockerfile = typeof args?.dockerfile !== 'undefined' ? args.dockerfile: initDefault.dockerfilePath;

    console.log(`ready release ${imageName}:${imageVersion} ...`);

    try {
        // Build Image
        const targetImageName = await buildDockerImage(imageName, imageVersion, remoteAddress, dockerfile, publicUrl);

        // By OSX Notice
        bash(`osascript -e 'display notification "${targetImageName} done" with title "build done"'`);

        const prompt = new Select({
            name: 'confirmPush',
            message: 'do you want to push it?',
            choices: [
                {name: 'y', message: 'Yes'},
                {name: 'n', message: 'No'},
            ],
        });
        const confirmPush = await prompt.run();
        if(confirmPush === 'y'){
            pushDocker();
        }

    }catch (e: any){
        if(e instanceof Error){
            Logger.error(e.message);
        }else{
            console.log(e);
        }
    }

}

export default run;
module.exports = run;
