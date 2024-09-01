import dayjs from 'dayjs';

export interface IDonation {
  id?: number;
  donationName?: string | null;
  contactDetails?: string | null;
  billingAddress?: string | null;
  amount?: dayjs.Dayjs | null;
  description?: string | null;
  donationType?: string | null;
  dateAndTime?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<IDonation> = {};
