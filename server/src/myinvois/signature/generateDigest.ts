import * as crypto from 'crypto';

/**
 * 计算摘要值
 * @param data 数据
 * @param algorithm 摘要算法（默认使用 SHA256）
 * @returns Base64 编码的摘要值
 */
export function computeDigest(data: string | Buffer, algorithm: string = 'SHA256'): string {
  const buffer = (typeof data === 'string') ? Buffer.from(data, 'utf-8') : data;
  const hash = crypto.createHash(algorithm);
  hash.update(buffer);
  return hash.digest('base64');
}
