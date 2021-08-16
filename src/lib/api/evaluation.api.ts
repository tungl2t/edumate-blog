import { fetchAPI } from './api';

export async function getEvaluations(locale: string | undefined) {
  const data = await fetchAPI(
    `
    query Evaluations($locale: String){
      evaluations(sort: "created_at:desc", locale: $locale) {
        name
        evaluationPath
        slug
        description
        coverImage {
          url
        }
      }
    }
  `,
    {
      variables: {
        locale,
      },
    },
  );
  return data?.evaluations;
}

export async function getEvaluationByPath(evaluationPath: string, locale: string | undefined) {
  return await fetchAPI(
    `
    query EvaluationByPath($where: JSON,  $locale: String){
      evaluations(where: $where, locale: $locale) {
        name
        type
        coverImage {
          url
        }
        evaluationQuestions {
          name
          evaluationQuestionAnswers {
            name
            value
          }
        }
        evaluationDomains(sort: "order:asc") {
            name
            dimensions(sort: "order:asc") {
                name
                sign
                subDimensions(sort: "order:asc") {
                    name
                    minValue
                    maxValue
                }
            }
        }
      }
    }
  `,
    {
      variables: {
        locale,
        where: {
          evaluationPath,
        },
      },
    },
  );
}
