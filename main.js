/** @module main */
const roleHarvester = require('role.harvester');
const roletHarvester = require('role.tharvester');
const roleUpgrader = require('role.upgrader');
const rolerepairer = require('role.repairer');
const rolegather = require('role.gather');
const rolehaul = require('role.haul');
const rolecombat = require('role.combat');

require('./ext_StructureTower');
const controller_tower = require('./controller_tower');

const SpawnSystem = require('Spawn');
const DebugMode = true;
module.exports.loop = function() {
    //for (let name in Memory.creeps) { if (Game.creeps[name]) { Game.creeps[name].memory.roomName = RoomNames[0]; } }
    //for (i=0;i<RoomNum;i++) { SpawnSystem.run(RoomNames[i]); }
    
    PathFinder.use(true);
    
    const rooms = Game.rooms;
    for (let roomKey in rooms) {
        let room = Game.rooms[roomKey];
        let isMyRoom = (room.controller ? room.controller.my : 0);
        if (isMyRoom) {
            SpawnSystem.run(room.name, DebugMode);
                //return room.controller;
        }
    }
    
    controller_tower.run();
    
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role === 'harvester') { roleHarvester.run(creep); }
        if (creep.memory.role === 'tharvester') { roletHarvester.run(creep); }
        if (creep.memory.role === 'upgrader') { roleUpgrader.run(creep); }
        if (creep.memory.role === 'repairer') { rolerepairer.run(creep); }
        if (creep.memory.role === 'gather') { rolegather.run(creep);}
        if (creep.memory.role === 'haul') { rolehaul.run(creep);}
        
        if (creep.memory.role === 'combat') { rolecombat.run(creep);}
        
    }
    //console.log(Game.time);
};
