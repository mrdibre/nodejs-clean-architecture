import bcrypt from "bcrypt";
import { Hasher } from "../../../data/protocols";

class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hashed = await bcrypt.hash(value, this.salt);
    return hashed;
  }
}

export { BcryptAdapter };
