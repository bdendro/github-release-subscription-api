export function getConfirmEmailTemplate(confirmationUrl: string) {
  return `
    <html>
      <body>
        <h2>Confirm your email</h2>
        <p>Click the button below to confirm your subscription to <b>GitHub repository</b> updates.</p>
        <a href="${confirmationUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Confirm Email</a>
      </body>
    </html>
  `;
}
