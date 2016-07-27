/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.atcontroller');
 * mod.thing == 'a thing'; // true
 */

var atcontroller = {
    run: function(creep) {
        var targetRoomName = "W44S37";
var targetPos = new RoomPosition(12,11, targetRoomName);
        //if (creep.room.roomName != targetRoomName && false){
        //    if (creep.moveTo(targetPos)){
        //        creep.moveTo(targetPos);
        //    }
        //} else
        
        creep.claimController(creep.room.controller);
        if(creep.moveTo(creep.room.controller, {reusePath: 10})) {
            creep.moveTo(creep.room.controller, {reusePath: 10});
            creep.claimController(creep.room.controller);
        } 
    }
};

module.exports = atcontroller;