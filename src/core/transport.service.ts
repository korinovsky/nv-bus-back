import {HttpException, HttpService, HttpStatus, Injectable} from '@nestjs/common';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import * as iconv from 'iconv-lite';

const decode = (value: AxiosResponse<Buffer>) => iconv.decode(value.data, 'cp1251').toString();

@Injectable()
export class TransportService {
    constructor(
        private http: HttpService,
    ) {
    }

    get<T>(params: {[param: string]: string | number}, mapData: (data: string) => any): Observable<T> {
        const config: AxiosRequestConfig = {params, responseType: 'arraybuffer'};
        const url = 'list' in params
            ? 'http://mosgortrans.org/pass3/request.ajax.php'
            : 'http://mosgortrans.org/pass3/shedule.printable.php';
        return this.http.get<Buffer>(url, config)
            .pipe(
                catchError(error => throwError(new HttpException(error.message, HttpStatus.BAD_GATEWAY))),
                map(decode),
                map(mapData),
            );
    }
}
