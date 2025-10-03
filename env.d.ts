declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      NEXT_PUBLIC_WSS_URL: string;
      NEXT_PUBLIC_WS_TOKEN: string;
    }
  }
}

export {};
