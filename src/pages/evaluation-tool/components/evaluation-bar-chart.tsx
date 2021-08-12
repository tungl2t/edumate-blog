import { Bar } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';

type Props = {
  evaluationTitle: string;
  info: string[];
  data: number[];
  questionNames: string[];
};

const EvaluationBarChart = ({ evaluationTitle, info, data, questionNames }: Props) => {
  return (
    <Box maxH="95vh" maxW="95vw">
      <Bar
        data={{
          labels: questionNames,
          datasets: [
            {
              label: evaluationTitle,
              data: data,
              backgroundColor: ['#B7791F'],
              borderColor: ['#B7791F'],
              borderWidth: 1,
            },
          ],
        }}
        width={500}
        height={900}
        options={{
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: true,
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

export default EvaluationBarChart;
