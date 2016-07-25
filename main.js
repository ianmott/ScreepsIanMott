/** @module main */

var roleHarvester = require('role.harvester');
var roletHarvester = require('role.tharvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolerepairer = require('role.repairer');
var roleguard = require('role.guard');
var rolerangedguard = require('role.rangedguard');
var roleatcontroller = require('role.atcontroller');

require('./ext_StructureTower');
let controller_tower = require('./controller_tower');
var SpawnSystem = require('Spawn');
var RoomNames = new Array(2);
var RoomNum = RoomNames.length;
RoomNames[0] = 'W44S38';
RoomNames[1] = 'W44S37';

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
        
    }
    //console.log(Game.time);
};
