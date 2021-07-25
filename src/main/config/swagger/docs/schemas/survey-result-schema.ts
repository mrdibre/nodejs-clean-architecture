const saveSurveyParamsSchema = {
  type: "object",
  properties: {
    answer: {
      type: "string",
    },
  },
};

const surveyResultSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    surveyId: {
      type: "string",
    },
    accountId: {
      type: "string",
    },
    answer: {
      type: "string",
    },
    date: {
      type: "string",
    },
  },
};

export { surveyResultSchema, saveSurveyParamsSchema };
