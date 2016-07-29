var roletHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let targetnum = 1;
        const sources = creep.room.find(FIND_SOURCES);
        const storage = creep.room.storage;
        if (sources.length === 1    ) 
            targetnum = 0;
        //console.log(storage && storage.store[RESOURCE_ENERGY] > creep.carryCapacity &&  creep.carry.energy < creep.carryCapacity);
        if (storage && storage.store[RESOURCE_ENERGY] > creep.carryCapacity &&  creep.carry.energy < creep.carryCapacity){
            if(creep.withdraw(storage, RESOURCE_ENERGY, creep.carryCapacity - creep.energy) === ERR_NOT_IN_RANGE ) {
                creep.moveTo(storage, {reusePath: 10});
            } 
        }
        else {
        
            if(creep.carry.energy < creep.carryCapacity && sources[targetnum].energy > 0) {
                if(creep.harvest(sources[targetnum]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[targetnum], {reusePath: 10});
                } 
            }
            else {
                //var t  = 1;
                //if (targets.length === 1) t = 0;
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity ;
                        }
                });
                if(targets.length > 0 && targets[0].energy < targets[0].energyCapacity) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {reusePath: 10});
                    }
                }else{
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_EXTENSION ) && structure.energy < structure.energyCapacity   ;
                        }
                    });
                    if(targets.length > 0) {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {reusePath: 10});
                        }
                    }  else
                    {
                        if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, {reusePath: 10});
                        }

                    }
                }
            }
        }
    }
};

module.exports = roletHarvester;