import Realm, { schemaVersion } from "realm";
import { ProductSchema } from "./schemas/ProductSchema";

export const getRealm = async () =>
  await Realm.open({
    path: "qr-reader",
    schema:[ProductSchema],
    schemaVersion:3,
  });
