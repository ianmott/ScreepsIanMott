
var roleGather = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var t = 0;
        var sources = creep.room.find(FIND_SOURCES);
            if (sources.length > 0) t =1;
        if(creep.harvest(sources[t]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[t], {reusePath: 10});
        } 
    }
};

module.exports = roleGather;