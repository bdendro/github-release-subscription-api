import { GithubResponseInterface } from '../../github/dto/github.response.dto';

export interface EmailServiceInterface {
  sendConfirmationEmail(to: string, token: string): Promise<void>;
  sendConfirmationSuccessEmail(to: string, token: string): Promise<void>;
  sendUnsubscribeSuccessEmail(to: string): Promise<void>;
  sendGitHubReleaseEmail(to: string, repo: GithubResponseInterface, token: string): Promise<void>;
}
