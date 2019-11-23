import * as fs from 'fs';
import {NestApplicationOptions} from '@nestjs/common';

interface Config {
    port: number;
    options: NestApplicationOptions;
}

const filename = __dirname + '/../config.json';

/* tslint:disable-next-line:no-var-requires */
const config: Config = fs.existsSync(filename) && require(filename) || {
    port: 3000,
};

const httpsOptions = config.options && config.options.httpsOptions;
if (httpsOptions) {
    Object.entries(httpsOptions).forEach(([key, value]) =>
        httpsOptions[key] = fs.readFileSync(value),
    );
}

export default config;
