export interface Supplier {
  name: string;
  tin: string;
  brn: string;
  sst: string;
  tourismTax: string;
  email: string;
  msic: string;
  businessActivity: string;
  address: string;
  telephone: string;
}

/**
 * **固定供应商信息**
 */
export const fixedSupplier: Supplier = {
  name: "ZERO TOO ONE ENTERPRISE",
  tin: "D59797228010",
  brn: "202403098624",
  sst: "NA",
  tourismTax: "NA",
  email: "zerooo.to.ooone@gmail.com",
  msic: "85419",
  businessActivity: "Any other sports and recreation education n.e.c",
  address: "53, JALAN BAKAWALI 10, TAMAN JOHOR JAYA, 81100, JOHOR BAHRU, JOHOR, MALAYSIA",
  telephone: "0108654399",
};

/**
 * **生成供应商 JSON**
 * @param supplier 供应商对象（默认为 `fixedSupplier`）
 * @returns JSON 结构
 */
export function generateSupplierJSON(supplier: Supplier = fixedSupplier): any {
  return {
    name: supplier.name,
    tin: supplier.tin,
    brn: supplier.brn,
    sst: supplier.sst,
    tourismTax: supplier.tourismTax,
    email: supplier.email,
    msic: supplier.msic,
    businessActivity: supplier.businessActivity,
    address: supplier.address,
    telephone: supplier.telephone,
  };
}
