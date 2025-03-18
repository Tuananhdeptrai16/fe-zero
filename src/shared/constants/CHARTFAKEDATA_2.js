export const CHART_1_4 = {
  option: {
    tooltip: {},
    angleAxis: [
      {
        type: 'category',
        polarIndex: 0,
        startAngle: 90,
        endAngle: 0,
        data: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
      },
      {
        type: 'category',
        polarIndex: 1,
        startAngle: -90,
        endAngle: -180,
        data: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
      },
    ],
    radiusAxis: [{ polarIndex: 0 }, { polarIndex: 1 }],
    polar: [{}, {}],
    series: [
      {
        type: 'bar',
        name: 'Cả nước',
        polarIndex: 0,
        data: [114.5, 113.8, 113.1, 112.4],
        coordinateSystem: 'polar',
      },
      {
        type: 'bar',
        name: 'Quảng trị',
        polarIndex: 1,
        data: [113.2, 112.9, 112.6, 112, 3],
        coordinateSystem: 'polar',
      },
    ],
  },
};

export const CHART_2_0 = {
  on: {
    updateAxisPointer: (myChart) => {
      return (event) => {
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
      };
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
        ['product', 'Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
        ['Trẻ nhẹ cân', 10.5, 11, 10.2, 10],
        ['Trẻ thấp còi', 12, 11, 10.5, 12.5],
        ['Trẻ gầy còm', 1, 2.5, 3, 1.5],
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
          formatter: '{b}: {@Quý 1} ({d}%)',
        },
        encode: {
          itemName: 'product',
          value: 'Quý 1',
          tooltip: 'Quý 1',
        },
      },
    ],
  },
};

export const CHART_2_1 = {
  option: {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
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
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: 'category',
      data: ['Nhiễm HIV', 'Chuyển sang giai\n\n đoạn AIDS', 'Tử vong do AIDS'],
    },
    series: [
      {
        name: 'Tích lũy từ năm 1990',
        type: 'bar',
        data: [422, 174, 111],
      },
      {
        name: 'Mới phát hiện trong năm',
        type: 'bar',
        data: [15, 12, 8],
      },
    ],
  },
};

export const CHART_2_2 = {
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
            fontSize: 30,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 35.2, name: 'Bệnh tim mạch' },
          { value: 22.1, name: 'Bệnh ung thư' },
          { value: 13.4, name: 'Tai nạn giao thông' },
          { value: 11.8, name: 'Bệnh hô hấp' },
          { value: 5.7, name: 'Bệnh tiêu hóa' },
          { value: 11.8, name: 'Nguyên nhân khác' },
        ],
      },
    ],
  },
};

export const CHART_2_3 = {
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
        center: ['50%', '70%'],
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: 120, name: 'Sốt rét' },
          { value: 25, name: 'Bệnh phong' },
          { value: 450, name: 'Bệnh lao' },
        ],
      },
    ],
  },
};

export const CHART_6_1 = {
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
        data: [
          ' Khám bệnh',
          'Chữa bệnh',
          'Thái độ phục vụ',
          'Cơ sở vật chất',
          'Công tác thu phí',
        ],
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
        data: [90, 88, 92, 85, 87],
      },
    ],
  },
};

export const CHART_6_2 = {
  option: {
    angleAxis: {
      type: 'category',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    radiusAxis: {},
    polar: {},
    series: [
      {
        type: 'bar',
        data: [95, 110, 105, 120, 115, 130, 125, 140, 135, 120, 110, 140],
        coordinateSystem: 'polar',
        name: 'Đạt chất lượng',
        stack: 'a',
        emphasis: {
          focus: 'series',
        },
      },
      {
        type: 'bar',
        data: [5, 10, 5, 10, 10, 10, 10, 10, 7, 8, 9, 10],
        coordinateSystem: 'polar',
        name: 'Chưa đạt chất lượng',
        stack: 'a',
        emphasis: {
          focus: 'series',
        },
      },
    ],
    legend: {
      show: true,
      data: ['Đạt chất lượng', 'Chưa đạt chất lượng'],
    },
  },
};

export const CHART_6_3 = {
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
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    series: [
      {
        name: 'Nặng',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [10, 12, 14, 16, 10, 11, 8, 4, 23, 10, 12, 14],
      },
      {
        name: 'Trung bình',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [20, 30, 23, 23, 11, 19, 30, 33, 18, 10, 11, 12],
      },
      {
        name: 'Nhẹ',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [30, 40, 22, 34, 37, 28, 44, 12, 32, 28, 29, 26],
      },
    ],
  },
};

