export const ProductSchema = {
  name: "Product",
  properties: {
    _id: "int",
    status: "string",
    recordedDate: "date",
    sentDate: "date?",
    data: "object",
  },
  primaryKey: "_id",
};
