export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #e5e7eb; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #020617;">
  <div style="background-color: #3961c0; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #e5e7eb; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #0f172a; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 0 20px rgba(34,211,238,0.3);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #22d3ee;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #64718b; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #e5e7eb; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #020617;">
  <div style="background-color: #3961c0; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #e5e7eb; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #0f172a; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 0 20px rgba(34,211,238,0.3);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #3961c0; color: #e5e7eb; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #64718b; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #e5e7eb; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #020617;">
  <div style="background-color: #3961c0; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #e5e7eb; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #0f172a; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 0 20px rgba(34,211,238,0.3);">
    <p>Hello,</p>
    <p>Your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #22d3ee; color: #020617; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this reset, please contact our support team immediately.</p>
    <p>Thank you for keeping your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #64718b; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const ACCOUNT_VERIFIED_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Verified Successfully</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #e5e7eb; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #020617;">
  <div style="background-color: #3961c0; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #e5e7eb; margin: 0;">Account Verified</h1>
  </div>
  <div style="background-color: #0f172a; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 0 20px rgba(34,211,238,0.3);">
    <p>Hello,</p>
    <p>Congratulations! Your account has been successfully verified.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #22d3ee; color: #020617; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not verify this account, please contact our support team immediately.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #64718b; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
