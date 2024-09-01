import dayjs from 'dayjs';

export interface IVolunteerOP {
  id?: number;
  volunteerName?: string | null;
  dateAndTime?: dayjs.Dayjs | null;
  location?: string | null;
  timeDuration?: dayjs.Dayjs | null;
  description?: string | null;
  member?: string | null;
  volunteerOpCoordinator?: string | null;
}

export const defaultValue: Readonly<IVolunteerOP> = {};
