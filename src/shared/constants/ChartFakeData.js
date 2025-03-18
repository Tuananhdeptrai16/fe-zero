import * as echarts from 'echarts';

export const CHART_A = {
  option: {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Đơn vị: Tỷ VND Đồng',
        type: 'pie',
        radius: ['35%', '55%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 22,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Chi Quản lý hành chính' },
          { value: 735, name: 'Chi sự nghiệp văn hóa thông tin' },
          { value: 580, name: 'Chi sự nghiệp thể dục thể thao' },
          { value: 484, name: 'Chi sự nghiệp giáo dục' },
          { value: 300, name: 'Chi đào tạo dạy nghề' },
        ],
      },
    ],
  },
};

let base = +new Date(1968, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [];
let data = [Math.random() * 300];
for (let i = 1; i < 20000; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

export const CHART_B = {
  option: {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      },
    },
    title: {
      left: 'center',
      text: 'Large Area Chart',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date,
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)',
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)',
            },
          ]),
        },
        data: data,
      },
    ],
  },
};

export const CHART_C = {
  on: {
    updateAxisPointer: (myChart) =>
      function (event) {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1;
          myChart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)',
              },
              encode: {
                value: dimension,
                tooltip: dimension,
              },
            },
          });
        }
      },
  },
  option: {
    legend: {},
    tooltip: {
      trigger: 'axis',
      showContent: false,
    },
    dataset: {
      source: [
        ['product', '2018', '2019', '2020', '2021', '2022', '2023'],
        ['Bạo lực tinh thần', 59, 82, 88, 70, 53, 85],
        ['Bạo lực thân thể', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
        ['Bạo lực tình dục', 10, 15, 22, 36, 45, 50],
        ['Bạo lực kinh tế', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
      ],
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' },
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' },
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' },
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' },
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          focus: 'self',
        },
        label: {
          formatter: '{b}: {@2012} ({d}%)',
        },
        encode: {
          itemName: 'product',
          value: '2018',
          tooltip: '2018',
        },
      },
    ],
  },
};

const app = {};

const posList = [
  'left',
  'right',
  'top',
  'bottom',
  'inside',
  'insideTop',
  'insideLeft',
  'insideRight',
  'insideBottom',
  'insideTopLeft',
  'insideTopRight',
  'insideBottomLeft',
  'insideBottomRight',
];
app.configParameters = {
  rotate: {
    min: -90,
    max: 90,
  },
  align: {
    options: {
      left: 'left',
      center: 'center',
      right: 'right',
    },
  },
  verticalAlign: {
    options: {
      top: 'top',
      middle: 'middle',
      bottom: 'bottom',
    },
  },
  position: {
    options: posList.reduce(function (map, pos) {
      map[pos] = pos;
      return map;
    }, {}),
  },
  distance: {
    min: 0,
    max: 100,
  },
};
app.config = {
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
};

const labelOption = {
  show: true,
  position: app.config.position,
  distance: app.config.distance,
  align: app.config.align,
  verticalAlign: app.config.verticalAlign,
  rotate: app.config.rotate,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {},
  },
};

export const CHART_D = {
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Giáo viên', 'Nhân viên', 'Quản lý', 'Wetland'],
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['Mầm non', 'Tiểu học', 'THCS', 'THPT', 'Đại học'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Giáo viên',
        type: 'bar',
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: [320, 332, 301, 334, 390],
      },
      {
        name: 'Nhân viên',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: [220, 182, 191, 234, 290],
      },
      {
        name: 'Quản lý',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: [35, 71, 46, 54, 75],
      },
    ],
  },
};

export const CHART_E = {
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mầm non', 'Tiểu học', 'THCS', 'THPT', 'Đại học'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [375, 500, 654, 157, 89],
      },
    ],
  },
};

export const CHART_F = {
  option: {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 400, name: 'Tiểu học' },
          { value: 564, name: 'Đại học' },
          { value: 1540, name: 'THCS' },
          { value: 1500, name: 'THPT' },
        ],
      },
    ],
  },
};

const app_1 = {};

