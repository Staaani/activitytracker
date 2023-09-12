export interface Activity {
    id: string;
    name: string;
    type: 'time' | 'repetitions';
    record: number;
    timestamp: { start: Date; end: Date };
}

export interface Record {
    date: string;
    value: number;
}