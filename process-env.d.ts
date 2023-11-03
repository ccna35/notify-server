export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      PORT: string;
      HOST: string;
      USER: string;
      DATABASE: notes_app;
      PASSWORD: string;
      JWT_SECRET: Secret | GetPublicKeyOrSecret;
      NODE_ENV: string;
    }
  }
}
