import { computeDigest } from './generateDigest';

/**
 * 生成 Document Signed Data 部分的 JSON 数据
 * @param documentJson 要签名的文档数据
 * @returns Document Signed Data JSON 数据
 */
export function generateDocumentSignedData(documentJson: any): any {
  const documentDigest = computeDigest(JSON.stringify(documentJson)); // 计算文档的摘要

  return {
    Reference: {
      Id: 'id-doc-signed-data',
      URI: '',
      Transforms: [
        {
          Algorithm: 'http://www.w3.org/TR/1999/REC-xpath-19991116',
          XPath: 'not(//ancestor-or-self::ext:UBLExtensions)'
        },
        {
          Algorithm: 'http://www.w3.org/TR/1999/REC-xpath-19991116',
          XPath: 'not(//ancestor-or-self::cac:Signature)'
        },
        {
          Algorithm: 'http://www.w3.org/2006/12/xml-c14n11'
        }
      ],
      DigestMethod: {
        Algorithm: 'http://www.w3.org/2001/04/xmlenc#sha256'
      },
      DigestValue: documentDigest
    }
  };
}
