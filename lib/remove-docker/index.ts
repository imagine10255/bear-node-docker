import {bash, renameDockerImage} from '../script/utils';
import logger from '../script/logger';

interface IArgs {
    publicUrl: string
    dockerfile: string
}



async function run(args: IArgs) {
    const imageName = process.env.npm_package_name ?? 'bear-example';
    const imageVersion = process.env.npm_package_version ?? '0.0.0';
    const remoteAddress = process.env.npm_package_dockerRegistry ?? 'docker.bearests.com:8443';

    // Build Image
    const targetImageName = renameDockerImage(imageName, imageVersion, remoteAddress);

    // Remove Image
    bash(`docker rmi ${imageName} ${targetImageName}`);
    logger.info(`remove image ${imageName}`);

    // By OSX Notice
    bash(`osascript -e 'display notification "${targetImageName} done" with title "remove done"'`);
}

export default run;
module.exports = run;