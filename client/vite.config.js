import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const URL = ["http://127.0.0.1:5000", "http://192.168.1.123:5000"];
const server = URL[0];

const proxyConfig = {
  target: server,
  changeOrigin: true,
  secure: false,
};

const proxyPaths = ["/auth", "/create", "/read", "/update", "/delete"];

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: Object.fromEntries(proxyPaths.map((path) => [path, proxyConfig])),
  },
});
