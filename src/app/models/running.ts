export interface Run {
  runId: string;
  title: string;
  duration: number;
  calories: number;
  date: Date;
  state: 'completed' | 'stopped' | null;
}
