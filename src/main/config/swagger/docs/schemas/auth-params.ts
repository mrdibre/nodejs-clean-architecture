const loginParamsSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["email", "password"],
};

const signUpParamsSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    passwordConfirmation: {
      type: "string",
    },
  },
  required: ["name", "email", "password", "passwordConfirmation"],
};

export { loginParamsSchema, signUpParamsSchema };
