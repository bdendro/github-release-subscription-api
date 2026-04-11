import { GithubResponseInterface } from '../../github/dto/github.response.dto';

export interface EmailServiceInterface {
  sendConfirmationEmail(to: string, token: string): Promise<void>;
  sendConfirmedMail(to: string, token: string): Promise<void>;
  sendUnsubscribeMail(to: string): Promise<void>;
  sendGitHubReleaseMail(to: string, repo: GithubResponseInterface, token: string): Promise<void>;
}
