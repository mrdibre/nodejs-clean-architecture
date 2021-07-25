const surveyAnswerSchema = {
  type: "object",
  properties: {
    image: {
      type: "string",
    },
    answer: {
      type: "string",
    },
  },
};

const surveySchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    question: {
      type: "string",
    },
    answers: {
      type: "array",
      items: {
        $ref: "#/schemas/surveyAnswer",
      },
    },
    date: {
      type: "string",
    },
  },
};

const surveysSchema = {
  type: "array",
  items: {
    $ref: "#/schemas/survey",
  },
};

export { surveySchema, surveysSchema, surveyAnswerSchema };
