function sendMail(receiver) {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kaoru.nagisaa@gmail.com',
          pass: 'bersihsehat' 
        }
      });
      
      const mailOptions = {
        from: 'alpabet@gmail.com',
        to: receiver,
        subject: 'Selamat Datang di FilmKu',
        text: 'Terimakasih telah melakukan pendaftaran akun di FilmKu'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = sendMail;