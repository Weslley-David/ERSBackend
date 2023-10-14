import * as crypto from 'crypto';
require('dotenv').config()

export function generateSHA256(input: string): string {
  input = input + (process.env.SALT + "")
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}
