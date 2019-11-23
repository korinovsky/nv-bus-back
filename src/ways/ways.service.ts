import {Injectable} from '@nestjs/common';
import {TransportService} from '../core/transport.service';
import {Observable} from 'rxjs';
import {Way, Ways} from './ways.model';

@Injectable()
export class WaysService {
    constructor(
        private transportService: TransportService,
    ) {
    }

    getWays(): Observable<Ways> {
        const params = {
            list: 'ways',
            type: 'avto',
        };
        const mapData = data => data
            .split('\n')
            .filter(value => value.match(/[A-ZА-Я0-9]/));
        return this.transportService.get<Ways>(params, mapData);
    }

    getWay(way: string, direction: string): Observable<Way> {
        const params = {
            list: 'waypoints',
            type: 'avto',
            way,
            date: '1111100',
            direction,
        };
        const mapData = data => data
            .trim()
            .split('\n')
            .map((name, id) => ({id, name}))
            .filter(value => !value.name.match(/\(к\/ст\)$/));
        return this.transportService.get<Way>(params, mapData);
    }
}
