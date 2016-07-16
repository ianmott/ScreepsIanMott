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
	
	// Variables
	var energyspawnlevel = 299;
    var minharvester = 5;
	var minbuilder = 6;
	var minupgrader = 6;
	var minrepairer = 2;
    var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    
    var Types = new Array(4);
    Types[0] = new Array(3); Types[0][0] = 'harvester';Types[0][1] = 5;Types[0][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
    Types[1] = new Array(3); Types[1][0] = 'builder';Types[1][1] = 6;Types[1][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
    Types[2] = new Array(3); Types[2][0] = 'upgrader';Types[2][1] = 6;Types[2][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;
    Types[3] = new Array(3); Types[3][0] = 'repairer'; Types[3][1] = 2; Types[3][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer').length;
    for (i=0; i <4; i++){
        if (Types[i][1] < Types[i][2])
        {
            var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: Types[i][0]});
            console.log('h#/X='+Types[0][1]+'/'+Types[0][2]+' b#/X='+Types[1][1]+'/'+Types[1][2]+' u#/X='+Types[2][1]+'/'+Types[2][2]+' r#/X='+Types[3][1]+'/'+Types[3][2]);
            console.log('Spawning new '+Types[i][0]+': ' + newName);
        }
        
    }
    // console.log('h#/X='+harvester.length+'/'+minharvester+' b#/X='+builder.length+'/'+minbuilder+' u#/X='+upgrader.length+'/'+minupgrader+' r#/X='+repairer.length+'/'+minrepairer);
    
    
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
