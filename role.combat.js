/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.guard');
 * mod.thing === 'a thing'; // true
 */


var roleguard = {
    run: function(creep,subtype) {
        if (subtype === 'guard'){
            var targets = creep.room.find(Game.HOSTILE_CREEPS, {
                    filter: (creep) => {
                        return (creep.hits < creep.hitsMax);
                    }
            });
            if(targets.length > 0) {
                if(creep.moveTo(targets[0])) {
                    creep.moveTo(targets[0]);
                    creep.attack(targets[0]);
                }
            }else {
                if(creep.moveTo(creep.room.controller) != ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        if (subtype === 'rangedguard'){
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
        }
        if (subtype === 'atcontroller'){
            var targetRoomName = creep.memory.targetRoomName;
            if (creep.room.roomName != targetRoomName){
                var targetPos = Game.rooms[roomname].findExitTo(targetRoomName);
                if (creep.moveTo(targetPos)){
                    creep.moveTo(targetPos);
                }
            } else
            {
                creep.claimController(creep.room.controller);
                if(creep.moveTo(creep.room.controller, {reusePath: 10})) {
                    creep.moveTo(creep.room.controller, {reusePath: 10});
                    creep.claimController(creep.room.controller);
                }
            }
        }
    }
};

module.exports = roleguard;