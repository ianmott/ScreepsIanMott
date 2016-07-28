var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
            if(creep.memory.building && creep.carry.energy === 0) {
                creep.memory.building = false;
            }
            if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
                creep.memory.building = true;
            }
            var sources = creep.room.find(FIND_SOURCES);
            
var targetRoomName = "W44S37";
var targetPos = new RoomPosition(12,11, targetRoomName); 
    var energy = creep.pos.findInRange(
                FIND_DROPPED_ENERGY,
                15
            );
            var t = 0;
            
            if (energy.length && creep.carry.energy !== creep.carryCapacity) {
                //console.log('found ' + energy[t].energy + ' energy at ', energy[t].pos);
                if(creep.moveTo(energy[t], {reusePath: 10}) === ERR_NOT_IN_RANGE) {
                creep.pickup(energy[t]);
            } else creep.pickup(energy[t]);
} else
        if (creep.memory.roomName === targetRoomName && creep.room.name !== targetRoomName)        {        creep.moveTo(targetPos);        } else {
            if(creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {reusePath: 10});
                    }
                }
            }
            else  if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE && sources[0].energy > 0) {
                    creep.moveTo(sources[0], {reusePath: 10});
            }else if(creep.memory.building) {
                if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {reusePath: 10});
                }
            }
        }
    }
};

module.exports = roleBuilder;