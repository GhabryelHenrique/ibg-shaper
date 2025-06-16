import { HttpClientModule } from '@angular/common/http';
// app.module.ts
import { NgxEchartsModule } from 'ngx-echarts';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';

@NgModule({
  imports: [
    AppComponent,
    HttpClientModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') })
  ],
  declarations: [

  ],
  providers: [DataService],
  bootstrap: []
})
export class AppModule { }
