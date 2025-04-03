/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NEEDS_MIRAGE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}