import { generateAddressJSON, Address } from "./address";

export interface Buyer {
  name: string;
  tin: string;
  registrationNumber: string;
  registrationScheme: string;
  sst: string;
  email?: string;
  address: Address;
  contact: string;
}

/**
 * 生成买家 JSON
 * @param buyer 买家对象
 * @returns JSON 格式的买家数据
 */
export function generateBuyerJSON(buyer: Buyer): any {
  return {
    name: buyer.name,
    tin: buyer.tin,
    registrationNumber: buyer.registrationNumber,
    registrationScheme: buyer.registrationScheme,
    sst: buyer.sst,
    email: buyer.email || "",
    contact: buyer.contact,
    address: generateAddressJSON(buyer.address), // 使用 `generateAddressJSON`
  };
}
