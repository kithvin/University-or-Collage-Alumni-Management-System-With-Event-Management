import dayjs from 'dayjs';

export interface INews {
  id?: number;
  authorName?: string | null;
  title?: string | null;
  publishDate?: dayjs.Dayjs | null;
  coverArea?: dayjs.Dayjs | null;
  group?: string | null;
  expireDate?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<INews> = {};
