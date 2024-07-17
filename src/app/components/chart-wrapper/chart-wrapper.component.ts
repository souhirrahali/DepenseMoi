import { Component, Input, OnInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-chart-wrapper',
  template: '<canvas></canvas>'
})
export class ChartWrapperComponent implements OnInit, OnChanges {
  @Input() type: ChartType = 'line';
  @Input() data: ChartConfiguration['data'] = { datasets: [] };
  @Input() options: ChartConfiguration['options'] = {};

  private chart: Chart | undefined;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart) {
      if (changes['type']) {
        this.chart.destroy();
        this.createChart();
      } else {
      
        this.chart.data = this.data;
        this.chart.options = this.options || {};
        this.chart.update();
      }
    }
  }

  private createChart() {
    const ctx = this.elementRef.nativeElement.querySelector('canvas');
    this.chart = new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: this.options
    });
  }
}