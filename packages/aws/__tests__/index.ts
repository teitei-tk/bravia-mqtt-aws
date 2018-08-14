import * as fs from "fs";
import { CertificateClient } from "../lib";

describe("@teitei-tk/bravia-aws-package", () => {
  let client: CertificateClient;
  beforeEach(() => {
    client = new CertificateClient();
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
