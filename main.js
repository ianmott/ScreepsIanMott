/** @module main */

const roles = require('roles');

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
    roles.run();
    //console.log(Game.time);
};
