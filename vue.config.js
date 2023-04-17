const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    pwa: {
        name: "Altara Bnpl",
        themeColor: "#074A74",
        workboxOptions: {
            exclude: ["_redirects"],
        },
    },
});
