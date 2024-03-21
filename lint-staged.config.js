/* eslint-disable no-undef */
const { ESLint } = require("eslint");

const removeIgnoredFiles = async (files) => {
    const eslint = new ESLint();
    const ignoredFiles = await Promise.all(
        files.map((file) => eslint.isPathIgnored(file)),
    );
    const filteredFiles = files.filter((_, i) => !ignoredFiles[i]);
    return filteredFiles.join(" ");
};

module.exports = {
    "src/**/*.+(js|jsx|ts|tsx)": [
        "npm run prettier",
        async (files) => {
            const filesToLint = await removeIgnoredFiles(files);
            return [`npm run lint ${filesToLint}`];
        },
    ],
};