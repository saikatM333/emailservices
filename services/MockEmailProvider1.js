const IEmailProvider = require('./IEmailProvider');

class MockEmailProvider1 extends IEmailProvider {
  constructor(logger, circuitBreaker) {
    super();
    this.logger = logger;
    this.circuitBreaker = circuitBreaker;
  }

  async send(email) {
    return this.circuitBreaker.execute(() => {
      this.logger.log(`MockEmailProvider1 sending email to ${email.to}`);
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Provider 1 sent the email successfully"), 1000);
      });
    });
  }
}

module.exports = MockEmailProvider1;
