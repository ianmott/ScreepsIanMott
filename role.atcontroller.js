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
var targetPos = new RoomPosition(17,0, targetRoomName);
        if (creep.room.roomName != targetRoomName){
            if (creep.moveTo(targetPos)){
                creep.moveTo(targetPos);
            }
        } else
        if(creep.moveTo(creep.room.controller)) {
            creep.moveTo(creep.room.controller);
            creep.claimController(creep.room.controller);
        }
    
        //if(creep.room.roomName != dest){
            //console.log(creep.room.findExitTo(dest));
        //    creep.moveTo(creep.room.findExitTo(dest));
        //}
        //else{
        //    creep.moveTo(35,0);
        //}
            //if(creep.moveTo(creep.room.controller)) {
           //     creep.moveTo(creep.room.controller);
           //     creep.claimController(creep.room.controller);
           // }
        
    }
};

module.exports = atcontroller;