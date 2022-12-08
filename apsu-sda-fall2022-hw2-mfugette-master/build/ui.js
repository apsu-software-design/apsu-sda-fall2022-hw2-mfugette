"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var readlineSync = require("readline-sync");
var manager_1 = require("./manager");
function start() {
    showMainMenu(new manager_1.GatheringManager());
}
exports.start = start;
function showMainMenu(em) {
    while (true) {
        console.log("Welcome to the Gathering Manager! Pick an option:\n  1. Register a new member\n  2. Register a new gathering\n  3. Register a new organization\n  4. Add a member to a gathering\n  5. Modify a gathering\n  6. Add a gathering to an organization\n  7. List gathering members\n  8. Exit");
        var response = readlineSync.question('> ');
        if (response === '8' || response.slice(0, 2).toLowerCase() === ':q') {
            break;
        }
        switch (response) {
            case '1':
                showNewMemberMenu(em);
                break;
            case '2':
                showNewGatheringMenu(em);
                break;
            case '3':
                showNewOrganizationMenu(em);
                break;
            case '4':
                showAddToGatheringMenu(em);
                break;
            case '5':
                showModifyGatheringMenu(em);
                break;
            case '6':
                showAddToOrganizationMenu(em);
                break;
            case '7':
                showListGatheringMembersMenu(em);
                break;
            default: console.log('Invalid option!');
        }
        console.log('');
    }
}
function showNewMemberMenu(em) {
    console.log('Add a new member.');
    var name = readlineSync.question('  Name: ');
    var email = readlineSync.question('  Email: ');
    em.addMember(name, email);
    console.log('User added!');
}
function showNewGatheringMenu(em) {
    console.log('Add a new gathering.');
    var gatheringName = readlineSync.question('  Title of gathering: ');
    var zipcode = readlineSync.question('  Location (zip code): ');
    var date = readlineSync.question('  Date and time (ex: Jan 21 2017 13:00 PST): ');
    em.addGathering(gatheringName, zipcode, date);
    showAddToGatheringMenu(em, gatheringName);
}
function showNewOrganizationMenu(em) {
    console.log('Add a new organization.');
    var organizationName = readlineSync.question('  Title of organization: ');
    em.addOrganization(organizationName);
    var adding = readlineSync.question('Add gatherings to organization? (y/n): ');
    while (adding.toLowerCase().startsWith('y')) {
        showAddToOrganizationMenu(em, organizationName);
        adding = readlineSync.question('Add another gathering? (y/n): ');
    }
}
function showAddToGatheringMenu(em, gatheringName) {
    if (!gatheringName) {
        gatheringName = showSearchGatheringsMenu(em);
        if (!gatheringName) {
            return;
        }
    }
    var adding = readlineSync.question('Add a member to gathering? (y/n): ');
    while (adding.toLowerCase().startsWith('y')) {
        var memberName = showSearchMembersMenu(em);
        if (memberName) {
            em.addMemberToGathering(memberName, gatheringName);
        }
        else {
            console.log('No member selected.');
        }
        adding = readlineSync.question('Add another member? (y/n): ');
    }
}
function showSearchMembersMenu(em) {
    var query = _promptForQuery('member');
    return _searchListMenu('member', em.findMemberNames(query));
}
function showSearchGatheringsMenu(em) {
    var query = _promptForQuery('gathering');
    return _searchListMenu('gathering', em.findGatheringNames(query));
}
function showSearchOrganizationsMenu(em) {
    var query = _promptForQuery('organization');
    return _searchListMenu('organization', em.findOrganizationNames(query));
}
function _promptForQuery(type) {
    console.log("Searching for a ".concat(type, "."));
    return readlineSync.question('Search query: ');
}
function _searchListMenu(type, results) {
    if (results.length > 0) {
        console.log('Results found: ');
        var resultsDisplay = '  ' + (results.map(function (item, idx) { return "".concat(idx + 1, ". ").concat(item); }).join('\n  '));
        console.log(resultsDisplay);
        var choiceIdx = parseInt(readlineSync.question("Choose a ".concat(type, " (1-").concat(results.length, "): ")));
        return results[choiceIdx - 1];
    }
    else {
        console.log('No results found.');
        return undefined;
    }
}
function showModifyGatheringMenu(em, gatheringName) {
    if (!gatheringName) {
        gatheringName = showSearchGatheringsMenu(em);
        if (!gatheringName) {
            return;
        }
    }
    while (true) {
        console.log("Edit gathering '".concat(gatheringName, "'.\n  1. Change title\n  2. Change time\n  3. Add to organization\n  4. Return to previous menu"));
        var response = parseInt(readlineSync.question('> '));
        if (response == 1) {
            var newTitle = readlineSync.question('  New title: ');
            em.modifyGathering(gatheringName, newTitle);
        }
        else if (response == 2) {
            var newTime = readlineSync.question('  New date and time (ex: Jan 21 2017 13:00 PST): ');
            em.modifyGathering(gatheringName, undefined, newTime);
        }
        else if (response == 3) {
            showAddToOrganizationMenu(em, undefined, gatheringName);
        }
        else if (response == 4) {
            break;
        }
        else {
            console.log('Invalid option!');
        }
    }
}
function showAddToOrganizationMenu(em, organizationName, gatheringName) {
    if (!gatheringName) {
        gatheringName = showSearchGatheringsMenu(em);
        if (!gatheringName) {
            return;
        }
    }
    if (!organizationName) {
        organizationName = showSearchOrganizationsMenu(em);
        if (!organizationName) {
            return;
        }
    }
    em.addGatheringToOrganization(gatheringName, organizationName);
}
function showListGatheringMembersMenu(em) {
    var gatheringName = showSearchGatheringsMenu(em);
    var members = em.getMembers(gatheringName);
    console.log('Members participating in this action:');
    console.log('  ' + members.join('\n  ') + '\n');
    readlineSync.keyInPause('(Press any letter to continue)', { guide: false });
}
//# sourceMappingURL=ui.js.map