import { signatureConfig } from './signatureConfig';
import * as fs from 'fs';
import * as crypto from 'crypto';

/**
 * 生成 SignedProperties 部分的 JSON 数据
 * @returns SignedProperties JSON 数据
 */
export function generateSignedProperties(): any {
  // 获取签名时间
  const signingTime = new Date().toISOString();

  // 获取证书信息
  const certPem = fs.readFileSync(signatureConfig.certificatePath, 'utf-8');
  const certDigest = computeDigest(certPem); // 计算证书的摘要

  // 生成 SignedProperties 数据
  return {
    SignedSignatureProperties: {
      SigningTime: signingTime,
      SigningCertificate: {
        Cert: {
          CertDigest: {
            DigestMethod: {
              Algorithm: 'http://www.w3.org/2001/04/xmlenc#sha256'
            },
            DigestValue: certDigest // PropsDigest
          },
          IssuerSerial: {
            X509IssuerName: 'Company Name', // 此处需要填写签发证书的组织名称
            X509SerialNumber: '379112742831380471835263969587287663520637587' // 此处需要填写证书的序列号
          }
        }
      }
    }
  };
}

/**
 * 计算数据的摘要值
 * @param data 要计算摘要的证书数据
 * @returns Base64 编码的摘要值
 */
function computeDigest(data: string): string {
  const buffer = Buffer.from(data, 'utf-8');
  const hash = crypto.createHash('sha256');
  hash.update(buffer);
  return hash.digest('base64');
}
