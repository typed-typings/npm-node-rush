declare module rush {
  interface Callback<T> {
    (err: Error, result?: T): void;
  }

  interface Options {
    /** max number of cached results */
    max?: number;
    /** max age of cached results */
    maxAge: number;
    /** max age of cached error results */
    errTTL: number;
    /** min time before callback queue reset */
    timeout: number;
  }

  class Rush {
    private opts: Options;

    private results: any;
    private locks: any;
    private _timeouts: any;

    /** Fetch an item by its `key` from the cache. If it doesn't exist, call `fetch` to retrieve it. The results of `fetch` are cached under `key`. If the results include an `err`, the ttl of `key` is decided by the `errTTL` option. */
    get<T>(key: string, fetch: (cb: Callback<T>) => void, cb: Callback<T>): void;
    del(key: string): void;
    /** Empty all cached results. */
    reset(): void;
    /** Add / update `ttl` on key */
    ttl(key: string, ttl: number): void;
    /** Remove ttl from `key`. Persists until cache `maxAge` */
    clearTTL(key: string): void;
  }
}

/** Create a new cache */
declare function rush(options: rush.Options): rush.Rush;

export = rush;
