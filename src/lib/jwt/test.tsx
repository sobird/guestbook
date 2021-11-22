const { SignJWT } = require("jose");

const test = async () => {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti("1212")
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode("112"));
};

test();
