import * as fs from 'fs';
import * as crypto from 'crypto';
import { signatureConfig } from './signatureConfig';

/**
 * 生成 `<ds:SignatureValue>`，使用私钥对 `SignedInfo` 进行 RSA-SHA256 签名。
 * @param signedInfoJson 已生成的 `SignedInfo` JSON 数据
 * @returns Base64 编码的签名值字符串
 */
export function generateSignatureValue(signedInfoJson: any): string {
  const privateKeyPem = fs.readFileSync(signatureConfig.privateKeyPath, 'utf-8');
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(JSON.stringify(signedInfoJson)); // 使用 JSON 数据进行签名
  signer.end();
  return signer.sign(privateKeyPem, 'base64');
}
