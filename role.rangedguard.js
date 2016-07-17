/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.guard');
 * mod.thing == 'a thing'; // true
 */


var rolerangedguard = {
    run: function(creep) {
        var targets = creep.room.find(Game.HOSTILE_CREEPS);
        if(targets.length) {
            creep.moveTo(targets[0]);
            creep.rangedAttack(targets[0]);
        }
    }
};

module.exports = rolerangedguard;