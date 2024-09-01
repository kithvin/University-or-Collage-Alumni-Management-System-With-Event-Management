import dayjs from 'dayjs';

export interface IJob {
  id?: number;
  jobName?: string | null;
  companyName?: string | null;
  location?: string | null;
  salaryDetails?: dayjs.Dayjs | null;
  jobDescription?: string | null;
  expireDate?: dayjs.Dayjs | null;
  jobApplyMethod?: string | null;
}

export const defaultValue: Readonly<IJob> = {};
