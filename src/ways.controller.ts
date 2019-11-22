import {Controller, Get, Param} from '@nestjs/common';
import {WaysService} from './ways.service';
import {Observable} from "rxjs";

@Controller('ways')
export class WaysController {
    constructor(
        private readonly appService: WaysService
    ) {}

    @Get()
    getWays(): Observable<string[]> {
        return this.appService.getWays();
    }

    @Get([':way', ':way/:direction(AB|BA)'])
    getWay(@Param('way') way: string, @Param('direction') direction: 'AB' | 'BA' = 'AB') {
        return this.appService.getWay(way, direction);
    }
}
