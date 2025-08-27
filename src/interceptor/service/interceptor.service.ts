import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class InterceptorService {
    getHello(): Observable<string> {
        return of('Hello from Interceptor!');
    }
}
