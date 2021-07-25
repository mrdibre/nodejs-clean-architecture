const surveyPath = {
  get: {
    security: [{ apiKeyAuth: [] }],
    tags: ["Survey"],
    summary: "List all surveys",
    responses: {
      200: {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/surveys",
            },
          },
        },
      },
      401: {
        $ref: "#/components/unauthorized",
      },
      403: {
        $ref: "#/components/forbidden",
      },
      500: {
        $ref: "#/components/serverError",
      },
    },
  },
  post: {
    security: [{ apiKeyAuth: [] }],
    tags: ["Survey"],
    summary: "Create a survey",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/addSurveyParams",
          },
        },
      },
    },
    responses: {
      204: {
        description: "Successful operation",
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

export { surveyPath };
