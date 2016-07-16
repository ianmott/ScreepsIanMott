var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
// check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    };
    var minharvester = 5;
	var minbuilder = 4;
	var minupgrader = 7;
    var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    // console.log('h#/X='+harvester.length+'/'+minbuilder+' b#/X='+builder.length+'/'+minharvester+' u#/X='+upgrader.length+'/'+minupgrader);
    if(harvester.length < minharvester && Game.spawns.Spawn1.energy > 299) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }else
    if(upgrader.length < minupgrader && Game.spawns.Spawn1.energy > 299) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new Upgrader: ' + newName);
    }else
    if(builder.length < minbuilder && Game.spawns.Spawn1.energy > 299) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }  
    
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}