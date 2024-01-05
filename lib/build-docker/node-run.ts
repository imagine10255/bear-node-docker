import buildDocker from './index';

// $ ts-node lib/build-docker/node-run.ts
buildDocker({dockerfile: './config/dockerfile/nest/Dockerfile'});
