const babelJest = require("babel-jest");

const babelConfig = {
    "presets": [
        ["@babel/preset-env", {
            "targets": {
                "node": "10"
            }
        }],
        "@babel/preset-react"
    ],
    "plugins": ["@babel/plugin-proposal-class-properties"]
};

module.exports = babelJest.createTransformer(babelConfig);
