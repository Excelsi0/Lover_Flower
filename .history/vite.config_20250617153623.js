import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { ViteEjsPlugin } from "vite-plugin-ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [
        // Without Data
        ViteEjsPlugin(),

        // With Data
        ViteEjsPlugin({
            domain: "example.com",
            title: "My vue project!",
        }),

        // Or With Vite Config
        ViteEjsPlugin((viteConfig) => {
            // viteConfig is the current viteResolved config.
            return {
                root: viteConfig.root,
                domain: "example.com",
                title: "My vue project!",
            };
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "index.html"),
            },
        },
    },
});
