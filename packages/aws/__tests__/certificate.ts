import * as fs from "fs";
import * as assert from "assert";

import { CertificateClient } from "../lib";
import { CertificateInterface } from "../lib/certificate";

class TestCertificateClient implements CertificateInterface {
  certsDirPath(): string {
    return "./tmp";
  }

  certKeyPath(): string {
    return `${this.certsDirPath()}/cert.txt`;
  }

  privateKeyPath(): string {
    return `${this.certsDirPath()}/private.txt`;
  }

  publicKeyPath(): string {
    return `${this.certsDirPath()}/public.txt`;
  }

  rootKeyPath(): string {
    return `${this.certsDirPath()}/root.txt`;
  }
}

describe("@teitei-tk/bravia-aws-package", () => {
  describe("CertificateClient", () => {
    let client: CertificateClient;
    beforeAll(() => {
      client = new CertificateClient(new TestCertificateClient());

      // mkdir
      const mkdirReuslt = fs.mkdirSync(client.certsDirPath());
      assert.equal(mkdirReuslt, undefined);

      const certKeyResult = fs.writeFileSync(client.certKeyPath(), "");
      assert.equal(certKeyResult, undefined);

      const privateKeyResult = fs.writeFileSync(client.privateKeyPath(), "");
      assert.equal(privateKeyResult, undefined);

      const publicKeyResult = fs.writeFileSync(client.publicKeyPath(), "");
      assert.equal(publicKeyResult, undefined);

      const rootKeyResult = fs.writeFileSync(client.rootKeyPath(), "");
      assert.equal(rootKeyResult, undefined);
    });

    afterAll(() => {
      const certKeyResult = fs.unlinkSync(client.certKeyPath());
      assert.equal(certKeyResult, undefined);

      const privateKeyResult = fs.unlinkSync(client.privateKeyPath());
      assert.equal(privateKeyResult, undefined);

      const publicKeyResult = fs.unlinkSync(client.publicKeyPath());
      assert.equal(publicKeyResult, undefined);

      const rootKeyResult = fs.unlinkSync(client.rootKeyPath());
      assert.equal(rootKeyResult, undefined);

      // rmdir
      const result = fs.rmdirSync(client.certsDirPath());
      assert.equal(result, undefined);
    });

    it("certs dir exists?", () => {
      const result = fs.existsSync(client.certsDirPath());
      expect(result).toBeTruthy();
    });

    it("certs key exists?", () => {
      const result = fs.existsSync(client.certKeyPath());
      expect(result).toBeTruthy();
    });

    it("private key exists?", () => {
      const result = fs.existsSync(client.privateKeyPath());
      expect(result).toBeTruthy();
    });

    it("public key exists?", () => {
      const result = fs.existsSync(client.publicKeyPath());
      expect(result).toBeTruthy();
    });

    it("root key exists?", () => {
      const result = fs.existsSync(client.rootKeyPath());
      expect(result).toBeTruthy();
    });
  });
});
