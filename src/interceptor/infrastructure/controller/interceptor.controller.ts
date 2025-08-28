import { Controller, Get } from '@nestjs/common';
import { InterceptorService } from '../../service/interceptor.service';
import { Observable } from 'rxjs';

@Controller('interceptor')
export class InterceptorController {
    constructor(private readonly interceptorService: InterceptorService) {}

    @Get()
    getHello(): Observable<string> {
        return this.interceptorService.getHello();
    }
}
