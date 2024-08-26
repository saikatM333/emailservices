class RateLimiter {
    constructor(maxRequests, windowMs) {
      this.maxRequests = maxRequests;
      this.windowMs = windowMs;
      this.requests = [];
    }
  
    isRateLimited() {
      const now = Date.now();
      this.requests = this.requests.filter(timestamp => now - timestamp < this.windowMs);
  
      if (this.requests.length >= this.maxRequests) {
        return true;
      }
  
      this.requests.push(now);
      return false;
    }
  }
  
  module.exports = RateLimiter;
  