export const CHART_7_1 = {
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
        center: ['50%', '70%'],

        startAngle: 180,
        endAngle: 360,
        data: [
          { value: 800, name: 'Chi NSNN cho y tế' },
          { value: 400, name: 'Chi NSNN còn lại' },
        ],
      },
    ],
  },
};

export const CHART_7_2 = {
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
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Chi công cho y tế' },
          {
            value: 735,
            name: 'Chi trực tiếp từ tiền túi của hộ gđ cho chăm sóc y tế',
          },
          { value: 580, name: 'Tổng chi y tế còn lại' },
        ],
      },
    ],
  },
};

export const CHART_7_3 = {
  on: {
    updateAxisPointer: (myChart) => {
      return function (event) {
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
      };
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
        ['name', '2020', '2021', '2022', '2023', '2024'],
        ['Công chức viên chức', 2234, 2476, 2300, 2600, 2650],
        ['Lãnh đạo quản lý', 198, 203, 240, 280, 300, 380],
        ['Người hành nghề khám chữa bệnh', 1000, 1045, 1123, 1200, 1300],
        ['Người dân', 400, 480, 440, 500, 540],
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
          itemName: 'name',
          value: '2020',
          tooltip: '2020',
        },
      },
    ],
  },
};

export const CHART_7_4 = {
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Cơ sở y tế', 'Giường bệnh', 'Điểm bán lẻ thuốc'],
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['2020', '2021', '2022', '2023'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Cơ sở y tế',
        type: 'bar',
        barGap: 0,

        emphasis: {
          focus: 'series',
        },
        data: [320, 332, 301, 317],
      },
      {
        name: 'Giường bệnh',
        type: 'bar',

        emphasis: {
          focus: 'series',
        },
        data: [2220, 2182, 2191, 2500],
      },
      {
        name: 'Điểm bán lẻ thuốc',
        type: 'bar',

        emphasis: {
          focus: 'series',
        },
        data: [650, 632, 601, 680],
      },
    ],
  },
};

export const CHART_7_5 = {
  option: {
    angleAxis: {},
    radiusAxis: {
      type: 'category',
      data: ['2020', '2021', '2022', '2023'],
      z: 10,
    },
    polar: {},
    series: [
      {
        type: 'bar',
        data: [85, 90, 95, 98],
        coordinateSystem: 'polar',
        name: 'Tỷ lệ có bác sĩ',
        stack: 'a',
        emphasis: {
          focus: 'series',
        },
      },
      {
        type: 'bar',
        data: [95, 100, 99, 100],
        coordinateSystem: 'polar',
        name: 'Tỷ lệ có hộ sinh',
        stack: 'a',
        emphasis: {
          focus: 'series',
        },
      },
      {
        type: 'bar',
        data: [95, 97, 98, 99],
        coordinateSystem: 'polar',
        name: 'Tỷ lệ có y sĩ sản nhi',
        stack: 'a',
        emphasis: {
          focus: 'series',
        },
      },
    ],
    legend: {
      show: true,
      data: ['Tỷ lệ có bác sĩ', 'Tỷ lệ có hộ sinh', 'Tỷ lệ có y sĩ sản nhi'],
    },
  },
};

export const CHART_8_1 = {
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
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1400, name: 'Vốn ngân sách nhà nước' },
          { value: 900, name: 'Vốn ngân sách địa phương quản lý' },
        ],
      },
    ],
  },
};

export const CHART_8_2 = {
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
        data: ['2020', '2021', '2022', '2023'],
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
        data: [93.1, 93.3, 94.5, 95],
      },
    ],
  },
};

export const CHART_2_2_2 = {
  option: {
    tooltip: {},
    angleAxis: [
      {
        type: 'category',
        polarIndex: 0,
        startAngle: 90,
        endAngle: 0,
        data: [' Quý 1', ' Quý 2', ' Quý 3', ' Quý 4'],
      },
      {
        type: 'category',
        polarIndex: 1,
        startAngle: -90,
        endAngle: -180,
        data: [' Quý 1', ' Quý 2', ' Quý 3', ' Quý 4'],
      },
    ],
    radiusAxis: [{ polarIndex: 0 }, { polarIndex: 1 }],
    polar: [{}, {}],
    series: [
      {
        type: 'bar',
        name: 'Mục đích cấp bách',
        polarIndex: 0,
        data: [100, 150, 200, 250],
        coordinateSystem: 'polar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' tỷ đồng';
          },
        },
      },
      {
        type: 'bar',
        name: 'Mục đích phát triển',
        polarIndex: 1,
        data: [500, 600, 700, 800],
        coordinateSystem: 'polar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' tỷ đồng';
          },
        },
      },
    ],
  },
};

