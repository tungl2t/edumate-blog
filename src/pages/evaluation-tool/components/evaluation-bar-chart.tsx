import { Bar } from 'react-chartjs-2';
import { Box, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import PdfConverter from 'jspdf';
import { DownloadIcon } from '@chakra-ui/icons';

type Props = {
  evaluationTitle: string;
  info: string[];
  data: number[];
  questionNames: string[];
};

const EvaluationBarChart = ({ info, data, questionNames }: Props) => {
  const barWidth = window.innerWidth * 0.95;
  const usedBarWidth = barWidth > 960 ? 960 : barWidth;
  const div2Pdf = () => {
    let input = document.getElementById('chart-pdf') as HTMLDivElement;
    html2canvas(input).then((canvas) => {
      const orientation = window.innerWidth > window.innerHeight ? 'l' : 'p';
      const img = canvas.toDataURL('image/png');
      const pdf = new PdfConverter(orientation, 'px');
      pdf.addImage(img, 'png', 20, 20, 0, 0);
      pdf.save('evaluation.pdf');
    });
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
      <Box id="chart-pdf" mb="10px">
        <Bar
          data={{
            labels: questionNames,
            datasets: [
              {
                label: 'Evaluation Result',
                data: data,
                backgroundColor: ['#B7791F'],
                borderColor: ['#B7791F'],
                borderWidth: 1,
              },
            ],
          }}
          height={600}
          width={usedBarWidth}
          options={{
            indexAxis: 'y',
            responsive: true,
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
                      case 0.5:
                        return 'Low-quality';
                      case 1.5:
                        return 'Moderate';
                      case 2.5:
                        return 'Accomplished';
                      default:
                        return '';
                    }
                  },
                },
              },
            },
            scale: {
              stepSize: 0.5,
            },
          }}
        />
      </Box>
      <ButtonGroup size="sm" isAttached variant="outline" onClick={div2Pdf}>
        <Button mr="-px">Save Result</Button>
        <IconButton aria-label="Save Result" icon={<DownloadIcon />} />
      </ButtonGroup>
    </Box>
  );
};

export default EvaluationBarChart;
