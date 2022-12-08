"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatheringManager = void 0;
var members_1 = require("./members");
var gatherings_1 = require("./gatherings");
var organizations_1 = require("./organizations");
var GatheringManager = (function () {
    function GatheringManager() {
        this.arrMems = [];
        this.arrOrgs = [];
        this.arrGath = [];
    }
    GatheringManager.prototype.addMember = function (name, email) {
        this.arrMems.push(new members_1.Members(name, email));
    };
    GatheringManager.prototype.addGathering = function (title, location, date) {
        this.arrGath.push(new gatherings_1.Gatherings(title, location, date));
    };
    GatheringManager.prototype.addOrganization = function (title) {
        this.arrOrgs.push(new organizations_1.Organizations(title));
    };
    GatheringManager.prototype.addMemberToGathering = function (name, gatheringTitle) {
        this.arrGath[gatheringTitle].push(this.arrMems[name]);
    };
    GatheringManager.prototype.addGatheringToOrganization = function (gatheringTitle, organizationTitle) {
        this.arrOrgs[organizationTitle].push(this.arrGath[gatheringTitle]);
    };
    GatheringManager.prototype.modifyGathering = function (title, newTitle, newDate) {
        this.arrGath[title].splice(newTitle);
        this.arrGath[title].splice(newDate);
    };
    GatheringManager.prototype.getMembers = function (gatheringTitle) {
        return this.arrGath[gatheringTitle].members;
    };
    GatheringManager.prototype.findMemberNames = function (query) {
        return;
    };
    GatheringManager.prototype.findGatheringNames = function (query) {
        return;
    };
    GatheringManager.prototype.findOrganizationNames = function (query) {
        return;
    };
    return GatheringManager;
}());
exports.GatheringManager = GatheringManager;
//# sourceMappingURL=manager.js.map