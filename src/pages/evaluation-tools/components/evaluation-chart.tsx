import { Bar, Line, PolarArea, Radar } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChartTypes, EChartType } from '@/types/evaluation.type';
import { zip } from 'lodash-es';

type Props = {
  data: number[];
  dataName: string[];
  chartType: ChartTypes;
  dataColor?: string[];
};

const EvaluationChart = ({ chartType, data, dataName, dataColor }: Props) => {
  const [chartWidth, setChartWidth] = useState<number>(960);
  const [legendPosition, setLegendPosition] = useState<string>('left');

  useEffect(() => {
    const windowInnerWidth = window.innerWidth;
    setChartWidth(windowInnerWidth > 960 ? 960 : windowInnerWidth * 0.95);
    setLegendPosition(windowInnerWidth > 960 ? 'left' : 'top');
  }, []);

  const renderChart = () => {
    const dataConfig = {
      labels: dataName,
      datasets: [
        {
          label: 'Evaluation Result',
          data: data,
          backgroundColor: ['rgba(183,121,31,0.5)'],
          borderColor: ['rgba(183,121,31,1)'],
          borderWidth: 1,
          fill: true,
        },
      ],
    };

    const defaultOption = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 25,
      },
    };
    switch (chartType) {
      case EChartType.BAR:
        return (
          <Bar
            data={dataConfig}
            height={600}
            width={chartWidth}
            options={{
              ...defaultOption,
              indexAxis: 'y',
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    // display: false,
                    drawBorder: false,
                    drawOnChartArea: false,
                    // drawTicks: false,
                  },
                  max: 3,
                  ticks: {
                    stepSize: 1,
                    callback: function (val: number, index: number) {
                      switch (val) {
                        case 0:
                          return '';
                        case 1:
                          return 'Low-quality';
                        case 2:
                          return 'Moderate';
                        case 3:
                          return 'Accomplished';
                        default:
                          return '';
                      }
                    },
                  },
                },
              },
            }}
          />
        );
      case EChartType.LINE:
        return (
          <Line
            data={dataConfig}
            height={600}
            width={chartWidth}
            options={{
              ...defaultOption,
              scales: {
                y: {
                  max: 7,
                  min: 0,
                  ticks: {
                    stepSize: 0.5,
                    callback: function (val: number, index: number) {
                      if ((val / 0.5) % 2 === 1) {
                        return '';
                      }
                      return val;
                    },
                  },

                  grid: {
                    drawBorder: false,
                    drawOnChartArea: false,
                  },
                },
              },
            }}
          />
        );
      case EChartType.RADAR:
        return (
          <Radar
            data={dataConfig}
            height={500}
            width={chartWidth}
            options={{
              ...defaultOption,
              elements: {
                line: {
                  borderWidth: 3,
                },
              },
              scale: {
                max: 7,
                min: 0,
                ticks: {
                  stepSize: 1,
                },
              },
            }}
          />
        );
      case EChartType.POLAR:
        const valueLevels = data.map((item) => {
          if (item < 37.5) {
            return 'Cơ bản';
          }
          if (item < 62.5) {
            return 'Khá tốt';
          }
          if (item < 87.5) {
            return 'Tốt';
          }
          return 'Thành thạo';
        });
        const dataNameWithValues = zip(dataName, data).map((item) => item.join(' : '));
        const labels = zip(dataNameWithValues, valueLevels).map((item) => item.join(' - '));
        const dataSet = {
          labels: labels,
          datasets: [
            {
              label: 'Kết quả đánh giá',
              data: data,
              backgroundColor: dataColor,
            },
          ],
        };
        return (
          <PolarArea
            data={dataSet}
            height={500}
            width={chartWidth}
            options={{
              ...defaultOption,
              plugins: {
                legend: {
                  position: legendPosition,
                  labels: {
                    usePointStyle: true,
                  },
                },
                tooltip: {
                  enabled: false,
                },
              },
              scale: {
                max: 100,
                min: 0,
                ticks: {
                  stepSize: 25,
                },
              },
            }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Box
      w={{ base: '95%', lg: '960px' }}
      d="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      m="auto"
    >
      {renderChart()}
    </Box>
  );
};

export default EvaluationChart;
