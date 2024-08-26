const express = require('express');
const { v4: uuidv4 } = require('uuid');

const Logger = require('./services/Logger');
const CircuitBreaker = require('./services/CircuitBreaker');
const MockEmailProvider1 = require('./services/MockEmailProvider1');
const MockEmailProvider2 = require('./services/MockEmailProvider2');
const EmailService = require('./services/EmailService');
const StatusTracker = require('./services/StatusTracker');
const RateLimiter = require('./services/RateLimiter');
const EmailController = require('./controllers/EmailController');

const app = express();
app.use(express.json());

const logger = new Logger();
const circuitBreaker1 = new CircuitBreaker(3, 5000);
const circuitBreaker2 = new CircuitBreaker(3, 5000);

const providers = [
  new MockEmailProvider1(logger, circuitBreaker1),
  new MockEmailProvider2(logger, circuitBreaker2),
];

const rateLimiter = new RateLimiter(2, 60000);
const statusTracker = new StatusTracker();
const emailService = new EmailService({
  providers,
  maxRetries: 3,
  rateLimiter,
  statusTracker,
  logger,
});

const emailController = new EmailController(emailService);

app.post('/send', emailController.sendEmail.bind(emailController));
app.get('/status/:id', emailController.getStatus.bind(emailController));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.log(`Server running on port ${PORT}`));
