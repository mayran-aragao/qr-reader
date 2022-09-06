import { ProductSchema } from "../databases/schemas/ProductSchema";
import Realm from "realm";

it("returning empty product list", async () => {
  const config = {
    schema: [ProductSchema],
    path: "localOnly.realm",
    schemaVersion: 3,
  };
  const realm = await Realm.open(config);
  const products = realm.objects("Product").sorted("sentDate").toJSON();
  expect(products).toHaveLength(0);
  realm.close();
  Realm.deleteFile(config);
 
});

it("returning product populate list", async () => {
  const config = {
    schema: [ProductSchema],
    path: "localOnly.realm",
    schemaVersion: 3,
  };
  const realm = await Realm.open(config);
  

  const dataToSend = {
    _id: "95184411-de1b-400f-9117-4912dcc2d4e9",
    status: "Entregue",
    recordedDate: new Date(),
    data: '{"cornerPoints":[{"y":381.4545593261719,"x":218.90908813476562},{"y":375.2727355957031,"x":285.81817626953125},{"y":423.6363525390625,"x":286.5454406738281},{"y":430.18182373046875,"x":218.90908813476562}],"type":1,"data":"91260030","target":3105,"bounds":{"size":{"width":67.6363525390625,"height":54.909088134765625},"origin":{"y":375.2727355957031,"x":218.90908813476562}}}',
    deliveryManLocation:
      '{"timestamp":1662393968647,"mocked":false,"coords":{"altitude":93,"heading":0,"altitudeAccuracy":1.5432147979736328,"latitude":-5.1931443,"speed":0,"longitude":-42.7681646,"accuracy":20}}',
  };
  realm.write(() => {
    realm.create("Product", dataToSend);
  });
  const products = realm.objects("Product").sorted("sentDate").toJSON();
  expect(products).toHaveLength(1);
  realm.close();
  Realm.deleteFile(config);
  
});