const posList_1 = [
  'left',
  'right',
  'top',
  'bottom',
  'inside',
  'insideTop',
  'insideLeft',
  'insideRight',
  'insideBottom',
  'insideTopLeft',
  'insideTopRight',
  'insideBottomLeft',
  'insideBottomRight',
];
app_1.configParameters = {
  rotate: {
    min: -90,
    max: 90,
  },
  align: {
    options: {
      left: 'left',
      center: 'center',
      right: 'right',
    },
  },
  verticalAlign: {
    options: {
      top: 'top',
      middle: 'middle',
      bottom: 'bottom',
    },
  },
  position: {
    options: posList_1.reduce(function (map, pos) {
      map[pos] = pos;
      return map;
    }, {}),
  },
  distance: {
    min: 0,
    max: 100,
  },
};
app_1.config = {
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
};
const labelOption_1 = {
  show: true,
  position: app_1.config.position,
  distance: app_1.config.distance,
  align: app_1.config.align,
  verticalAlign: app_1.config.verticalAlign,
  rotate: app_1.config.rotate,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {},
  },
};

export const CHART_G = {
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Giỏi', 'Khá', 'Trung bình', 'Yếu'],
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['Tiểu học', 'THCS', 'THPT', 'Đại học'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Khá',
        type: 'bar',
        barGap: 0,
        label: labelOption_1,
        emphasis: {
          focus: 'series',
        },
        data: [320, 332, 301, 334, 390],
      },
      {
        name: 'Giỏi',
        type: 'bar',
        label: labelOption_1,
        emphasis: {
          focus: 'series',
        },
        data: [220, 182, 191, 234, 290],
      },
      {
        name: 'Trung bình',
        type: 'bar',
        label: labelOption_1,
        emphasis: {
          focus: 'series',
        },
        data: [150, 232, 201, 154, 190],
      },
      {
        name: 'Yếu',
        type: 'bar',
        label: labelOption_1,
        emphasis: {
          focus: 'series',
        },
        data: [98, 77, 101, 99, 40],
      },
    ],
  },
};

export const CHART_I = {
  option: {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 10, name: 'Di tích quốc gia cấp đặc biệt' },
          { value: 7, name: 'Di tích cấp quốc tế' },
          { value: 22, name: 'Di tích cấp quốc gia' },
          { value: 48, name: 'Di tích cấp tỉnh' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  },
};

const app_2 = {};

const posList_2 = [
  'left',
  'right',
  'top',
  'bottom',
  'inside',
  'insideTop',
  'insideLeft',
  'insideRight',
  'insideBottom',
  'insideTopLeft',
  'insideTopRight',
  'insideBottomLeft',
  'insideBottomRight',
];
app_2.configParameters = {
  rotate: {
    min: -90,
    max: 90,
  },
  align: {
    options: {
      left: 'left',
      center: 'center',
      right: 'right',
    },
  },
  verticalAlign: {
    options: {
      top: 'top',
      middle: 'middle',
      bottom: 'bottom',
    },
  },
  position: {
    options: posList_2.reduce(function (map, pos) {
      map[pos] = pos;
      return map;
    }, {}),
  },
  distance: {
    min: 0,
    max: 100,
  },
};
app_2.config = {
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
};
const labelOption_2 = {
  show: true,
  position: app_2.config.position,
  distance: app_2.config.distance,
  align: app_2.config.align,
  verticalAlign: app_2.config.verticalAlign,
  rotate: app_2.config.rotate,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {},
  },
};

export const CHART_K = {
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Forest', 'Steppe', 'Desert', 'Wetland'],
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['2019', '2020', '2021', '2022', '2023'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Huy chương Đồng',
        type: 'bar',
        barGap: 0,
        label: labelOption_2,
        emphasis: {
          focus: 'series',
        },
        data: [52, 53, 50, 63, 69],
      },
      {
        name: 'Huy chương Bạc',
        type: 'bar',
        label: labelOption_2,
        emphasis: {
          focus: 'series',
        },
        data: [33, 44, 34, 54, 36],
      },
      {
        name: 'Huy chương Vàng',
        type: 'bar',
        label: labelOption_2,
        emphasis: {
          focus: 'series',
        },
        data: [15, 23, 20, 15, 19],
      },
    ],
  },
};

