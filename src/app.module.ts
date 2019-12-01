import {HttpModule, Module} from '@nestjs/common';
import {WaysController} from './ways/ways.controller';
import {WaysService} from './ways/ways.service';
import {TransportService} from './core/transport.service';
import {TimesService} from './times/times.service';
import {TimesController} from './times/times.controller';

@Module({
    imports: [HttpModule],
    controllers: [WaysController, TimesController],
    providers: [TransportService, WaysService, TimesService],
})
export class AppModule {
}
