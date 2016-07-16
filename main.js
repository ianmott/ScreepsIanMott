var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolerepairer = require('role.repairer')
module.exports.loop = function () {

    var minharvester = 5;
	var minbuilder = 4;
	var minupgrader = 7;
	var minrepairer = 0;
    var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    // console.log('h#/X='+harvester.length+'/'+minbuilder+' b#/X='+builder.length+'/'+minharvester+' u#/X='+upgrader.length+'/'+minupgrader+' r#/X='+repairer.length+'/'+minrepairer);
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
    }else
    if(repairer.length < minrepairer && Game.spawns.Spawn1.energy > 200) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'});
        console.log('Spawning new repairer: ' + newName);
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
    
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    };
    
}