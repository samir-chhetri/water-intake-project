export const validateData = (schema, data) => {
  const validatedData = schema.safeParse(data);
  return validatedData;
};
