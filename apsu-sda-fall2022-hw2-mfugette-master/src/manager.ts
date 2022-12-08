//your code goes here!

// These import statements are suggestions on how to get your three main libraries into this code.
// You'll need to create each of these libraries.
import { Members } from './members';
import { Gatherings } from './gatherings';
import { Organizations } from './organizations';

export class GatheringManager {

    arrMems: Members[];
    arrOrgs: Organizations[];
    arrGath: Gatherings[];

    constructor() {
        this.arrMems = [];
        this.arrOrgs = [];
        this.arrGath = [];
    }

    addMember(name: string, email: string) {
        this.arrMems.push(new Members(name, email));
    }

    addGathering(title: string, location: string, date: string) {
        this.arrGath.push(new Gatherings(title, location, date));
    }

    addOrganization(title: string) {
        this.arrOrgs.push(new Organizations(title));
    }

    addMemberToGathering(name: string, gatheringTitle: string) {
        this.arrGath[gatheringTitle].push(this.arrMems[name]);
    }

    addGatheringToOrganization(gatheringTitle: string, organizationTitle: string) {
        this.arrOrgs[organizationTitle].push(this.arrGath[gatheringTitle]);
    }

    modifyGathering(title: string, newTitle: string, newDate?: string) {
    
        this.arrGath[title].splice(newTitle);
        this.arrGath[title].splice(newDate);
    }

    getMembers(gatheringTitle: string): string[] {
        return this.arrGath[gatheringTitle].members; 
    }

    findMemberNames(query: string): string[] {
        return; 
    }

    findGatheringNames(query: string): string[] {
        return;
    }

    findOrganizationNames(query: string): string[] {
        return;
    }
}
