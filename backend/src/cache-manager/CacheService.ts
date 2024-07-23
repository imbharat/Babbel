import "reflect-metadata";
import { LRUCache } from "lru-cache";
import { injectable, singleton } from "tsyringe";

@singleton()
export default class CacheService {
  private cache: LRUCache<string, any>;

  constructor() {
    this.cache = new LRUCache<string, any>({ max: 500 });
  }

  public async getCachedData(key: string): Promise<any> {
    return await this.cache.get(key);
  }

  public setCachedData(key: string, value: any): void {
    if (value !== undefined && value !== null) {
      this.cache.set(key, value);
    }
  }
}

export const CacheServiceProvider = "CacheServiceProvider";
