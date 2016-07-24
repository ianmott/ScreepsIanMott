/** @module main */

var SpawnSystem = require('Spawn');
var RoomNames = new Array(2);
RoomNames[0] = 'W44S38';
RoomNames[1] = 'W44S37';
module.exports.loop = function() {
    
	SpawnSystem.run(RoomNames[0]);

    //console.log(Game.time);
};
