class EmailService {
    constructor({ providers, maxRetries, rateLimiter, statusTracker, logger }) {
      this.providers = providers;
      this.maxRetries = maxRetries;
      this.rateLimiter = rateLimiter;
      this.statusTracker = statusTracker;
      this.logger = logger;
    }
  
    async sendEmail(email, priority = 1) {
      const emailId = email.id;
      this.statusTracker.updateStatus(emailId, 0);
  
      if (this.rateLimiter.isRateLimited()) {
        this.logger.log('Rate limit exceeded, email cannot be sent right now');
        return 'Rate limit exceeded';
      }
  
      for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
        this.statusTracker.updateStatus(emailId, attempt);
  
        for (let provider of this.providers) {
          try {
            const result = await provider.send(email);
            this.statusTracker.updateStatus(emailId, attempt, true, result);
            return result;
          } catch (error) {
            this.logger.log(`Provider failed: ${error.message}`);
          }
        }
        await sleep(Math.pow(2, attempt) * 1000); 
      }
  
      const failureMessage = 'All providers failed after maximum retries';
      this.statusTracker.updateStatus(emailId, this.maxRetries, false, failureMessage);
      throw new Error(failureMessage);
    }
  }
  
  module.exports = EmailService;
  