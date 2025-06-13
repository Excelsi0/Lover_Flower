import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
            },
        },
    },
});
