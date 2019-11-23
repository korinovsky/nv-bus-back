import {HttpModule, Module} from '@nestjs/common';
import {WaysController} from './ways.controller';
import {WaysService} from './ways.service';
import {TransportService} from './transport.service';

@Module({
    imports: [HttpModule],
    controllers: [WaysController],
    providers: [WaysService, TransportService],
})
export class AppModule {
}
