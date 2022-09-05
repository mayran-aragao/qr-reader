import { getRealm } from "../databases/realm";
import api from "../api";

export const sendProductsToApi = async () => {
  const realm = await getRealm();
  const sentDate = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  const unsentProducts = realm
    .objects("Product")
    .filtered(`sentDate = ${null}`)
    .snapshot();
  const unsentCount = unsentProducts.length;
  if (unsentProducts.length) {
    realm.write(() => {
      unsentProducts.map((product) => {
        product["sentDate"] = sentDate;
        api(product);
      });
    });
  }
  return unsentCount;
};
