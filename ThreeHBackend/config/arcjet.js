import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node"; // ✅ Correct import

const aj = arcjet({
  key: process.env.ARCJET_KEY, // ✅ Use environment variable properly
  characteristics: ["ip.src"],

  rules: [
    // Shield: protection against attacks
    shield({ mode: "LIVE" }),

    // Bot detection rule
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Allow Google, Bing, etc.
      ],
    }),

    // Token bucket rate limiting
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,  // tokens per interval
      interval: 10,   // in seconds
      capacity: 10,   // max tokens
    }),
  ],
});

export default aj;
