import { fetchAPI } from './api';

export async function getEvaluations(locale: string | undefined) {
  const data = await fetchAPI(
    `
    query Evaluations($locale: String){
      evaluations(sort: "created_at:desc", locale: $locale) {
        name
        evaluationPath
        slug
        excerpt
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
        id
        name
        description
        type
        coverImage {
          url
        }
        evaluationQuestions(sort: "order:asc") {
          name
          evaluationQuestionAnswers(sort: "value:asc") {
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
        evaluationDigitalSkills(sort: "order:asc") {
            id
            name
            desc
            dataColor
            digitalSkillQuestions(sort: "order:asc") {
                id
                name
                desc
                digitalSkillQuestionAnswers(sort: "value:asc") {
                    id
                    name
                    value
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
