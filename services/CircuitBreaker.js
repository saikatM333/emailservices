class CircuitBreaker {
    constructor(failureThreshold, recoveryTimeMs) {
      this.failureThreshold = failureThreshold;
      this.recoveryTimeMs = recoveryTimeMs;
      this.failureCount = 0;
      this.lastFailureTime = null;
    }
  
    async execute(func) {
      if (this.isOpen()) {
        throw new Error("Circuit breaker is open");
      }
  
      try {
        const result = await func();
        this.reset();
        return result;
      } catch (error) {
        this.failureCount += 1;
        this.lastFailureTime = new Date().getTime();
        throw error;
      }
    }
  
    isOpen() {
      return this.failureCount >= this.failureThreshold &&
             new Date().getTime() - this.lastFailureTime < this.recoveryTimeMs;
    }
  
    reset() {
      this.failureCount = 0;
      this.lastFailureTime = null;
    }
  }
  
  module.exports = CircuitBreaker;
  