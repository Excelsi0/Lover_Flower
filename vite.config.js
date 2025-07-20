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
            email: "zakaz@loverflower.by",
            address: "ул. Тимирязева 67",
        }),
    ],

    server: {
        // Добавьте эту секцию
        port: 5173,
        strictPort: true,
        open: true, // автоматически открывать браузер
    },

    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "index.html"),
                privacy: path.resolve(__dirname, "privacy/index.html"),
            },
            output: {
                assetFileNames: "assets/[name][extname]",
            },
        },
        emptyOutDir: true,
    },

    resolve: {
        alias: [
            {
                find: "@",
                replacement: path.resolve(__dirname, "src"),
            },
            {
                find: "@sass",
                replacement: path.resolve(__dirname, "src/sass"),
            },
        ],
    },
});
