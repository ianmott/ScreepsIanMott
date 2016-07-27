
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var CounterSet = 35;
        if (creep.memory.Counter && creep.carry.energy == 0) {creep.memory.Counter = 0;}
        if(!creep.memory.Counter) {creep.memory.Counter = 0;}
        if (creep.carry.energy == creep.carryCapacity && creep.memory.Counter == 0){
            creep.memory.Counter = CounterSet;}else{if(creep.memory.Counter>0) {creep.memory.Counter--;}}
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                //    return (structure.structureType == STRUCTURE_TOWER
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE
                            ) && structure.energy < structure.energyCapacity ;
                }
            });
        var sources = creep.room.find(FIND_SOURCES);
        
var targetRoomName = "W44S37";

var x =Game.rooms[targetRoomName].controller.pos.x;
var y =Game.rooms[targetRoomName].controller.pos.y;
var targetPos = new RoomPosition(x,y, targetRoomName);
        
        if (sources[0].energy == 0)
        {
            creep.memory.Counter = CounterSet;
        }
        if(creep.carry.energy ==0)
        {
            creep.memory.Counter = 0;
        }
        if (creep.memory.roomName == targetRoomName && creep.room.name != targetRoomName)        {        creep.moveTo(targetPos);        } else {
            if (creep.memory.roomName == targetRoomName && creep.room.name == targetRoomName && creep.memory.Counter == 0)        {  if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {reusePath: 10});
            }
            } else {
        if( creep.carry.energy < creep.carryCapacity && creep.memory.Counter == 0 ) {
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {reusePath: 10});
            } 
        } else
        if(targets.length > 0 && creep.memory.Counter > 0) {
            //console.log(targets.length);
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {reusePath: 10});
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
        }}
    }
};

module.exports = roleHarvester;