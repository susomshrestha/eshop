import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { RsPipe } from './pipes/rs.pipe';

@NgModule({
  declarations: [SliderComponent, RsPipe],
  imports: [CommonModule],
  exports: [SliderComponent, RsPipe],
})
export class SharedModule {}
