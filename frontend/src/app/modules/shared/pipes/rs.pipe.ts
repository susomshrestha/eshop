import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rs',
})
export class RsPipe extends CurrencyPipe implements PipeTransform {
  transform(value: any): any {
    return super.transform(value, 'NPR', 'Rs ', '0.0-0');
  }
}
