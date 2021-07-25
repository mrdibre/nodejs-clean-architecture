const badRequest = {
  description: "Invalid Request",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/error",
      },
    },
  },
};

const serverError = {
  description: "Internal Server Error",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/error",
      },
    },
  },
};

const unauthorized = {
  description: "Invalid Credentials",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/error",
      },
    },
  },
};

export { badRequest, serverError, unauthorized };
