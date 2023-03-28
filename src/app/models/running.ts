export interface Run {
  id: string;
  title: string;
  duration: number; // u minutama --> npr: 1 , 0.5 , 10
  calories: number;
  date?: Date;
  state?: 'completed' | 'stopped' | null;
  userId?: string;
  historyId?: string;
}
