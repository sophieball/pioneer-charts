import { Component } from '@angular/core';
import { PcService } from '../../../../../services/pc.service';
import { IPcacData } from '@pioneer-code/pioneer-charts';
import { IPcacBarHorizontalChartConfig } from 'libs/pcac/public_api';
import { IJumpNav, JumpNavLevel } from '../../../../../components/jump-nav/jump-nav.component';

@Component({
  selector: 'pc-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  verticalCode = `<pcac-bar-vertical-chart [config]="barVerticalChartConfig"></pcac-bar-vertical-chart>`;
  horizontalCode = `<pcac-bar-horizontal-chart [config]="barHorizontalChartConfig"></pcac-bar-horizontal-chart>`;
  importCode = `import { PcacBarVerticalChartModule, PcacBarHorizontalChartModule } from '@pioneer-code/pioneer-charts';`;
  config: IPcacBarHorizontalChartConfig;
  jumpNav = [
    {
      key: 'Bar Chart',
      value: '',
      level: JumpNavLevel.h1
    },
    {
      key: 'Markup',
      value: 'markup',
      level: JumpNavLevel.h2
    },
    {
      key: 'Horizontal',
      value: 'horizontal',
      level: JumpNavLevel.h3
    },
    {
      key: 'Vertical',
      value: 'vertical',
      level: JumpNavLevel.h3
    },
    {
      key: 'API',
      value: 'api',
      level: JumpNavLevel.h2

    },
    {
      key: 'Configuration',
      value: 'configuration',
      level: JumpNavLevel.h3
    }
  ] as IJumpNav[];

  constructor(public pcacService: PcService) { }

  getConfig() {
    const rows = [
      {
        'data': [
          {
            'value': 'Name'
          },
          {
            'value': 'Description'
          }
        ]
      },
      {
        'data': [
          {
            'value': 'domainMax'
          },
          {
            'value': 'Max value in data-set domain.'
          }
        ]
      }
    ] as IPcacData[];
    return {
      'data': rows.concat(this.pcacService.sharedConfig || [])
    };
  }
}
