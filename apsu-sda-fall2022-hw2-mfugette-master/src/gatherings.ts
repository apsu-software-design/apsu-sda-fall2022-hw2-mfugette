import { Members } from './members';
export class Gatherings {
    title: string;
    location: string;
    date: string;

    members: Members[];

    constructor(_title, _location, _date) {
        this.title = _title;
        this.location = _location;
        this.date = _date;

    }
}