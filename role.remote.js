
var roleGather = {

    /** @param {Creep} creep **/
    run: function(creep, role) {
        if(!creep.memory.harvesting)
        {
            creep.memory.harvesting = false;
        }
        if(creep.memory.harvesting && creep.carry.energy === 0) {
            creep.memory.harvesting = false;
        }
        if(!creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {
            creep.memory.harvesting = true;
        }
        if (role === 'rh')
        {
            const flag = Game.flags['Flag1'];
            const targetRoomName = flag.pos.roomName;//creep.memory.targetRoomName;
            if (creep.room.name !== targetRoomName){
                if (creep.moveTo(flag)){
                    creep.moveTo(flag);
                }
            } else
                if (creep.carry.energy < creep.carryCapacity && !creep.memory.harvesting)
                {
                    var energy = creep.pos.findInRange(
                        FIND_DROPPED_ENERGY,
                        25
                    );
                    var t = 0;
                    if (energy.length > 0) 
                        t = 1;
                    if (energy.length) {
                        if(creep.moveTo(energy[t], {reusePath: 10}) === ERR_NOT_IN_RANGE) {
                            creep.pickup(energy[t]);
                        }else
                            creep.pickup(energy[t]);
                        }
                } else  {

                            var targets = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                //    return (structure.structureType === STRUCTURE_TOWER  || || structure.structureType === STRUCTURE_CONTAINER 
                                    return (structure.structureType === STRUCTURE_EXTENSION ||  
                                            structure.structureType === STRUCTURE_SPAWN 
                                            ) && structure.energy < structure.energyCapacity ;
                                }
                            });
                            if (targets.length > 0){
                                //console.log(targets[0]);
                                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(targets[0], {reusePath: 10});
                                }
                            } else
                            {
                                if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.storage, {reusePath: 10});
                                }

                            }
                        }
        }
        if (role === 'rg')
        {
            const flag = Game.flags['Flag1'];
            const targetRoomName = flag.pos.roomName;//creep.memory.targetRoomName;
            if (creep.room.name !== targetRoomName){
                if (creep.moveTo(flag)){
                    creep.moveTo(flag);
                }
            } else
            {
                var t = 0;
                var sources = creep.room.find(FIND_SOURCES);
                if (sources.length > 0 && sources[t].energy > 0) 
                    t =1;
                if(creep.harvest(sources[t]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[t], {reusePath: 10});
                }
            }
        }
         
    }
};

module.exports = roleGather;