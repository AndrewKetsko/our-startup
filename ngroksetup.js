const ngrok = require("@ngrok/ngrok");

const ingress = async () => {
  const listener = await ngrok.forward({
    addr: process.env.PORT,
    // authtoken_from_env: true,
    authtoken: process.env.AUTH_TOKEN,
    domain: process.env.DOMAIN,
    // verify_webhook_provider: "instagram",
    // verify_webhook_secret: "{some secret}",
  });

  console.log(`available at: ${listener.url()}`);
};

module.exports = { ingress };