export const CHART_J = {
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Khách Việt', 'Khách Trung Quốc', 'Khách Quốc Tế'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'value',
      },
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false,
        },
        data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
      },
    ],
    series: [
      {
        name: 'Khách Việt',
        type: 'bar',
        label: {
          show: true,
          position: 'inside',
        },
        emphasis: {
          focus: 'series',
        },
        data: [512400, 715500, 668960, 231110, 258200, 556000, 610000],
      },
      {
        name: 'Khách Trung Quốc',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [123500, 230120, 450111, 119000, 130300, 175100, 220910],
      },
      {
        name: 'Khách Quốc Tế',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'inside',
        },
        emphasis: {
          focus: 'series',
        },
        data: [240000, 340000, 345100, 167123, 167800, 273013, 370131],
      },
    ],
  },
};

export const CHART_L = {
  option: {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Tỉ lệ chuyển đổi số',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: 1048, name: 'Chuyển đổi số' },
          { value: 735, name: 'Chưa chuyển đổi số' },
        ],
      },
    ],
  },
};

export const CHART_M = {
  option: {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Tỉ lệ học lực  học sinh',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Khá' },
          { value: 735, name: 'Giỏi' },
          { value: 250, name: 'Trung bình' },
          { value: 46, name: 'Yếu' },
        ],
      },
    ],
  },
};

export const CHART_N = {
  option: {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: [
        'Loại 01 Sao',
        'Loại 02 Sao',
        'Loại 03 Sao',
        'Loại 04 Sao',
        'Loại 05 Sao',
      ],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Loại 01 Sao',
        type: 'line',
        data: [100, 132, 144, 155, 190, 230, 280],
      },
      {
        name: 'Loại 02 Sao',
        type: 'line',
        data: [50, 65, 71, 88, 89, 101, 120],
      },
      {
        name: 'Loại 03 Sao',
        type: 'line',
        data: [33, 35, 38, 44, 55, 64, 71],
      },
      {
        name: 'Loại 04 Sao',
        type: 'line',
        data: [11, 15, 18, 22, 28, 33, 45],
      },
      {
        name: 'Loại 05 Sao',
        type: 'line',
        data: [2, 3, 3, 4, 6, 8, 11],
      },
    ],
  },
};

export const CHART_1 = {
  option: {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: 'Số liệu tính tới hết năm 2023',
        type: 'gauge',
        detail: {
          formatter: '{value}',
        },
        data: [
          {
            value: 88,
            name: 'Tỉ lệ lao động đã qua đào tạo (Tính theo %)',
          },
        ],
      },
    ],
  },
};

export const CHART_2 = {
  option: {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['2022', '2023'],
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '2022',
        type: 'bar',
        data: [
          8900, 7802, 8123, 6589, 7865, 6909, 10121, 6201, 8933, 9853, 9101,
          8492,
        ],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
        },
      },
      {
        name: '2023',
        type: 'bar',
        data: [
          8711, 9309, 11091, 10980, 8509, 7909, 9122, 7701, 12091, 9012, 11010,
          8191,
        ],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
        },
      },
    ],
  },
};

export const CHART_3 = {
  option: {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 55, name: 'Nam' },
          { value: 45, name: 'Nữ' },
        ],
      },
    ],
  },
};

export const CHART_4 = {
  option: {
    angleAxis: {
      type: 'category',
      data: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
    },
    radiusAxis: {},
    polar: {},
    series: [
      {
        type: 'bar',
        data: [
          5231, 3232, 4411, 4010, 3509, 5090, 5509, 3377, 4589, 5689, 5189,
          3689,
        ],
        coordinateSystem: 'polar',
        name: 'Có việc làm',
        stack: 'a',
        emphasis: {
          focus: 'series',
        },
      },
      {
        type: 'bar',
        data: [
          1231, 1232, 1411, 1010, 1509, 1090, 509, 377, 589, 689, 389, 689,
        ],
        coordinateSystem: 'polar',
        name: 'Thất nghiệp',
        stack: 'a',
        emphasis: {
          focus: 'series',
        },
      },
    ],
    legend: {
      show: true,
      data: ['Có việc làm', 'Thất nghiệp'],
    },
  },
};

