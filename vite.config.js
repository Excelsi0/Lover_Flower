import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { ViteEjsPlugin } from "vite-plugin-ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [
        ViteEjsPlugin({
            phoneNumber: "+375 (29) 113-69-69",
        }),
    ],

    css: {
        preprocessorOptions: {
            scss: {},
        },
    },

    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "index.html"),
            },
        },
    },

    // Добавляем алиасы для удобных путей
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@sass": path.resolve(__dirname, "./src/sass"),
        },
    },
});
