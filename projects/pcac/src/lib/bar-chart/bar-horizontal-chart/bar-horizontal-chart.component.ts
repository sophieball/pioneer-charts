import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  OnChanges,
  EventEmitter,
  Output,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { BarHorizontalChartBuilder } from './bar-horizontal-chart.builder';
import { IPcacBarHorizontalChartConfig } from './bar-horizontal-chart.model';
import { IPcacData } from '../../core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'pcac-bar-horizontal-chart',
  templateUrl: './bar-horizontal-chart.component.html',
  providers: [
    BarHorizontalChartBuilder
  ]
})
export class PcacBarChartHorizontalComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() config: IPcacBarHorizontalChartConfig;
  @ViewChild('chart') chartElm: ElementRef;
  @Output() barClicked: EventEmitter<IPcacData> = new EventEmitter();
  private resizeEvent: Subscription;

  constructor(
    private chartBuilder: BarHorizontalChartBuilder,
  ) {
    this.chartBuilder.barClicked$.subscribe(data => {
      this.barClicked.emit(data);
    });
  }

  ngAfterViewInit() {
    this.resizeEvent = fromEvent(window, 'resize').pipe(
      debounceTime(100)
    ).subscribe((event) => {
      console.log('hi');
      this.buildChart();
    });
  }

  ngOnDestroy() {
    this.resizeEvent.unsubscribe();
  }

  ngOnChanges() {
    if (this.config && this.config.data) {
      this.buildChart();
    }
  }

  buildChart(): void {
    this.chartBuilder.buildChart(this.chartElm, this.config);
  }
}