export const CHART_2_2_1 = {
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
    toolbox: {
      feature: {},
    },
    legend: {
      data: [
        'NSNN',
        'Vốn ngoài NSNN',
        'Xây dựng cơ bản',
        'Mua sắm tài sản cố định',
      ],
    },
    xAxis: [
      {
        type: 'category',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Số tiền (tỷ đồng)',
        min: 0,
        max: 500,
        interval: 100,
        axisLabel: {
          formatter: '{value} ',
        },
      },
    ],
    series: [
      {
        name: 'NSNN',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' tỷ đồng';
          },
        },
        data: [150, 225, 200, 180, 230, 255, 280, 260, 234, 190, 290, 300],
      },
      {
        name: 'Vốn ngoài NSNN',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' tỷ đồng';
          },
        },
        data: [300, 375, 320, 310, 340, 380, 390, 328, 321, 334, 367, 380],
      },
      {
        name: 'Xây dựng cơ bản',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' tỷ đồng';
          },
        },
        data: [300, 400, 350, 320, 370, 390, 380, 328, 356, 378, 398, 290],
      },
      {
        name: 'Mua sắm tài sản cố định',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' tỷ đồng';
          },
        },
        data: [150, 175, 200, 167, 189, 195, 210, 230, 220, 218, 198, 240],
      },
    ],
  },
};
export const CHART_8_3 = {
  option: {
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ['product', 'Thể thấp còi', 'Thể nhẹ cân', 'Thể gầy còm'],
        ['Quý 1', 12, 26, 9.4],
        ['Quý 2', 11.6, 25.3, 9],
        ['Quý 3', 11.2, 24.7, 8.6],
        ['Quý 4', 10.8, 24, 8.2],
      ],
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
  },
};

export const CHART_8_4 = {
  option: {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [2019, 2020, 2021, 2022, 2023],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
      },
    },
    series: [
      {
        name: 'Số bác sĩ',
        type: 'line',
        data: [675, 720, 750, 780, 810],
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
        name: 'Số giường bệnh',
        type: 'line',
        data: [1540, 1620, 1690, 1760, 1830],
        markPoint: {
          data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }],
        },
        markLine: {
          data: [
            { type: 'average', name: 'Avg' },
            [
              {
                symbol: 'none',
                x: '90%',
                yAxis: 'max',
              },
              {
                symbol: 'circle',
                label: {
                  position: 'start',
                  formatter: 'Max',
                },
                type: '',
                name: '最高点',
              },
            ],
          ],
        },
      },
    ],
  },
};
export const CHART_8_5 = {
  on: {
    updateAxisPointer: (myChart) => {
      return function (event) {
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
      };
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
        ['product', '2020', '2021', '2022', '2023'],
        ['Mới phát hiện', 150, 140, 130, 120],
        ['Hiện còn sống tới cuối kì báo cáo', 1200, 1100, 1000, 900],
        ['Tử vong trong kì', 50, 45, 40, 35],
        ['Tích lũy từ ca đầu tiên', 1500, 1400, 1300, 1200],
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
          formatter: '{b}: {@2020} ({d}%)',
        },
        encode: {
          itemName: 'product',
          value: '2020',
          tooltip: '2020',
        },
      },
    ],
  },
};
export const CHART_8_6 = {
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
            fontSize: 30,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 13, name: 'Bệnh viện' },
          { value: 121, name: 'Trạm y tế' },
          { value: 30, name: 'Phòng khám đa khoa' },
          { value: 70, name: 'Phòng khám chuyên khoa' },
          { value: 80, name: 'Các cơ sở y tế khác' },
        ],
      },
    ],
  },
};

