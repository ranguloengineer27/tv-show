const config = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "jsdom",

    extensionsToTreatAsEsm: [".ts", ".tsx"],

    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
        "^.+\\.js$": ["babel-jest", { presets: [["@babel/preset-env", { targets: { node: "current" } }]] }],
    },

    transformIgnorePatterns: [
        "node_modules/(?!(\\.pnpm|msw|@mswjs|until-async)/)"
    ],

    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },

    setupFilesAfterEnv: ["<rootDir>/jest.polyfills.ts", "<rootDir>/jest.setup.ts"],
};

module.exports = config;
