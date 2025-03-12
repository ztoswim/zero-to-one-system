import { generateSignedInfo } from './generateSignedInfo';
import { generateSignatureValue } from './generateSignatureValue';
import { generateSignedProperties } from './generateSignedProperties';
import { generateKeyInfo } from './generateKeyInfo'; // 引入 generateKeyInfo

/**
 * 生成完整的数字签名结构
 * @param documentJson 要签名的文档数据
 * @returns 完整的数字签名 JSON 数据
 */
export function generateDigitalSignature(documentJson: any): any {
  // Step 1: 生成 SignedInfo
  const signedInfoJson = generateSignedInfo(documentJson);

  // Step 2: 生成 SignatureValue (使用私钥签名 SignedInfo)
  const signatureValue = generateSignatureValue(signedInfoJson);

  // Step 3: 生成 SignedProperties
  const signedPropertiesJson = generateSignedProperties();

  // Step 4: 生成 KeyInfo
  const keyInfoJson = generateKeyInfo(); // 获取证书信息

  // Step 5: 整合成完整的数字签名结构
  return {
    DigitalSignature: {
      UBLDocumentSignatures: {
        SignatureInformation: {
          SignedInfo: signedInfoJson.SignedInfo,
          SignatureValue: signatureValue,
          KeyInfo: keyInfoJson.KeyInfo, // 插入 KeyInfo
          Object: {
            QualifyingProperties: {
              Target: 'signature',
              SignedProperties: signedPropertiesJson
            }
          }
        }
      }
    }
  };
}
