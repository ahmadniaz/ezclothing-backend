module.exports = ({ env }) => ({
  url: env("MY_HEROKU_URL"),
  proxy: true,
  app: {
    keys: env.array("APP_KEYS", [
      "e44POm+lt8nhwRw3A/Snxg==",
      "TzHmBwSwA0l4pxQTXJZRtA==",
      "tE03gweRqa8/n7oeD3AWuA==",
      "u/lgUazifXhN4l65JdPhxQ==",
    ]),
  },
});
