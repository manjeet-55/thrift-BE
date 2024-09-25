import crypto from "crypto";

const SECRET = "THRIFT-API";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const responseGenerator = (data: any, code: number, message: string) => {
  return {
    data,
    code,
    message,
  };
};
