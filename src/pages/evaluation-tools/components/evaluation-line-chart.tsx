import { Bar, Line } from 'react-chartjs-2';
import { Box, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import PdfConverter from 'jspdf';
import { DownloadIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  evaluationTitle: string;
  info: string[];
  data: number[];
  dataName: string[];
};

const EvaluationLineChart = ({ info, data, dataName }: Props) => {
  const t = useTranslations('EvaluationTool');
  const barWidth = window.innerWidth * 0.95;
  const usedBarWidth = barWidth > 960 ? 960 : barWidth;
  const div2Pdf = (isPDF = true) => {
    let input = document.getElementById('chart-line-pdf') as HTMLDivElement;
    html2canvas(input).then((canvas) => {
      const orientation = window.innerWidth > window.innerHeight ? 'l' : 'p';
      const img = canvas.toDataURL('image/png');
      if (isPDF) {
        const pdf = new PdfConverter(orientation, 'px', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const widthRatio = pageWidth / canvas.width;
        const heightRatio = pageHeight / canvas.height;
        const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
        const canvasWidth = canvas.width * ratio;
        const canvasHeight = canvas.height * ratio;
        const marginX = (pageWidth - canvasWidth) / 2;
        const marginY = (pageHeight - canvasHeight) / 2;

        pdf.addImage(img, 'png', marginX, marginY, canvasWidth, canvasHeight);
        pdf.save('evaluation.pdf');
      } else {
        const a = document.createElement('a');
        a.href = img;
        a.download = 'evalutation.png';
        a.click();
      }
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
      <Box id="chart-line-pdf" mb="10px">
        <Line
          data={{
            labels: dataName,
            datasets: [
              {
                label: 'Evaluation Result',
                data: data,
                backgroundColor: ['#b7791f61'],
                borderColor: ['#B7791F'],
                borderWidth: 1,
                fill: true,
              },
            ],
          }}
          height={600}
          width={usedBarWidth}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: 25,
            },
            plugins: {
              // chartAreaBorder: {
              //   borderColor: 'red',
              //   borderWidth: 2,
              //   borderDash: [5, 5],
              //   borderDashOffset: 2,
              // },
              title: {
                display: true,
                text: info,
                align: 'start',
                padding: {
                  top: 20,
                  bottom: 20,
                },
              },
            },
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
                  // display: false,
                  drawBorder: false,
                  drawOnChartArea: false,
                  // drawTicks: false,
                },
              },
            },
          }}
        />
      </Box>
      <Box>
        <ButtonGroup size="sm" isAttached variant="outline" onClick={() => div2Pdf()} mx={1}>
          <Button>{t('save')} (PDF) </Button>
          <IconButton aria-label="Save Result PNG" icon={<DownloadIcon />} />
        </ButtonGroup>
        <ButtonGroup size="sm" isAttached variant="outline" onClick={() => div2Pdf(false)} mx={1}>
          <Button>{t('save')} (PNG) </Button>
          <IconButton aria-label="Save Result PNG" icon={<DownloadIcon />} />
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default EvaluationLineChart;
