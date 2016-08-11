/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.guard');
 * mod.thing === 'a thing'; // true
 */


var roleguard = {
    run: function(creep,subrole) {
        const flag = Game.flags['R1'];
        const flag2 = Game.flags['Flag2'];
        const targetRoomName = flag.pos.roomName;

        var targets = creep.room.find(Game.HOSTILE_CREEPS, {
             filter: (creep) => {
                 return (creep.hits < creep.hitsMax);
             }
         });
                
        if (subrole === 'guard'){
 
            if (creep.room.name !== targetRoomName ){
                if (creep.moveTo(flag)){
                    creep.moveTo(flag);
                }
            } else
            if(targets.length > 0) {
                if(creep.moveTo(targets[0])) {
                    creep.moveTo(targets[0]);
                    creep.attack(targets[0]);
                }
            }else {
                if(creep.moveTo(creep.room.controller) !== ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        if (subrole === 'rangedguard'){
            if (creep.room.name !== targetRoomName ){
                if (creep.moveTo(flag)){
                    creep.moveTo(flag);
                }
            } else
            if(targets.length > 0) {
                if(creep.moveTo(targets[0], {reusePath: 10})) {
                    creep.moveTo(targets[0], {reusePath: 10});
                    creep.rangedAttack(targets[0]);
                }
            }
        }
        if (subrole === 'atcontroller'){
            if (creep.room.name !== targetRoomName ){
                if (creep.moveTo(flag)){
                    creep.moveTo(flag);
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