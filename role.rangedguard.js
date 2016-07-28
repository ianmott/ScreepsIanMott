/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.guard');
 * mod.thing === 'a thing'; // true
 */


var rolerangedguard = {
    run: function(creep) {
        var targets = creep.room.find(Game.HOSTILE_CREEPS, {
                    filter: (creep) => {
                        return (creep.hits < creep.hitsMax);
                    }
            });
            if(targets.length > 0) {
                if(creep.moveTo(targets[0], {reusePath: 10})) {
                    creep.moveTo(targets[0], {reusePath: 10});
                    creep.rangedAttack(targets[0]);
                }
            }
            //else {
            //if(creep.moveTo(creep.room.controller) != ERR_NOT_IN_RANGE) {
            //    creep.moveTo(creep.room.controller);
                //}
            //}
    }
};

module.exports = rolerangedguard;