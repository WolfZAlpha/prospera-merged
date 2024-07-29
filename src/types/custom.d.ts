declare module 'cacheable-request' {
    import { RequestFunction } from 'http';
    function cacheableRequest(request: RequestFunction): RequestFunction;
    export = cacheableRequest;
  }
  
  declare module 'http-cache-semantics' {
    class CachePolicy {
      constructor(req: any, res: any, options?: any);
      storable(): boolean;
      satisfiesWithoutRevalidation(newRequest: any): boolean;
      responseHeaders(): Record<string, string>;
      timeToLive(): number;
    }
    export = CachePolicy;
  }
  
  declare module 'keyv' {
    class Keyv {
      constructor(options?: any);
      get(key: string): Promise<any>;
      set(key: string, value: any, ttl?: number): Promise<boolean>;
      delete(key: string): Promise<boolean>;
      clear(): Promise<void>;
    }
    export = Keyv;
  }
  
  declare module 'responselike' {
    import { IncomingMessage } from 'http';
    class Response extends IncomingMessage {
      constructor(statusCode: number, headers: Record<string, string>, body: Buffer | string, url: string);
      readonly statusCode: number;
      readonly headers: Record<string, string>;
      readonly body: Buffer;
      readonly url: string;
    }
    export = Response;
  }
  
  declare module 'long' {
    class Long {
      constructor(low: number, high?: number, unsigned?: boolean);
      toNumber(): number;
      toString(radix?: number): string;
      equals(other: Long): boolean;
      isZero(): boolean;
      isNegative(): boolean;
      isPositive(): boolean;
      isOdd(): boolean;
      isEven(): boolean;
      static ZERO: Long;
      static ONE: Long;
      static NEG_ONE: Long;
      static MAX_VALUE: Long;
      static MIN_VALUE: Long;
    }
    export = Long;
  }
  
  declare module 'mime' {
    function getType(path: string): string | null;
    function getExtension(mime: string): string | null;
    function define(mimes: Record<string, string | string[]>, force?: boolean): void;
    const types: Record<string, string>;
    const extensions: Record<string, string>;
    export { getType, getExtension, define, types, extensions };
  }