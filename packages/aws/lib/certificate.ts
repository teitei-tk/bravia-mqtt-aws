export interface CertificateInterface {
  certsDirPath(): string;
  certKeyPath(): string;
  privateKeyPath(): string;
  publicKeyPath(): string;
  rootKeyPath(): string;
}

export class EnvironmentCertificate implements CertificateInterface {
  certsDirPath(): string {
    return process.env["CERTS_DIR"];
  }

  certKeyPath(): string {
    return process.env["CERT_KEY_PATH"];
  }

  privateKeyPath(): string {
    return process.env["PRIVATE_KEY_PATH"];
  }

  publicKeyPath(): string {
    return process.env["PUBLIC_KEY_PATH"];
  }

  rootKeyPath(): string {
    return process.env["ROOT_KEY_PATH"];
  }
}

export class CertificateClient {
  certificate: CertificateInterface;

  constructor(certificate?: CertificateInterface | null) {
    if (certificate == null) {
      certificate = new EnvironmentCertificate();
    }

    this.certificate = certificate;
  }

  certsDirPath(): string {
    return this.certificate.certsDirPath();
  }

  certKeyPath(): string {
    return this.certificate.certKeyPath();
  }

  privateKeyPath(): string {
    return this.certificate.privateKeyPath();
  }

  publicKeyPath(): string {
    return this.certificate.publicKeyPath();
  }

  rootKeyPath(): string {
    return this.certificate.rootKeyPath();
  }
}
