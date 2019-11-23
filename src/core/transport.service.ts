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

    get<T>(params: {[param: string]: string}, mapData: (data: string) => any): Observable<T> {
        const config: AxiosRequestConfig = {params, responseType: 'arraybuffer'};
        return this.http.get<Buffer>('http://mosgortrans.org/pass3/request.ajax.php', config)
            .pipe(
                catchError(error => throwError(new HttpException(error.message, HttpStatus.BAD_GATEWAY))),
                map(decode),
                map(mapData),
            );
    }
}
