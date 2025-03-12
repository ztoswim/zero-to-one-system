export interface Address {
  addressLine0: string;
  addressLine1?: string;
  addressLine2?: string;
  postalZone?: string;
  cityName: string;
  state: string;
  country: string;
}

/**
 * 生成 JSON 格式的地址
 * @param address 地址对象
 * @returns 地址的 JSON 结构
 */
export function generateAddressJSON(address: Address): any {
  return {
    addressLine0: address.addressLine0,
    addressLine1: address.addressLine1 || "",
    addressLine2: address.addressLine2 || "",
    postalZone: address.postalZone || "",
    cityName: address.cityName,
    state: address.state,
    country: address.country,
  };
}
