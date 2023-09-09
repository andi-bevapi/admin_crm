import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class RemovePassword implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {

        console.log("value----", value);
        return value;
    }
}