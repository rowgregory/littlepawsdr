import { Photo } from './photo';

export interface NewsletterIssue {
  _id: string;
  year: number;
  quarter: string;
  title: string;
  description: string;
  photos: Photo[];

  publishedAt: string;
  createdAt: string;
}
