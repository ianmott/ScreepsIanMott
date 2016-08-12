var rolerepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
var sources = creep.room.find(FIND_SOURCES);
        if(creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
        }
// if creep is supposed to repair something
var energy = creep.pos.findInRange(
                FIND_DROPPED_ENERGY,
                15
            );
            var t = 0;
            const flag = Game.flags['T1'];
        const targetRoomName = flag.pos.roomName;
            if (creep.room.name !== targetRoomName && false){
                if (creep.moveTo(flag)){
                    creep.moveTo(flag);
                }
            } else
            if (energy.length && creep.carry.energy !== creep.carryCapacity) {
                //console.log('found ' + energy[t].energy + ' energy at ', energy[t].pos);
                if(creep.moveTo(energy[t], {reusePath: 10}) === ERR_NOT_IN_RANGE) {
                creep.pickup(energy[t]);
            } else creep.pickup(energy[t]);
} else
                if(creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {reusePath: 10});
                    }
                }
            }
            else
        if (creep.memory.building === true) {
            // find closest structure with less than max hits
            // Exclude walls because they have way too many max hits and would keep
            // our repairers busy forever. We have to find a solution for that later.
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => s.hits < s.hitsMax * ((s.structureType === STRUCTURE_WALL)* -0.99992+1) * ((s.structureType === STRUCTURE_RAMPART)* -0.995+1) 
            });

            // if we find one
            if (structure != undefined) {
                // try to repair it, if it is out of range
                if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure, {reusePath: 10});
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {reusePath: 10});
                    }
                }
            }
        } 
        else if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE && sources[0].energy > 0) {
                creep.moveTo(sources[0]);
            } else if(creep.memory.building) {
            if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = rolerepairer;
