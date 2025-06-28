/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_UPLOAD_BASE_URL: string;
  // Add more env variables types here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
