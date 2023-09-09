import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next
            .handle()
            .pipe(
                map((data) => {
                    if (data?.password) {
                        delete data.password
                    }
                    //console.log("data--interceptor---", data);
                    return data;
                })
            )
    }
}