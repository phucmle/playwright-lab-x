module.exports = {
  default: {
    require: ["src/tests/steps/*.ts"],
    paths: ["src/tests/features/*.feature"],
    formatOptions: { snippetInterface: "async-await" },
    requireModule: ["ts-node/register"],
    // publishQuiet: true,
  },
};
