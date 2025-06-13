import { defineConfig } from "vite";

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
    server: {
        open: true,
    },
});
