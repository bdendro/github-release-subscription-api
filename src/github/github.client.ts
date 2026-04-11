import { AxiosInstance } from 'axios';
import axios from 'axios';
import { Endpoints } from '@octokit/types';
import {
  GithubClientInterface,
  GitHubLatestReleaseDto,
  GitHubRepoDto,
} from './interfaces/github.client.interface';
import { Env } from '../config/env';
import { GITHUB_API_ENDPOINT } from './constants/github.const';
import { GithubError } from '../common/utils/errors/custom-errors';

type GitHubGetRepoResponse = Endpoints['GET /repos/{owner}/{repo}']['response']['data'];

type GitHubGetLatestReleaseResponse =
  Endpoints['GET /repos/{owner}/{repo}/releases/latest']['response']['data'];

export class GithubClient implements GithubClientInterface {
  private readonly client: AxiosInstance;

  constructor(env: Env) {
    this.client = axios.create({
      baseURL: env.GITHUB_API_URL,
      timeout: 5000,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2026-03-10',
      },
    });
  }

  async getRepository(repo: string): Promise<GitHubRepoDto | null> {
    try {
      const { data } = await this.client.get<GitHubGetRepoResponse>(
        GITHUB_API_ENDPOINT.getRepoEndpoint(repo),
      );

      return {
        id: data.id,
        full_name: data.full_name,
        private: data.private,
        html_url: data.html_url,
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404 || status === 403) return null; // repository not found or inaccessible

        throw new GithubError(err);
      }
      throw new GithubError(err);
    }
  }

  async getLatestRelease(repo: string): Promise<GitHubLatestReleaseDto | null> {
    try {
      const { data } = await this.client.get<GitHubGetLatestReleaseResponse>(
        GITHUB_API_ENDPOINT.getRepoLastRelease(repo),
      );
      return {
        id: data.id,
        tag_name: data.tag_name,
        name: data.name,
        html_url: data.html_url,
        body: data.body,
        published_at: data.published_at,
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404) return null;

        throw new GithubError(err);
      }
      throw new GithubError(err);
    }
  }
}
