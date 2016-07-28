/** @module main */

const roleHarvester = require('role.harvester');
const roletHarvester = require('role.tharvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const rolerepairer = require('role.repairer');
const roleguard = require('role.guard');
const rolerangedguard = require('role.rangedguard');
const roleatcontroller = require('role.atcontroller');
const rolegather = require('role.gather');
const rolehaul = require('role.haul');

require('./ext_StructureTower');
const controller_tower = require('./controller_tower');
const SpawnSystem = require('Spawn');

module.exports.loop = function() {
    //for (let name in Memory.creeps) { if (Game.creeps[name]) { Game.creeps[name].memory.roomName = RoomNames[0]; } }
    //for (i=0;i<RoomNum;i++) { SpawnSystem.run(RoomNames[i]); }
    let rooms = Game.rooms;
    for (let roomKey in rooms) {
    	let room = Game.rooms[roomKey];
    	let isMyRoom = (room.controller ? room.controller.my : 0);
    	if (isMyRoom) {
    	    SpawnSystem.run(room.name);
    		//return room.controller;
    	}
    }
    controller_tower.run();
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') { roleHarvester.run(creep); }
        if (creep.memory.role == 'tharvester') { roletHarvester.run(creep); }
        if (creep.memory.role == 'upgrader') { roleUpgrader.run(creep); }
        if (creep.memory.role == 'builder') { roleBuilder.run(creep); }
        if (creep.memory.role == 'repairer') { rolerepairer.run(creep); }
        if (creep.memory.role == 'guard') { roleguard.run(creep); }
        if (creep.memory.role == 'rangedguard') { rolerangedguard.run(creep);}
        if (creep.memory.role == 'atcontroller') { roleatcontroller.run(creep);}
        if (creep.memory.role == 'gather') { rolegather.run(creep);}
        if (creep.memory.role == 'haul') { rolehaul.run(creep);}
        
    }
    //console.log(Game.time);
};
