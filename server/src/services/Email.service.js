require("dotenv").config();
const nodemailer = require("nodemailer");

class EmailServer {
  async sendEmailOrderService({ email, tableId, day, number, hour }) {


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SEND,
        pass: process.env.PASS_SEND,
      },
    });
    const mailOptions = {

      from: `"SmartOps Restaurant" <nguyenkiencnttltv@gmail.com>`,

      to: email,

      subject: "Xác nhận đặt bàn - SmartOps Restaurant",

      html: `
    
   <div style="font-family:Arial;background:#f5f5f5;padding:40px">

<div style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden">
<div style="background:#0f172a;color:white;padding:20px;text-align:center">

<h1>SmartOps Restaurant</h1>
<p>Trải nghiệm ẩm thực đẳng cấp</p>

</div>


<div style="padding:30px">

<h2 style="color:#16a34a">🎉 Đặt bàn thành công</h2>

<p>Xin chào <b>${email}</b></p>

<p>Cảm ơn bạn đã đặt bàn tại <b>SmartOps Restaurant</b></p>

<div style="background:#f1f5f9;padding:20px;border-radius:8px;margin-top:20px">

<h3>Thông tin đặt bàn</h3>

<p>🪑 Bàn: <b>${tableId}</b></p>
<p>📅 Ngày: <b>${day}</b></p>
<p>⏰ Giờ: <b>${hour}</b></p>
<p>👨‍👩‍👧‍👦 Số khách: <b>${number}</b></p>

</div>

<div style="margin-top:25px">

<a href="${process.env.CLIENT_URL}/menu"
style="
background:#16a34a;
color:white;
padding:12px 20px;
text-decoration:none;
border-radius:6px;
">
Xem Menu Nhà Hàng
</a>

</div>

</div>


<div style="background:#0f172a;color:white;text-align:center;padding:20px">

<p>SmartOps Restaurant</p>

<p>📍 250 Hồ Tùng Mậu, Q. Liên Chiểu, TP. Đà Nẵng</p>
<p>☎ 0336 099 317</p>
</div>

</div>

</div>
    
    `
    }
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: "Gửi thông tin đặt bàn thành công."
    }


  }

  async sendOTPResetPass(email, otp) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SEND,
        pass: process.env.PASS_SEND,
      },
    });
    const mailOptions = {

      from: `"SmartOps Restaurant" <nguyenkiencnttltv@gmail.com>`,

      to: email,

      subject: "Xác thực mã OTP - SmartOps Restaurant",

      html: `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Mã OTP cập nhật lại mật khẩu</title>
  </head>

  <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
      <div style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden">

          <div style="background:#2563eb;padding:20px;text-align:center;color:white">
              <h1>Xác thực OTP</h1>
          </div>

          <div style="padding:30px;text-align:center">
              <h2>Xin chào!</h2>

              <p>Email: <b>${email}</b></p>

              <p>Sử dụng mã OTP bên dưới để xác thực cập nhật lại mật khẩu.</p>

              <div style="
                  font-size:40px;
                  letter-spacing:8px;
                  background:#f1f5f9;
                  padding:20px;
                  margin:20px 0;
                  border-radius:10px;
                  font-weight:bold;
                  color:#2563eb;
              ">
                  ${otp}
              </div>

              <p>Mã OTP có hiệu lực trong <b>5 phút</b>.</p>

              <p style="color:#6b7280;font-size:14px">
                  Nếu bạn không yêu cầu mã này, hãy bỏ qua email này.
              </p>
          </div>

          <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#9ca3af">
              © 2026 SmartOps F&B
          </div>

      </div>
  </body>
  </html>`
    }
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: "OTP đã được gửi"
    }


  }

  async sendMessageContact({ name, email, message }, id) {



    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SEND,
        pass: process.env.PASS_SEND,
      },
    });
    const mailOptions = {

      from: `"SmartOps Restaurant" <nguyenkiencnttltv@gmail.com>`,

      to: email,

      subject: "Thư cảm ơn - SmartOps Restaurant",

      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Cảm ơn bạn đã liên hệ</title>
</head>

<body style="margin:0;padding:0;background:#0f172a;font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

     
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:12px;overflow:hidden;color:#fff;">

         
          <tr>
            <td style="background:#ef4444;padding:20px;text-align:center;">
              <h1 style="margin:0;font-size:24px;">🍣 SmartOps F&B</h1>
              <p style="margin:5px 0 0;font-size:14px;">Nhà hàng ẩm thực SmartOps F&B</p>
            </td>
          </tr>

        
          <tr>
            <td style="padding:30px;">

              <h2 style="margin-top:0;color:#facc15;">
                Xin chào ${name}
              </h2>

              <p style="color:#d1d5db;font-size:14px;">
                Cảm ơn bạn đã liên hệ với chúng tôi. Đội ngũ nhà hàng đã nhận được thông tin của bạn.
              </p>

             
              <div style="margin:20px 0;padding:20px;background:#1f2937;border-radius:8px;border-left:4px solid #facc15;">
                <p style="margin:0;font-size:14px;color:#e5e7eb;">
                  ${message}
                </p>
              </div>

              <p style="color:#9ca3af;font-size:13px;">
                Chúng tôi sẽ phản hồi bạn sớm nhất có thể. Nếu cần hỗ trợ ngay, vui lòng liên hệ hotline bên dưới.
              </p>

             
              <div style="text-align:center;margin-top:25px;">
                <a href="${process.env.CLIENT_URL}/reservation" style="background:#facc15;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
                  Đặt bàn ngay
                </a>
              </div>

            </td>
          </tr>

        
          <tr>
            <td style="background:#020617;padding:20px;text-align:center;font-size:12px;color:#6b7280;">
              📍 Địa chỉ: Đà Nẵng, Việt Nam <br/>
              ☎ Hotline: 0336 099 317 <br/>
              © 2026 SmartOps F&B
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`
    }
    await transporter.sendMail(mailOptions)
    return {
      error: 0,
      message: "OTP đã được gửi",
    }


  }

  async sendOtpEmailService(email, otp) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SEND,
        pass: process.env.PASS_SEND,
      },
    });
    const mailOptions = {

      from: `"SmartOps Restaurant" <nguyenkiencnttltv@gmail.com>`,

      to: email,

      subject: "Xác thực mã OTP - SmartOps Restaurant",

      html: `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Xác thực Email</title>
  </head>

  <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
      <div style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden">

          <div style="background:#2563eb;padding:20px;text-align:center;color:white">
              <h1>Xác thực Email</h1>
          </div>

          <div style="padding:30px;text-align:center">
              <h2>Xin chào!</h2>

              <p>Email của bạn: <b>${email}</b></p>

              <p>Sử dụng mã OTP bên dưới để xác thực tài khoản.</p>

              <div style="
                  font-size:40px;
                  letter-spacing:8px;
                  background:#f1f5f9;
                  padding:20px;
                  margin:20px 0;
                  border-radius:10px;
                  font-weight:bold;
                  color:#2563eb;
              ">
                  ${otp}
              </div>

              <p>Mã OTP có hiệu lực trong <b>5 phút</b>.</p>

              <p style="color:#6b7280;font-size:14px">
                  Nếu bạn không yêu cầu mã này, hãy bỏ qua email này.
              </p>
          </div>

          <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#9ca3af">
              © 2026 SmartOps F&B
          </div>

      </div>
  </body>
  </html>`
    }
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: "OTP đã được gửi"
    }


  }

  async sendEmailRecieveService(email, time) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SEND,
        pass: process.env.PASS_SEND,
      },
    });
    const mailOptions = {

      from: `"SmartOps Restaurant" <admin@gmail.com>`,

      to: process.env.EMAIL_SEND,

      subject: "Khách hàng đăng ký nhận ưu đãi",

      html: `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>Đăng ký nhận ưu đãi mới</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellspacing="0" cellpadding="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="560" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.08);">


<tr>
<td style="background:linear-gradient(135deg,#ff7a18,#ffb347);padding:28px;text-align:center;color:white;">
<h1 style="margin:0;font-size:24px;">🎁 SmartOps Restaurant</h1>
<p style="margin:6px 0 0;font-size:14px;opacity:0.9;">
Khách hàng đăng ký nhận ưu đãi
</p>
</td>
</tr>

<tr>
<td style="padding:35px;">

<h2 style="margin-top:0;color:#333;">
📩 Có khách hàng mới đăng ký nhận ưu đãi
</h2>

<p style="color:#555;font-size:15px;">
Một khách hàng vừa đăng ký nhận thông tin ưu đãi từ website của nhà hàng.
</p>

<table width="100%" style="margin-top:25px;border-collapse:collapse;">

<tr>
<td style="padding:12px;border-bottom:1px solid #eee;color:#888;width:150px;">
📧 Email khách hàng
</td>

<td style="padding:12px;border-bottom:1px solid #eee;color:#333;font-weight:600;">
${email}
</td>
</tr>

<tr>
<td style="padding:12px;border-bottom:1px solid #eee;color:#888;">
🕒 Thời gian đăng ký
</td>

<td style="padding:12px;border-bottom:1px solid #eee;color:#333;">
${time}
</td>
</tr>

<tr>
<td style="padding:12px;color:#888;">
🌐 Nguồn
</td>

<td style="padding:12px;color:#333;">
Website SmartOps Restaurant
</td>
</tr>

</table>

<div style="text-align:center;margin-top:35px;">

<a href="mailto:${email}" 
style="
background:#ff7a18;
color:white;
padding:13px 28px;
text-decoration:none;
border-radius:8px;
font-size:14px;
display:inline-block;
box-shadow:0 6px 18px rgba(255,122,24,0.4);
">

Gửi ưu đãi cho khách

</a>

</div>

</td>
</tr>

<tr>
<td style="background:#f7f8fb;padding:22px;text-align:center;font-size:13px;color:#777;">

<p style="margin:0;">
📍 SmartOps F&B - Hệ thống quản lý nhà hàng
</p>

<p style="margin:6px 0 0;">
Email được gửi tự động từ hệ thống đăng ký ưu đãi
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`
    }
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: "Email đã được gửi đi."
    }


  }

  async sendVerifyEmail({ codeuser, email, otp }) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SEND,
        pass: process.env.PASS_SEND,
      },
    });
    const mailOptions = {

      from: `"SmartOps Restaurant" <nguyenkiencnttltv@gmail.com>`,

      to: process.env.EMAIL_SEND,

      subject: "Xác thực email - Restaurant SmartOps F&B",

      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Xác thực Email</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;margin:20px 0;box-shadow:0 5px 20px rgba(0,0,0,0.1);">
          
         
          <tr>
            <td style="background:linear-gradient(90deg,#ff7a18,#ff3d00);padding:20px;text-align:center;color:#fff;">
              <h1 style="margin:0;font-size:24px;">🍽 SmartOps Restaurant</h1>
              <p style="margin:5px 0 0;font-size:14px;">Xác thực tài khoản của bạn</p>
            </td>
          </tr>

          
          <tr>
            <td style="padding:30px;text-align:center;">
              <h2 style="color:#333;">Xin chào 👋</h2>
              <p style="color:#555;font-size:15px;">
                Bạn đang xác thực email: <strong>${email}</strong>
              </p>

              <p style="margin-top:20px;color:#555;">
                Mã OTP của bạn là:
              </p>

              
              <div style="margin:20px auto;padding:15px 25px;font-size:32px;font-weight:bold;letter-spacing:8px;background:#fef3c7;color:#ff3d00;border-radius:10px;display:inline-block;">
                ${otp}
              </div>

              <p style="margin-top:20px;color:#888;font-size:13px;">
                Mã có hiệu lực trong <strong>5 phút</strong>. Vui lòng không chia sẻ mã này với bất kỳ ai.
              </p>
            </td>
          </tr>

          
          <tr>
            <td style="background:#f9f9f9;padding:20px;text-align:center;font-size:12px;color:#999;">
              © 2026 SmartOps Restaurant. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    }
    await transporter.sendMail(mailOptions)

    return {
      success: 0,
      message: "Email đã được gửi đi."
    }


  }
}

module.exports = new EmailServer();