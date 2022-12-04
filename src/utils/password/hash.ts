import { createHash } from "crypto";

export function hash(string: string) {
  const hash = createHash("sha256").update(string).digest("hex");

  return hash;
}
