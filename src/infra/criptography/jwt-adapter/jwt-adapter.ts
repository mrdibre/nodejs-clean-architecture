import jwt from "jsonwebtoken";
import { Encrypter } from "../../../data/protocols";

class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret);
  }
}

export { JwtAdapter };
