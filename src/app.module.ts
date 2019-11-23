import {HttpModule, Module} from '@nestjs/common';
import {WaysController} from './ways/ways.controller';
import {WaysService} from './ways/ways.service';
import {TransportService} from './core/transport.service';

@Module({
    imports: [HttpModule],
    controllers: [WaysController],
    providers: [WaysService, TransportService],
})
export class AppModule {
}
