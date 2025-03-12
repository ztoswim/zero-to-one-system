export interface SignatureConfig {
    privateKeyPath: string;
    certificatePath: string;
    signatureAlgorithm: string;
    digestAlgorithm: string;
    canonicalizationMethod: string;
    signatureId: string;
  }
  
  export const signatureConfig: SignatureConfig = {
    privateKeyPath: '/path/to/your/private/key.pem',
    certificatePath: '/path/to/your/certificate.pem',
    signatureAlgorithm: 'RSA-SHA256',
    digestAlgorithm: 'SHA256',
    canonicalizationMethod: 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
    signatureId: 'Signature'
  };
  