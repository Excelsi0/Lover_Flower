import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                catalog: resolve(__dirname, "catalog/index.html"),
                blog: resolve(__dirname, "blog/index.html"),
                about: resolve(__dirname, "about/index.html"),
            },
        },
    },
});
