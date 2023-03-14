export interface Run {
  id: string;
  title: string;
  duration: number;
  calories: number;
  date: Date;
  state: 'completed' | 'stopped' | null;
}
