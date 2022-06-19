import * as child_process from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import {bash} from '../script/utils';
import {CLIError} from '../script/cli';
import logger from '../script/logger';

interface IArgs {
    publicUrl: string
    dockerfile: string
}

/**
 * 重新命名 Docker Image
 * @param imageName
 * @param version
 * @param remoteAddress
 */
function renameDockerImage(imageName: string, version: string, remoteAddress: string){
    return `${remoteAddress}/${imageName}:${version}`;
}

function buildDockerImage(imageName: string, version: string, remoteAddress: string, publicUrl: string, dockerfile: string): Promise<string> {

    return new Promise((resolve, reject) => {
        const dockerBuildArgs = ['build', '-t', imageName, '-f', dockerfile, '--build-arg', `PUBLIC_URL=${publicUrl}`, '.'];

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




async function run(args: IArgs) {
    const imageName = process.env.npm_package_name ?? 'bear-example';
    const imageVersion = process.env.npm_package_version ?? '0.0.0';
    const remoteAddress = process.env.npm_package_dockerRegistry ?? 'docker.bearests.com:8443';
    const publicUrl = typeof args.publicUrl !== 'undefined' ? args.publicUrl: '';
    const dockerfile = typeof args.dockerfile !== 'undefined' ? args.dockerfile: './';

    console.log(`ready release ${imageName}:${imageVersion} ...`);

    // Build Image
    const targetImageName = await buildDockerImage(imageName, imageVersion, remoteAddress, publicUrl, dockerfile);

    // Push Image
    bash(`docker push ${targetImageName}`);
    logger.success(`Successfully push to ${remoteAddress}`);

    // Remove Image
    bash(`docker rmi ${imageName} ${targetImageName}`);
    logger.info(`remove image ${imageName}`);

    // By OSX Notice
    bash(`osascript -e 'display notification "${targetImageName} 發布完成" with title "完成發布"'`);
}

export default run;