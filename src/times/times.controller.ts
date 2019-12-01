import {Controller, Get, Param} from '@nestjs/common';
import {TimesService} from './times.service';
import {Observable} from 'rxjs';
import {DateTimes} from './times.model';

@Controller('times')
export class TimesController {
    constructor(
        private readonly timesService: TimesService,
    ) {
    }

    @Get([':way/:direction(AB|BA)/:waypoint'])
    getTimes(
        @Param('way') way: string,
        @Param('direction') direction: 'AB' | 'BA' = 'AB',
        @Param('waypoint') waypoint: number
    ): Observable<DateTimes> {
        return this.timesService.getTimes(way, direction, waypoint);
    }
}
