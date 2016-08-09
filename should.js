/** @module should */


module.exports.tower = {};

/**
 * @param {Structure} target
 * @returns {boolean}
 */
module.exports.tower.repair = function(target) {
    let repPower = TOWER_POWER_REPAIR;
    let hitsLimit = target instanceof StructureRoad ? 6500 : 45000;
    return (target.hits <= target.hitsMax - repPower || target.hits < target.hitsMax / 2) && target.hits < hitsLimit;
};
