#!/usr/bin/env node

/* istanbul ignore if */
if (process.version.match(/v(\d+)\./)[1] < 6) {
    console.error('standard-version: Node v6 or greater is required. `standard-version` did not run.')
} else {
    const bearDeploy = require('../dist/index');
    // bearDeploy()
    //     .catch(() => {
    //         process.exit(1)
    //     })
}
