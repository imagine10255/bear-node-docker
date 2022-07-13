import {bash, renameDockerImage} from '../script/utils';
import logger from '../script/logger';
import {initDefault} from '../config';




async function run() {
    const imageName = process.env.npm_package_name ?? initDefault.packageName;
    const imageVersion = process.env.npm_package_version ?? initDefault.packageVersion;
    const remoteAddress = process.env.npm_package_dockerRegistry ?? initDefault.dockerRegistry;

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