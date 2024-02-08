import { ReminderApi } from "../tasks/type";

export interface NotificationApi {
  id: number;
  reminder_id: number;
  reminder?: ReminderApi;
  receiver_id: number;
  created_at: string;
  read: boolean;
  content?: string;
}
