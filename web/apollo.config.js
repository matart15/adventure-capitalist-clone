module.exports = {
  client: {
    name: "Apollo CLI",
    service: "engine@prod",
    includes: ["./src/**/*.tsx", "./src/**/*.ts"],
    excludes: ["**/*.test.ts", "**/__tests__/*"],
    service: {
      // remote endpoint
      name: "sever",
      url: "http://localhost:4000",
    },
  },
  engine: {
    endpoint: "http://localhost:4000",
  },
  outputFlat: "./src/graphqlTypes.ts",
};
