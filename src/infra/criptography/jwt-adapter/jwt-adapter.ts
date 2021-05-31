import jwt from "jsonwebtoken";
import { Encrypter } from "../../../data/protocols";
import { Decrypter } from "../../../data/protocols/criptography/decrypter";

class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret);
  }

  async decrypt(token: string): Promise<string> {
    await jwt.verify(token, this.secret);

    return null;
  }
}

export { JwtAdapter };
