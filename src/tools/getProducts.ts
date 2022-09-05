import { getRealm } from "../databases/realm";

export const getProducts = async () => {
  const realm = await getRealm();
  return realm.objects("Product").sorted("sentDate").toJSON();
};
