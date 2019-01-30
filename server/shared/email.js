const config = require('../config');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.sendgrid.apiKey);

exports.send = function(to, from, templateId, data) {
  const msg = {
    to: to,
    from: from,
    templateId: templateId,
    dynamic_template_data: data
  };
  sgMail.send(msg);
}
