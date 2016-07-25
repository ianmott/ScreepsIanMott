var roletHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targetnum = 1;
            var sources = creep.room.find(FIND_SOURCES);
        if(creep.carry.energy < creep.carryCapacity && sources[targetnum].energy > 0) {
            if(creep.harvest(sources[targetnum]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[targetnum]);
            } 
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity ;
                    }
            });
            if(targets.length > 0 && targets[0].energy >0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_STORAGE)  ;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
        }
    }
};

module.exports = roletHarvester;