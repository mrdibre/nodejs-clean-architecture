const apiKeyAuthSchema = {
  type: "apiKey",
  in: "header",
  name: "x-access-token",
};

export { apiKeyAuthSchema };
