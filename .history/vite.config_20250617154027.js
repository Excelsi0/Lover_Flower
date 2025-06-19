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
            number: "+375 (29) 113-69-69",
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
