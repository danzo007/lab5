import { defineConfig } from "vite";
import pugPlugin from "vite-plugin-pug";

const options = { pretty: true };
const locals = { name: "my Pug" };

export default defineConfig({
    plugins: [pugPlugin(undefined, { pagesUrl : "./pages/"})],
    build: {
        minify: false,
        rollupOptions: {
            output: {
                assetFileNames: "assets/[name].[ext]",
            },
        }
    }
});
