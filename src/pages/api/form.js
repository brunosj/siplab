import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    await sendgrid.send({
      to: "contact@siplab.ca",
      from: "contact@siplab.ca",
      subject: `${req.body.subject}`,
      replyTo: `${req.body.email}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
      
        <title>SIPLAB</title>
        <meta name="description" content="SIPLAB">
        <meta name="author" content="Mail">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      
      </head>
      
      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <p style="font-size: 24px;">siplab.ca - new mail</p>
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px; font-size: 16px;">
              <p style="font-style: italic;">Name: </p>
              <p>${req.body.fullname}</p>
              <p style="font-style: italic;">Email:</p>
              <p>${req.body.email}</p>
              <p style="font-style: italic;">Message:</p>
              <p>${req.body.message}</p>
              <br>
              </div>
              </div>
      </body>
      </html>`,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
