
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
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
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.harvesting)
        {
            var energy = creep.pos.findInRange(
                FIND_DROPPED_ENERGY,
                15
            );
            var t = 0;
            if (energy.length) {
                //console.log('found ' + energy[t].energy + ' energy at ', energy[t].pos);
                if(creep.moveTo(energy[t]) == ERR_NOT_IN_RANGE) {
                creep.pickup(energy[t]);
            }else
                creep.pickup(energy[t]);
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                //    return (structure.structureType == STRUCTURE_TOWER
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER 
                            ) && structure.energy < structure.energyCapacity ;
                }
            });
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
        
    }
};

module.exports = roleHarvester;