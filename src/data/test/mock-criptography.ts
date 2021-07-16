import { Encrypter, HashComparer, Hasher } from "@/data/protocols";
import { Decrypter } from "@/data/protocols/criptography/decrypter";

const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string) {
      return "hashed_password";
    }
  }

  return new HasherStub();
};

const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string) {
      return "any_value";
    }
  }

  return new DecrypterStub();
};

const mockEncrypter = (): Encrypter => {
  class TokenGeneratorStub implements Encrypter {
    async encrypt(id: string): Promise<string> {
      return "any_token";
    }
  }

  return new TokenGeneratorStub();
};

const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return true;
    }
  }

  return new HashComparerStub();
};

export { mockHasher, mockDecrypter, mockEncrypter, mockHashComparer };
