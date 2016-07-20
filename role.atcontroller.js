/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.atcontroller');
 * mod.thing == 'a thing'; // true
 */
// room above me ID 577b92f50f9d51615fa476db W42S41

var atcontroller = {
    run: function(creep) {
        //var dest = 'W42S41';
        var targetRoomName = "W42S41";
var targetPos = new RoomPosition(29,5, targetRoomName);
        //if (creep.moveTo(targetPos)){
        //    creep.moveTo(targetPos);
        //}
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