import bcrypt from "bcrypt";
import { Encrypter } from "../../../data/protocols/criptography/encrypter";

class BcryptAdapter implements Encrypter {
  constructor(private readonly salt: number) {}

  async encrypt(value: string): Promise<string> {
    const hashed = await bcrypt.hash(value, this.salt);
    return hashed;
  }
}

export { BcryptAdapter };
