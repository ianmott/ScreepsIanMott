
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targetRoomName = "W44S37";
var targetPos = new RoomPosition(12,11, targetRoomName);
        if(!creep.memory.harvesting)
        {
        creep.memory.harvesting = false;
        }
        if(creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = false;
        }
        if(!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = true;
        }
        if (creep.memory.roomName == targetRoomName && creep.room.name != targetRoomName)        {        creep.moveTo(targetPos);        } else 
        
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.harvesting)
        {
            var energy = creep.pos.findInRange(
                FIND_DROPPED_ENERGY,
                15
            );
            var t = 0;
            //if (energy.length > 0) t =1;
            if (energy.length) {
                //console.log('found ' + energy[t].energy + ' energy at ', energy[t].pos);
                if(creep.moveTo(energy[t], {reusePath: 5}) == ERR_NOT_IN_RANGE) {
                creep.pickup(energy[t]);
            }else
                creep.pickup(energy[t]);
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                //    return (structure.structureType == STRUCTURE_TOWER  || || structure.structureType == STRUCTURE_CONTAINER 
                    return (structure.structureType == STRUCTURE_EXTENSION ||  structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_STORAGE
                            ) && structure.energy < structure.energyCapacity ;
                }
            });
                //console.log(targets[0]);
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 5});
                }
        }
        
    }
};

module.exports = roleHarvester;