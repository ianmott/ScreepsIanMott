/** @module main */

require('./ext_Array');
require('./ext_Creep');
require('./ext_Object');
require('./ext_Room');
require('./ext_StructureTower');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolerepairer = require('role.repairer')

let builder = require('./builder');
let controller_def = require('./controller_def');
let controller_harv = require('./controller_harv');
let controller_tower = require('./controller_tower');

module.exports.loop = function() {
    for (let name in Memory.creeps) { if (!Game.creeps[name]) { delete Memory.creeps[name]; } }
    
    controller_tower.run();
    controller_def.run();
    controller_harv.run();
    // builder.run();
	
	
    var minharvester = 5;
	var minbuilder = 5;
	var minupgrader = 7;
	var minrepairer = 4;
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
    //default
    else
    if(upgrader.length < minupgrader && Game.spawns.Spawn1.energy > 299) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new Upgrader: ' + newName);
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
        if(creep.memory.role == 'repairer') {
            rolerepairer.run(creep);
        }
    }
	
};

G = require('./G');
W = require('./W');
util = require('./util');