const datas = [
  ////////////////////////////////////////
  [
    { name: 'Có việc làm', value: 85 },
    { name: 'Thất nghiệp', value: 15 },
  ],
  // ////////////////////////////////////////
  [
    { name: 'Thành Thị', value: 70 },
    { name: 'Nông thôn', value: 30 },
  ],
  ////////////////////////////////////////
];

export const CHART_5 = {
  option: {
    series: datas.map(function (data, idx) {
      var top = idx * 33.3;
      return {
        type: 'pie',
        radius: [20, 60],
        top: top + '%',
        height: '33.33%',
        left: 'center',
        width: 400,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        label: {
          alignTo: 'edge',
          formatter: '{name|{b}}\n{time|{c} %}',
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: '#999',
            },
          },
        },
        labelLine: {
          length: 15,
          length2: 0,
          maxSurfaceAngle: 80,
        },
        labelLayout: function (params) {
          const isLeft = params.labelRect.x < 300 / 2;
          const points = params.labelLinePoints;
          // Update the end point.
          points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;
          return {
            labelLinePoints: points,
          };
        },
        data: data,
      };
    }),
  },
};

export const CHART_6 = {
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
    },
    series: [
      {
        name: 'Số việc làm mới Năm 2021',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [790, 782, 491, 534, 390, 830, 510, 811, 1216, 922, 678, 801],
      },
      {
        name: 'Số việc làm mới Năm 2022',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [650, 812, 901, 754, 990, 678, 609, 701, 669, 779, 929, 691],
      },
      {
        name: 'Số việc làm mới năm 2023',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [820, 1132, 1011, 934, 720, 630, 1320, 701, 1009, 980, 770, 809],
      },
    ],
  },
};

export const CHART_1_1 = {
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    legend: {
      data: ['Tỷ số sinh thô', 'Tỷ số tử thô', 'Tỷ suất sinh tử'],
    },
    xAxis: [
      {
        type: 'category',
        data: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Tỷ số (‰)',
        min: 0,
        max: 10,
        interval: 2,
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        name: 'Tỷ suất (‰)',
        min: 0,
        max: 10,
        interval: 2,
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    series: [
      {
        name: 'Tỷ số sinh thô',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ‰';
          },
        },
        data: [3.97, 3.79, 3.63, 3.46],
      },
      {
        name: 'Tỷ số tử thô',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ‰';
          },
        },
        data: [2.86, 2.69, 2.52, 2.36],
      },
      {
        name: 'Tỷ suất sinh tử',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ‰';
          },
        },
        data: [1.11, 1.1, 1.11, 1.1],
      },
    ],
  },
};

export const CHART_1_2 = {
  option: {
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        [
          'product',
          'Được khám thai',
          'Được tiêm đủ mũi vắc xin',
          'Được sàng lọc trước sinh',
          'Nhiễm HIV được điều trị',
        ],
        ['Quý 1', 95, 94, 93, 92],
        ['Quý 2', 86, 87, 82, 80],
        ['Quý 3', 70, 80, 77, 92],
        ['Quý 4', 90, 85, 82, 91],
      ],
    },
    xAxis: { type: 'category' },
    yAxis: {
      name: 'Tỷ lệ phụ nữ (%)',
      min: 0,
      max: 100,
      interval: 20,
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      { type: 'bar' },
      { type: 'bar' },
      { type: 'bar' },
      { type: 'bar' },
    ],
    name: 'Tỷ lệ phụ nữ (%)',
    min: 0,
    max: 100,
    interval: 20,
  },
};

export const CHART_1_3 = {
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
    },
    series: [
      {
        name: 'Thuốc lá',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [12000, 11800, 11600, 11400],
      },
      {
        name: 'Rượu bia',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [15000, 14800, 14600, 14400],
      },
      {
        name: 'Ma túy',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [5000, 4800, 4600, 4400],
      },
      {
        name: 'Cần sa',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [2000, 1800, 1600, 1400],
      },
      {
        name: 'Ketamine',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [1000, 900, 800, 700],
      },
    ],
  },
};
