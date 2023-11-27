const sgMail = require('@sendgrid/mail');
const router = require('./projects');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: 'youremail@example.com',
    from: 'noreply@example.com',
    subject: 'New message from your website',
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

module.exports =router;