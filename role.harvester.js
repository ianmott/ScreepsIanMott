
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var CounterSet = 25;
        if (creep.memory.Counter && creep.carry.energy == 0) {creep.memory.Counter = 0;}
        if(!creep.memory.Counter) {creep.memory.Counter = 0;}
        if (creep.carry.energy == creep.carryCapacity && creep.memory.Counter == 0){
            creep.memory.Counter = CounterSet;}else{if(creep.memory.Counter>0) {creep.memory.Counter--;}}
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                //    return (structure.structureType == STRUCTURE_TOWER
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER 
                            ) && structure.energy < structure.energyCapacity ;
                }
            });
        var sources = creep.room.find(FIND_SOURCES);
        if (sources[0].energy == 0)
        {
            creep.memory.Counter = CounterSet;
        }
        if(creep.carry.energy ==0)
        {
            creep.memory.Counter = 0;
        }
        if( creep.carry.energy < creep.carryCapacity && creep.memory.Counter == 0 ) {
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            } 
        } else
        if(targets.length > 0 && creep.memory.Counter > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else
        {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTROLLER 
                            ) ;
                }
            });
            if(creep.upgradeController(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
        
    }
};

module.exports = roleHarvester;