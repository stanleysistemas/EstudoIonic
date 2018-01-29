import { TimelineComponentModule } from './timeline/timeline.module';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
    imports: [IonicModule],
    exports: [TimelineComponentModule]
})
export class ComponentsModule {}