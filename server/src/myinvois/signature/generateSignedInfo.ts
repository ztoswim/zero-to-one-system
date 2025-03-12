import { generateDocumentSignedData } from './generateDocumentSignedData.ts';
import { generateXAdESSignedProperties } from './generateXAdESSignedProperties.ts';

/**
 * 生成 ds:SignedInfo 部分的 JSON 数据
 * @param documentJson 要签名的文档数据
 * @returns ds:SignedInfo JSON 数据
 */
export function generateSignedInfo(documentJson: any): any {
  const documentSignedDataJson = generateDocumentSignedData(documentJson); // 生成 Document Signed Data 部分
  const xadesSignedPropertiesJson = generateXAdESSignedProperties(); // 生成 XAdES Signed Properties 部分

  return {
    SignedInfo: {
      CanonicalizationMethod: {
        Algorithm: 'https://www.w3.org/TR/xml-c14n11/#'
      },
      SignatureMethod: {
        Algorithm: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256'
      },
      Reference: [
        {
          ...documentSignedDataJson.Reference, // 引用 Document Signed Data 的 DocDigest
          Id: 'id-doc-signed-data', // Reference 对应的 ID
          URI: ''
        },
        {
          ...xadesSignedPropertiesJson.Reference, // 引用 XAdES Signed Properties 的 PropsDigest
          Id: 'id-xades-signed-props', // Reference 对应的 ID
          URI: '#id-xades-signed-props'
        }
      ]
    }
  };
}
