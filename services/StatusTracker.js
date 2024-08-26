class StatusTracker {
    constructor() {
      this.status = {};
    }
  
    updateStatus(emailId, attempt, success = false, message = '') {
      this.status[emailId] = { success, message, attempt };
    }
  
    getStatus(emailId) {
      return this.status[emailId];
    }
  }
  
  module.exports = StatusTracker;
  