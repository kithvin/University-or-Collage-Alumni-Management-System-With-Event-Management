import dayjs from 'dayjs';

export interface IEvent {
  id?: number;
  eventName?: string | null;
  dateAndTime?: dayjs.Dayjs | null;
  location?: string | null;
  eventType?: string | null;
  description?: string | null;
  targetAudience?: string | null;
  eventCoordinator?: string | null;
}

export const defaultValue: Readonly<IEvent> = {};
