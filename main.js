/** @module main */
const roleHarvester = require('role.harvester');
const roletHarvester = require('role.tharvester');
const roleUpgrader = require('role.upgrader');
const rolerepairer = require('role.repairer');
const rolegather = require('role.gather');
const rolehaul = require('role.haul');
const rolecombat = require('role.combat');
const roleremote = require('role.remote');
require('./ext_StructureTower');
const controller_tower = require('./controller_tower');

const SpawnSystem = require('Spawn');
//const DebugMode = true;
Memory.DebugMode = true;
Memory.alliance = [];
Memory.alliance.push("Xeracles");
Memory.alliance.push("universe");
Memory.rooms = [];
Memory.rooms[0] = 'W44S38';
//Memory.rooms[0].push('P');
Memory.rooms[1] = 'W44S37' ;
Memory.rooms[2] = 'W45S38';

module.exports.loop = function() {
    PathFinder.use(true);
    
    const rooms = Game.rooms;
    for (let roomKey in rooms) {
        let room = Game.rooms[roomKey];
        let isMyRoom = (room.controller ? room.controller.my : 0);
        if (isMyRoom) {                                 // Target Room
            SpawnSystem.run(room.name, Memory.DebugMode, Memory.rooms[2]);
                //return room.controller;
        }
    }
    //const NumRooms = Memory.rooms.length;
    //for (i=0;i<NumRooms;i++){
    //    SpawnSystem.run(Memory.rooms[i].name, Memory.DebugMode, Memory.rooms[2][0]);
    //}
    controller_tower.run();
    
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role === 'harvester') { roleHarvester.run(creep); }
        if (creep.memory.role === 'tharvester') { roletHarvester.run(creep); }
        if (creep.memory.role === 'upgrader') { roleUpgrader.run(creep); }
        if (creep.memory.role === 'repairer') { rolerepairer.run(creep); }
        if (creep.memory.role === 'gather') { rolegather.run(creep);}
        if (creep.memory.role === 'haul') { rolehaul.run(creep);}
        if (creep.memory.role === 'remote') { roleremote.run(creep,creep.memory.subrole);}
        if (creep.memory.role === 'combat') { rolecombat.run(creep, creep.memory.subrole);}
      
    }
    //console.log(Game.time);
};
