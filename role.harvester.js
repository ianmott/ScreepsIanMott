
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.Counter && creep.carry.energy == 0) {creep.memory.Counter = 0;}
        if(!creep.memory.Counter) {creep.memory.Counter = 0;}
        if (creep.carry.energy == creep.carryCapacity && creep.memory.Counter == 0){
            creep.memory.Counter = 22;}else{if(creep.memory.Counter>0) {creep.memory.Counter--;}}
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
//                            structure.structureType == STRUCTURE_TOWER ||
                    return (
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER 
                            ) && structure.energy < structure.energyCapacity ;
                }
            });
        var sources = creep.room.find(FIND_SOURCES);
        if (sources[0].energy == 0)
        {
            creep.memory.Counter = 22;
        }
        if( creep.carry.energy < creep.carryCapacity && creep.memory.Counter == 0 ) {
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            } 
        } 
        if(targets.length > 0 && creep.memory.Counter > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
        
    }
};

module.exports = roleHarvester;