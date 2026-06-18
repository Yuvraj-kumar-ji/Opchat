export const welcomeTemplate = ({ username = '{{username}}', applicationUrl = '{{applicationUrl}}', appName = 'AppName' } = {}) => {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to ${appName}</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;color:#0f172a;font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f4f6;min-width:100%;">
      <tr>
        <td align="center" style="padding: 24px 12px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 12px 34px rgba(15,23,42,.12);">
            <tr>
              <td style="padding:24px 24px 18px;background:#1e293b;" align="center">
                <div style="display:flex;align-items:center;justify-content:center;gap:12px;">
                  <div style="width:48px;height:48px;background:#e2e8f0;border-radius:999px;display:flex;align-items:center;justify-content:center;color:#1e293b;font-weight:bold;font-size:18px;">L</div>
                  <h1 style="margin:0;font-size:24px;color:#f8fafc;font-family:Arial, Helvetica, sans-serif;">Welcome to ${appName}!</h1>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <h2 style="margin:0 0 12px;color:#0f172a;font-size:20px;">Hello ${username},</h2>
                <p style="margin:0 0 16px;line-height:1.6;color:#334155;font-size:15px;">
                  We’re thrilled to have you on board. ${appName} is ready to help you connect instantly with your team, friends, and communities.
                </p>
                <p style="margin:0 0 24px;line-height:1.6;color:#334155;font-size:15px;">
                  Click the button below to jump right into chat:
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 auto;">
                  <tr>
                    <td align="center" bgcolor="#4f46e5" style="border-radius:8px;">
                      <a href="${applicationUrl}" target="_blank" style="display:inline-block;padding:13px 24px;font-size:15px;color:#ffffff;text-decoration:none;font-weight:600;">
                        Go to Chat
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:24px 0 0;line-height:1.6;color:#475569;font-size:14px;">If you have any questions or need help, our support team is here for you.</p>
                <p style="margin:8px 0 0;line-height:1.6;color:#64748b;font-size:13px;">Or paste this link in your browser:<br/><a href="${applicationUrl}" style="color:#4f46e5;text-decoration:underline;" target="_blank">${applicationUrl}</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px; background:#f8fafc; border-top:1px solid #e2e8f0;">
                <p style="margin:0;font-size:12px;color:#64748b;text-align:center;">&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
                <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;text-align:center;">123 Startup Way, Tech City, 98765</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};