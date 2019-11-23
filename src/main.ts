import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import config from './config';

async function bootstrap() {
    let options;
    const httpsOptions = config.httpsOptions;
    if (httpsOptions) {
        options = {httpsOptions};
    }
    const app = await NestFactory.create(AppModule, options);
    await app.listen(config.port);
}

bootstrap();
