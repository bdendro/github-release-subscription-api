import { GithubResponseInterface } from '../../github/dto/github.response.dto';

export function getRepoUpdateTemplate(repo: GithubResponseInterface, unsubscribeUrl: string) {
  return `
    <html>
      <body>
        <h2>GitHub repository <b>${repo.repo}</b> has been updated.</h2>
        <p>Last seen tag is <b>${repo.lastSeenTag}</b>. Look at the changes <a href="https://github.com/${repo.repo}">here</a></p>
        <p>Stay tuned for the next update. Have a great day!</p>
        <p style="font-size: 12px; color: #999; text-align: center; margin-top: 40px;">
          If you no longer wish to receive GItHub repository updates, you can 
          <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">unsubscribe here</a>.
        </p>
      </body>
    </html>
  `;
}
