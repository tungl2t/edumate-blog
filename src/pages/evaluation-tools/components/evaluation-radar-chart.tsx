import { Bar, Line, Radar } from 'react-chartjs-2';
import { Box, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import PdfConverter from 'jspdf';
import { DownloadIcon } from '@chakra-ui/icons';
import { useTranslations } from 'next-intl';

type Props = {
  info: string[];
  data: number[];
  dataName: string[];
};

const EvaluationRadarChart = ({ info, data, dataName }: Props) => {
  const t = useTranslations('EvaluationTool');
  const width = window.innerWidth * 0.95;
  const usableWith = width > 960 ? 960 : width;
  const div2Pdf = (isPDF = true) => {
    let input = document.getElementById('chart-radar-pdf') as HTMLDivElement;
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
      <Box id="chart-radar-pdf">
        <Radar
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
          height={500}
          width={usableWith}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: 15,
            },
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
            },
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
      </Box>
      <Box>
        <ButtonGroup size="sm" isAttached variant="outline" onClick={() => div2Pdf()} mx={1}>
          <Button>{t('save')}(PDF) </Button>
          <IconButton aria-label="Save Result PDF" icon={<DownloadIcon />} />
        </ButtonGroup>
        <ButtonGroup size="sm" isAttached variant="outline" onClick={() => div2Pdf(false)} mx={1}>
          <Button>{t('save')} (PNG)</Button>
          <IconButton aria-label="Save Result PNG" icon={<DownloadIcon />} />
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default EvaluationRadarChart;
