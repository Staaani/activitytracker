export interface Activity {
    id: string;
    name: string;
    type: 'time' | 'repetitions';
    records: number[];
    timestamps: { start: Date; end: Date }[];

}

export interface Record {
    date: string;
    value: number;
}