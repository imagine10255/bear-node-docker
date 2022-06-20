import {execSync} from 'child_process';
const options = {stdio:[0, 1, 2]};

export const bash = (cmd: string) => {
    execSync(cmd, options);
};


/**
 * 重新命名 Docker Image
 * @param imageName
 * @param version
 * @param remoteAddress
 */
export const renameDockerImage = (imageName: string, version: string, remoteAddress: string): string => {
    return `${remoteAddress}/${imageName}:${version}`;
}
