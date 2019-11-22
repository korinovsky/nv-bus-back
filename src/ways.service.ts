import {Injectable} from '@nestjs/common';
import {TransportService} from './transport.service';
import {Observable} from 'rxjs';

@Injectable()
export class WaysService {
    constructor(
        private transportService: TransportService,
    ) {
    }

    getWays(): Observable<string[]> {
        const params = {
            list: 'ways',
            type: 'avto',
        };
        const mapData = data => data
            .split('\n')
            .filter(value => value.match(/[A-ZА-Я0-9]/));
        return this.transportService.get(params, mapData);
    }

    getWay(way: string, direction: string): Observable<string[]> {
        const params = {
            list: 'waypoints',
            type: 'avto',
            way: way,
            date: '1111100',
            direction: direction,
        };
        const mapData = data => data
            .trim()
            .split('\n');
        return this.transportService.get(params, mapData);
    }
}
