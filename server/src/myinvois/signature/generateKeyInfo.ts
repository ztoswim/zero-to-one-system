import * as fs from 'fs';
import { signatureConfig } from './signatureConfig';

/**
 * 生成 `<ds:KeyInfo>`，包含 X.509 证书。
 * @returns XML 片段
 */
export function generateKeyInfo(): any {
  // 读取证书
  const certPem = fs.readFileSync(signatureConfig.certificatePath, 'utf-8');

  // 提取 Base64 证书内容（去掉 PEM 头尾）
  const certBase64 = certPem
    .replace(/-----BEGIN CERTIFICATE-----/g, '')
    .replace(/-----END CERTIFICATE-----/g, '')
    .replace(/\s+/g, '');

  // 返回 KeyInfo XML 结构
  return {
    KeyInfo: {
      X509Data: {
        X509Certificate: certBase64 // Base64 编码的证书
      }
    }
  };
}
