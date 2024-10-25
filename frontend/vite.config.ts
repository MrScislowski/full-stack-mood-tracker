import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // the following server.watch: {usePolling: true} is only necessary for Windows systems running a docker image in WSL2
  // The vite documentation: https://vite.dev/config/server-options#server-watch
  // recommends using WSL2 applications to edit your files (and moving the project folder outside of a windows filesystem to improve performance)
  server: {
    watch: { usePolling: true },
  },
});
