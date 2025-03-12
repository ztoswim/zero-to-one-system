import { computeDigest } from './generateDigest';
import * as fs from 'fs';
import { signatureConfig } from './signatureConfig';

/**
 * 生成 XAdES Signed Properties 部分的 JSON 数据
 * @returns XAdES Signed Properties JSON 数据
 */
export function generateXAdESSignedProperties(): any {
  const certPem = fs.readFileSync(signatureConfig.certificatePath, 'utf-8');
  const certDigest = computeDigest(certPem); // 计算证书的摘要

  return {
    Reference: {
      URI: '#id-xades-signed-props',
      DigestMethod: {
        Algorithm: 'http://www.w3.org/2001/04/xmlenc#sha256'
      },
      DigestValue: certDigest
    }
  };
}
