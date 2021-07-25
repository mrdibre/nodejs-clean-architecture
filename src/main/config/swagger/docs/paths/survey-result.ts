const surveyResultPath = {
  put: {
    security: [{ apiKeyAuth: [] }],
    tags: ["Survey"],
    summary: "Create an Survey Result",
    parameters: [
      {
        in: "path",
        name: "surveyId",
        required: true,
        schema: {
          type: "string",
          description: "ID of given survey",
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/saveSurveyParams",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/surveyResult",
            },
          },
        },
      },
      403: {
        $ref: "#/components/forbidden",
      },
      500: {
        $ref: "#/components/serverError",
      },
    },
  },
};

export { surveyResultPath };
