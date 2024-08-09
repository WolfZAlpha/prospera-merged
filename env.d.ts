declare namespace NodeJS {
    interface ProcessEnv {
      EMAIL_HOST: string;
      EMAIL_PORT: string;
      EMAIL_SECURE: string;
      EMAIL_USER: string;
      EMAIL_PASS: string;
      RECIPIENT_EMAIL: string;
    }
  }