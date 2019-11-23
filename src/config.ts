import * as fs from 'fs';
import {HttpsOptions} from '@nestjs/common/interfaces/external/https-options.interface';

interface Config {
    port: number;
    httpsOptions?: HttpsOptions;
}

const filename = __dirname + '/../config.json';

/* tslint:disable-next-line:no-var-requires */
const config: Config = fs.existsSync(filename) && require(filename) || {
    port: 3000,
};

if (config.httpsOptions) {
    Object.entries(config.httpsOptions).forEach(([key, value]) =>
        config.httpsOptions[key] = fs.readFileSync(value),
    );
}

export default config;
