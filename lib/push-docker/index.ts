import {bash, renameDockerImage} from '../script/utils';
import logger from '../script/logger';
import {initDefault} from '../config';
import removeDocker from '../remove-docker';

const {Select} = require('enquirer');



async function run() {
    const imageName = process.env.npm_package_name ?? initDefault.packageName;
    const imageVersion = process.env.npm_package_version ?? initDefault.packageVersion;
    const remoteAddress = process.env.npm_package_dockerRegistry ?? initDefault.dockerRegistry;

    console.log(`ready release ${imageName}:${imageVersion} ...`);

    // Build Image
    const targetImageName = renameDockerImage(imageName, imageVersion, remoteAddress);

    // Push Image
    bash(`docker push ${targetImageName}`);
    logger.success(`Successfully push to ${remoteAddress}`);

    // By OSX Notice
    bash(`osascript -e 'display notification "${targetImageName} done" with title "publish done"'`);

    const prompt = new Select({
        name: 'confirmDelete',
        message: 'do you want to delete it?',
        choices: [
            {name: 'y', message: 'Yes'},
            {name: 'n', message: 'No'},
        ],
    });
    const confirmDelete = await prompt.run();
    if(confirmDelete === 'y'){
        removeDocker();
    }
}

export default run;
module.exports = run;