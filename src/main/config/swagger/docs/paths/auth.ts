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
      400: {
        $ref: "#/components/badRequest",
      },
      401: {
        $ref: "#/components/unauthorized",
      },
      500: {
        $ref: "#/components/serverError",
      },
    },
  },
};

const signupPath = {
  post: {
    tags: ["Auth"],
    summary: "Create an user",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/signupParams",
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
      400: {
        $ref: "#/components/badRequest",
      },
      401: {
        $ref: "#/components/unauthorized",
      },
      500: {
        $ref: "#/components/serverError",
      },
    },
  },
};

export { signupPath, loginPath };
