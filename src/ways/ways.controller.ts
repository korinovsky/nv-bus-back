import {Controller, Get, Param} from '@nestjs/common';
import {WaysService} from './ways.service';
import {Observable} from 'rxjs';
import {Way, Ways} from './ways.model';

@Controller('ways')
export class WaysController {
    constructor(
        private readonly waysService: WaysService,
    ) {
    }

    @Get()
    getWays(): Observable<Ways> {
        return this.waysService.getWays();
    }

    @Get([':way', ':way/:direction(AB|BA)'])
    getWay(@Param('way') way: string, @Param('direction') direction: 'AB' | 'BA' = 'AB'): Observable<Way> {
        return this.waysService.getWay(way, direction);
    }
}