export const CHART_8_7 = {
  option: {
    xAxis: {
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
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    title: {
      text: 'Biểu đồ dự đoán tỉ lệ Nhân lực/Giường bệnh 2023',
      subtext: 'Tuyến bệnh viện Hạng 1',
      left: 'center',
      top: 16,
    },
    series: [
      {
        data: [1, 1.1, 1.2, 1.2, 1.4, 1.6, 2, 1.8, 2.2, 2, 1.5, 1.8],
        type: 'line',
        symbol: 'circle',
        symbolSize: 20,
        lineStyle: {
          color: '#5470C6',
          width: 2,
          type: 'dashed',
        },
        itemStyle: {
          borderWidth: 2,
          borderColor: '#222222',
          color: 'Blue',
        },
      },
    ],
  },
};

export const CHART_9_1 = {
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
        name: 'Tổng chi cho KH&CN (tỷ đồng)',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: 8680.567, name: 'Chi cho đầu tư phát triển KH&CN' },
          { value: 20347, name: 'Chi sự nghiệp KH&CN' },
          { value: 1549, name: 'Chi khác cho KH&CN' },
        ],
      },
    ],
  },
};

export const CHART_9_2 = {
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
        name: 'Nhiệm vụ KH&CN',
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
            fontSize: 30,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 50, name: 'Đang tiến hành' },
          { value: 30, name: 'Được nghiệm thu' },
          { value: 20, name: 'Đưa vào ứng dụng' },
        ],
      },
    ],
  },
};

export const CHART_9_3 = {
  option: {
    dataset: {
      source: [
        ['score', 'Số lượng', 'product'],
        [89.3, 100, 'Độ dài'],
        [57.1, 120, 'Khối lượng'],
        [74.4, 80, 'Dung tích - Lưu lượng'],
        [50.1, 100, 'Áp suất'],
        [89.7, 90, 'Nhiệt độ'],
        [68.1, 300, 'Điện - Hóa lý'],
        [19.6, 100, 'Phương tiện đo khác'],
      ],
    },
    grid: { containLabel: true },
    xAxis: { name: 'Số lượng' },
    yAxis: { type: 'category' },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 10,
      max: 100,
      text: ['High Score', 'Low Score'],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ['#65B581', '#FFCE34', '#FD665F'],
      },
    },
    series: [
      {
        type: 'bar',
        encode: {
          // Map the "amount" column to X axis.
          x: 'Số lượng',
          // Map the "product" column to Y axis
          y: 'product',
        },
      },
    ],
  },
};

export const CHART_9_4 = {
  on: {
    updateAxisPointer: (myChart) => {
      return function (event) {
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
      };
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
        ['product', '2020', '2021', '2022', '2023'],
        ['Người hoạt động trong lĩnh vực năng lượng nguyên tử', 33, 30, 45, 50],
        ['Người tiến hành công việc bức xạ', 88, 80, 90, 100],
        ['Nhân viên bức xạ', 100, 120, 140, 150],
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
          formatter: '{b}: {@2020} ({d}%)',
        },
        encode: {
          itemName: 'product',
          value: '2020',
          tooltip: '2020',
        },
      },
    ],
  },
};
export const CHART_9_5 = {
  option: {
    title: {
      text: '',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 102, name: 'Thiết bị bức xạ' },
          { value: 135, name: 'Nguồn phóng xạ' },
          { value: 87, name: 'Giấy phép tiến hành công việc bức xạ' },
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

export const CHART_10_1 = {
  option: {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
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
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: 'category',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    series: [
      {
        name: 'Xăng',
        type: 'bar',
        data: [
          10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000,
          20000, 21000,
        ],
      },
      {
        name: 'Dầu diesel',
        type: 'bar',
        data: [
          12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000,
          22000, 23000,
        ],
      },
      {
        name: 'gas',
        type: 'bar',
        data: [
          800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900,
        ],
      },
    ],
  },
};

export const CHART_10_2 = {
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
        data: ['Đường sắt', 'Đường bộ', 'Đường thủy nội địa', 'Đường biển'],
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
        name: 'Hàng hóa (triệu tấn)',
        type: 'bar',
        barWidth: '40%',
        data: [10, 1, 0.5, 0.2],
      },
      {
        name: 'Hành khách (triệu lượt)',
        type: 'bar',
        barWidth: '40%',
        data: [20, 2, 1, 0.5],
      },
    ],
  },
};

export const CHART_10_3 = {
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
        name: 'Chiều dài (km)',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: 8739, name: 'Đường bộ' },
          { value: 250, name: 'Đường thủy' },
          { value: 76, name: 'Đường sắt' },
          { value: 500, name: 'Hệ thống sông ngòi' },
        ],
      },
    ],
  },
};

export const CHART_10_4 = {
  option: {
    title: {
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 100, name: 'Đã hoàn thành' },
          { value: 50, name: 'Đang thi công' },
          { value: 20, name: 'Chưa thi công' },
          { value: 30, name: 'Sửa chữa và mở rộng' },
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
