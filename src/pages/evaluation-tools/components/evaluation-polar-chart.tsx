import { Bar, PolarArea } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';

type Props = {
  evaluationTitle: string;
  info: string[];
  data: number[];
  questionNames: string[];
};

const EvaluationPolarChart = ({ evaluationTitle, info, data, questionNames }: Props) => {
  return (
    <Box maxH="95vh" maxW="95vw">
      <Bar
        data={{
          labels: questionNames,
          datasets: [
            {
              label: evaluationTitle,
              data: data,
              backgroundColor: [
                '#B7791F',
                // 'rgba(255, 99, 132, 0.8)',
                // 'rgba(54, 162, 235, 0.8)',
                // 'rgba(255, 206, 86, 0.8)',
                // 'rgba(75, 192, 192, 0.8)',
                // 'rgba(153, 102, 255, 0.8)',
                // 'rgba(255, 159, 64, 0.8)',
              ],
              borderColor: [
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                '#B7791F',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }}
        width={960}
        height={600}
        options={{
          indexAxis: 'y',
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: info,
              align: 'start',
              padding: {
                top: 20,
                bottom: 20,
              },
            },
            legend: {
              labels: {
                usePointStyle: true,
                title: {
                  usePointStyle: true,
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
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
          scale: {
            stepSize: 1,
          },
        }}
      />
    </Box>
  );
};

export default EvaluationPolarChart;
