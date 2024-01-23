/// <reference types="vite/client" />
/// <reference types="vitest" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_DOMAIN: string;
  readonly VITE_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
