import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnChanges {
  @Input() dataSets!: any;
  @Input() labels!: string[];
  @Input() colors! :string[];
  @Input() labelText! : string;
  @Input() type: keyof(ChartTypeRegistry) = 'line'; 

  chart: any;

  ngAfterViewInit(): void {
    const canvas = this.el.nativeElement.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    this.chart = new Chart(ctx, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: [
          { data: [], label: '', backgroundColor: []}
        ],
      },
      options: {
        responsive: true,
      }
    });
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('PieComponent - ngOnChanges');
    this.updateChart();
  }

  private updateChart(): void {
    if (this.chart) {
      console.log('Updating chart data');
      this.chart.data.labels = this.labels;
      this.chart.data.datasets[0].data = this.dataSets;
      this.chart.data.datasets[0].backgroundColor = this.colors;
      this.chart.data.datasets[0].label = this.labelText;
      this.chart.type = this.type;
      this.chart.update();
    }
  }

  constructor(private el: ElementRef) {}
}
