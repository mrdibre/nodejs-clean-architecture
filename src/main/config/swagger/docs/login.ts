const loginPath = {
  post: {
    tags: ["Auth"],
    summary: "Authentication",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/loginParams",
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
              $ref: "#/schemas/account",
            },
          },
        },
      },
    },
  },
};

export { loginPath };
