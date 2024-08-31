declare global {
  namespace Express {
    interface Request {}
  }
  declare module 'express-session' {
    interface SessionData {
      userId?: number;
    }
  }
}
