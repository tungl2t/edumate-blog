import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Circle,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { cloneDeep, compact, flattenDeep, flattenDepth, mean, zip } from 'lodash-es';

import { chunkArray } from '@/lib/helper';
import EvaluationDomainType from '@/types/evaluation-domain.type';
import { EChartType } from '@/types/evaluation.type';
import EvaluationModal from './evaluation-modal';
import EvaluationChart from './evaluation-chart';

type Props = {
  evaluationDomains: EvaluationDomainType[];
};

const EvaluationDynamicData = ({ evaluationDomains }: Props) => {
  const t = useTranslations('EvaluationTool');
  const [teacher, setTeacher] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [observer, setObserver] = useState<string>('');
  const [noOfAdults, setNoOfAdults] = useState<string>('');
  const [noOfChildren, setNoOfChildren] = useState<string>('');
  const [info, setInfo] = useState<Array<string>>([]);
  const [firstCycle, setFirstCycle] = useState<number[][][]>([]);
  const [secondCycle, setSecondCycle] = useState<number[][][]>([]);
  const [finalDimensionsAverage, setFinalDimensionsAverage] = useState<number[]>([]);
  const [dimensionNames, setDimensionNames] = useState<string[]>([]);
  const [dimensionSigns, setDimensionSigns] = useState<number[]>([]);
  const [domainLengths, setDomainLengths] = useState<number[]>([]);
  const [domainNames, setDomainNames] = useState<string[]>([]);
  const [finalDomainAverage, setFinalDomainAverage] = useState<number[]>([]);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  useEffect(() => {
    const initValue = evaluationDomains.map((domain) => [
      ...domain.dimensions.map((dimension) => [
        ...dimension.subDimensions.map((subDimension) => 0),
      ]),
    ]);
    const signs = evaluationDomains.map((domain) =>
      domain.dimensions.map((dimension) => (dimension.sign ? 1 : -1)),
    );
    setDomainLengths(evaluationDomains.map((domain) => domain.dimensions.length));
    setDimensionSigns(flattenDeep(signs));
    setFirstCycle(initValue);
    setSecondCycle(initValue);
  }, []);

  useEffect(() => {
    setDimensionNames(
      flattenDeep(
        evaluationDomains.map((domain) => domain.dimensions.map((dimension) => dimension.name)),
      ),
    );

    setDomainNames(evaluationDomains.map((domain) => domain.name));
  }, [evaluationDomains]);

  const handleValueOfEachCycle = (
    domainIndex: number,
    dimensionIndex: number,
    subDimensionIndex: number,
    value: string,
    isFirstCycle = true,
  ) => {
    const intValue = value ? parseInt(value, 10) : 0;
    const tmpArray = isFirstCycle ? cloneDeep(firstCycle) : cloneDeep(secondCycle);
    tmpArray[domainIndex][dimensionIndex][subDimensionIndex] = intValue > 7 ? 7 : intValue;
    isFirstCycle ? setFirstCycle(tmpArray) : setSecondCycle(tmpArray);
  };

  useEffect(() => {
    const tmp = flattenDeep(firstCycle.concat(secondCycle));
    const isInValid = tmp.some((v) => v === 0);
    setIsValidForm(!isInValid);
  }, [firstCycle, secondCycle]);

  const handleChartModal = () => {
    const currentTime = format(Date.now(), 'dd/MM/yyyy - hh:mm a');
    const info = [
      teacher ? `${t('teacher')}: ${teacher}` : '',
      noOfAdults ? `${t('noOfAdults')}: ${noOfAdults}` : '',
      observer ? `${t('observer')}: ${observer}` : '',
      noOfChildren ? `${t('noOfChildren')}: ${noOfChildren}` : '',
      `${t('time')}: ${currentTime}`,
    ];
    setInfo(compact(info));

    const firstCycleDimensionsAverage = flattenDepth(firstCycle, 1).map((dimension) =>
      mean(dimension),
    );
    const secondCycleDimensionsAverage = flattenDepth(secondCycle, 1).map((dimension) =>
      mean(dimension),
    );
    const finalCycleDimensionAverage = zip(
      firstCycleDimensionsAverage,
      secondCycleDimensionsAverage,
    ).map((dimension) => mean(dimension));
    setFinalDimensionsAverage(finalCycleDimensionAverage);
    const finalDimensionAverageWithSign = finalCycleDimensionAverage.map(
      (value, index) => value * dimensionSigns[index],
    );
    const domainAverage = chunkArray(finalDimensionAverageWithSign, domainLengths).map((d) =>
      mean(d),
    );
    setFinalDomainAverage(domainAverage);
  };

  return (
    <Box>
      <Input
        variant="flushed"
        placeholder={t('teachers') as string}
        value={teacher}
        onChange={(event) => setTeacher(event.target.value)}
      />
      <Input
        variant="flushed"
        placeholder={t('noOfAdults') as string}
        value={noOfAdults}
        type="number"
        onChange={(event) => setNoOfAdults(event.target.value)}
      />
      <Input
        variant="flushed"
        placeholder={t('subject') as string}
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
      />
      <Input
        variant="flushed"
        placeholder={t('observer') as string}
        value={observer}
        onChange={(event) => setObserver(event.target.value)}
      />
      <Input
        variant="flushed"
        placeholder={t('noOfChildren') as string}
        value={noOfChildren}
        type="noOfChildren"
        onChange={(event) => setNoOfChildren(event.target.value)}
      />

      {evaluationDomains?.map((domain: EvaluationDomainType, domainIndex: number) => (
        <Box key={domainIndex}>
          <Heading fontSize="1.25em" color="yellow.600" my="1em" textTransform="uppercase">
            {domain.name}
          </Heading>
          <Accordion allowToggle>
            {domain?.dimensions?.map((dimension, dimensionIndex) => (
              <AccordionItem key={dimensionIndex}>
                <AccordionButton display="flex" justifyContent="space-between">
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <Circle size="40px" bg="yellow.600">
                      <Text fontWeight="bold" color="#fff" fontSize="0.75rem">
                        {dimensionIndex + 1}
                      </Text>
                    </Circle>
                    <Text ml="1rem" fontWeight="600" textAlign="left">
                      {dimension.name}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p={0}>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th pr={0}>{t('subDimensions')}</Th>
                        <Th p={0} pr={2} textAlign="center">
                          {t('cycle1')}
                        </Th>
                        <Th p={0} textAlign="center">
                          {t('cycle2')}
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dimension?.subDimensions?.map((subDimension, subDimensionIndex) => (
                        <Tr key={subDimensionIndex}>
                          <Td pr={0} fontSize="0.85em">
                            {subDimension.name}
                          </Td>
                          <Td p={0} pr={2}>
                            <NumberInput
                              m="auto"
                              minW={20}
                              maxW={25}
                              value={
                                firstCycle?.[domainIndex]?.[dimensionIndex]?.[subDimensionIndex]
                              }
                              min={subDimension.minValue}
                              max={subDimension.maxValue}
                              step={1}
                              clampValueOnBlur={false}
                              errorBorderColor="red.400"
                              onChange={(value) => {
                                handleValueOfEachCycle(
                                  domainIndex,
                                  dimensionIndex,
                                  subDimensionIndex,
                                  value,
                                );
                              }}
                            >
                              <NumberInputField textAlign="center" />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </Td>
                          <Td p={0}>
                            <NumberInput
                              m="auto"
                              minW={20}
                              maxW={25}
                              value={
                                secondCycle?.[domainIndex]?.[dimensionIndex]?.[subDimensionIndex] ??
                                0
                              }
                              min={subDimension.minValue}
                              max={subDimension.maxValue}
                              step={1}
                              clampValueOnBlur={false}
                              errorBorderColor="red.400"
                              onChange={(value) => {
                                handleValueOfEachCycle(
                                  domainIndex,
                                  dimensionIndex,
                                  subDimensionIndex,
                                  value,
                                  false,
                                );
                              }}
                            >
                              <NumberInputField textAlign="center" />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      ))}
      <EvaluationModal handleData={handleChartModal} isValidData={isValidForm} info={info}>
        <EvaluationChart
          chartType={EChartType.LINE}
          data={finalDimensionsAverage}
          dataName={dimensionNames}
        />
        <EvaluationChart
          chartType={EChartType.RADAR}
          data={finalDomainAverage}
          dataName={domainNames}
        />
      </EvaluationModal>
    </Box>
  );
};

export default EvaluationDynamicData;
