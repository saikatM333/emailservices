const { v4: uuidv4 } = require('uuid');
class EmailController {
    constructor(emailService) {
      this.emailService = emailService;
    }
  
    async sendEmail(req, res) {
      const { to, subject, body, priority } = req.body;
  
      if (!to || !body) {
        return res.status(400).json({ error: 'Missing required fields: to, body' });
      }
  
      const email = { id: uuidv4(), to,subject, body };
  
      try {
        const result = await this.emailService.sendEmail(email, priority || 1);
        return res.status(200).json({ message: 'Email processed successfully', result });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  
    getStatus(req, res) {
      const emailId = req.params.id;
      const status = this.emailService.statusTracker.getStatus(emailId);
  
      if (!status) {
        return res.status(404).json({ error: 'Email ID not found' });
      }
  
      return res.status(200).json({ status });
    }
  }
  
  module.exports = EmailController;
  