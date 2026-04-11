import { GithubResponseInterface } from '../github/dto/github.response.dto';
import { EMAIL } from './constants/email.const';
import { EmailProviderInterface } from './interfaces/email.provider.interface';
import { EmailServiceInterface } from './interfaces/email.service.interface';
import { getConfirmEmailTemplate } from './templates/confirm-email.template';
import { getConfirmationSuccessTemplate } from './templates/confirmation-success.template';
import { getRepoUpdateTemplate } from './templates/repo-update.template';
import { getUnsubscribeSuccessTemplate } from './templates/unsubscribed.template';

export class EmailService implements EmailServiceInterface {
  constructor(private readonly emailProvider: EmailProviderInterface) {}

  async sendConfirmationEmail(to: string, token: string): Promise<void> {
    const confirmationUrl = `${EMAIL.CONFIRMATION_BASE_URL}/${token}`;
    const html = getConfirmEmailTemplate(confirmationUrl);
    await this.emailProvider.send({ to, subject: EMAIL.SUBJECT_CONFIRMATION, html });
  }

  async sendConfirmationSuccessEmail(to: string, token: string): Promise<void> {
    const unsubscribeUrl = `${EMAIL.UNSUBSCRIBE_BASE_URL}/${token}`;
    const html = getConfirmationSuccessTemplate(unsubscribeUrl);
    await this.emailProvider.send({ to, subject: EMAIL.SUBJECT_CONFIRMED, html });
  }

  async sendUnsubscribeSuccessEmail(to: string): Promise<void> {
    const html = getUnsubscribeSuccessTemplate();
    await this.emailProvider.send({ to, subject: EMAIL.SUBJECT_CANCELED, html });
  }

  async sendGitHubReleaseEmail(
    to: string,
    repo: GithubResponseInterface,
    token: string,
  ): Promise<void> {
    const unsubscribeUrl = `${EMAIL.UNSUBSCRIBE_BASE_URL}/${token}`;
    const html = getRepoUpdateTemplate(repo, unsubscribeUrl);
    await this.emailProvider.send({ to, subject: EMAIL.SUBJECT_REPO, html });
  }
}
