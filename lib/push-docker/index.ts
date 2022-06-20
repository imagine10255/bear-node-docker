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

    console.log(`ready release ${imageName}:${imageVersion} ...`);

    // Build Image
    const targetImageName = renameDockerImage(imageName, imageVersion, remoteAddress);

    // Push Image
    bash(`docker push ${targetImageName}`);
    logger.success(`Successfully push to ${remoteAddress}`);

    // By OSX Notice
    bash(`osascript -e 'display notification "${targetImageName} done" with title "publish done"'`);
}

export default run;
module.exports = run;