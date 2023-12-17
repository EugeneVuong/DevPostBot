// Used to Find the Changes Between the API and Cached Response

function findNewChangesForHackathons(list1, list2) {
    // Extract names from each list
    const names1 = list1.map(item => item.titles);
    const newChanges = list2.filter(item => !names1.includes(item.titles));
    return newChanges;
}

module.exports = { findNewChangesForHackathons };