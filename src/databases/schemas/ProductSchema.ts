export const ProductSchema = {
  name: "Product",
  properties: {
    _id: "string",
    status: "string",
    recordedDate: "date",
    sentDate: "date?",
    data: "string",
    deliveryManLocation:"string"
  },
  primaryKey: "_id",
};
