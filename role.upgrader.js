var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && sources[0].energy > 0) {
                creep.moveTo(sources[0]);
            }else
            {
            //if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //    creep.moveTo(creep.room.controller);
            //}
            //creep.memory.upgrading = true;
            }
        }
    }
};

module.exports = roleUpgrader;