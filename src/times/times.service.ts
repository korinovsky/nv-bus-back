import {Injectable} from '@nestjs/common';
import {TransportService} from '../core/transport.service';
import {forkJoin, Observable} from 'rxjs';
import {DateTimes, DayOfWeek, Times} from './times.model';
import {fromPairs, union} from 'lodash';

@Injectable()
export class TimesService {
    constructor(
        private transportService: TransportService,
    ) {
    }

    getTimes(way: string, direction: string, waypoint: number): Observable<DateTimes> {
        return forkJoin(fromPairs(Object.values(DayOfWeek).map(date => {
            const params = {
                type: 'avto',
                way,
                date,
                direction,
                waypoint,
            };
            const mapData = (data: string) => {
                return union(...data
                    .split(/<span class="hour">/)
                    .map(col => {
                        const hourMatch = col.match(/^\d+/);
                        if (!hourMatch) {
                            return;
                        }
                        const hour = +hourMatch[0];
                        const minuteMatch = col.match(/<span class="minute">\d+(\s\w+)?<\/span>/ug);
                        if (!minuteMatch) {
                            return;
                        }
                        return minuteMatch.map(minute => {
                            return hour * 60 + parseInt(minute.match(/>(\d+)/)[1], 10);
                        });
                    })
                    .filter(v => v),
                ).sort((a, b) => a - b);
            };
            return [date, this.transportService.get<Times>(params, mapData)];
        })));
    }
}
