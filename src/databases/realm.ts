import Realm from "realm";
import { ProductSchema } from "./schemas/ProductSchema";

const realm = Realm.open({
  path: "qr-reader",
  schema: [ProductSchema],
  schemaVersion: 3,
});

export const getRealm = () => realm
  
