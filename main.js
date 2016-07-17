/** @module main */

require('./ext_StructureTower');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolerepairer = require('role.repairer');
var roleguard = require('role.guard');

let controller_tower = require('./controller_tower');

module.exports.loop = function() {
    for (let name in Memory.creeps) { if (!Game.creeps[name]) { delete Memory.creeps[name]; } }
    
    controller_tower.run();
	
	// Variables
	var energyspawnlevel = 299;
	var NumofTypes = 5;
	var toggle = false;
    var Types = new Array(NumofTypes);           // Type Name     Type Min       Type Current
    Types[0] = new Array(4); Types[0][0] = 'harvester'; Types[0][1] = 4; Types[0][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;   Types[0][3] = [WORK,CARRY,CARRY,MOVE];
    Types[1] = new Array(4); Types[1][0] = 'builder';   Types[1][1] = 5; Types[1][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;     Types[1][3] = [WORK,CARRY,CARRY,MOVE];
    Types[2] = new Array(4); Types[2][0] = 'upgrader';  Types[2][1] = 6; Types[2][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;    Types[2][3] = [WORK,CARRY,CARRY,MOVE];
    Types[3] = new Array(4); Types[3][0] = 'repairer';  Types[3][1] = 4; Types[3][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer').length;    Types[3][3] = [WORK,CARRY,CARRY,MOVE];
    Types[4] = new Array(4); Types[4][0] = 'guard';     Types[4][1] = 3; Types[4][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard').length;       Types[4][3] = [TOUGH,ATTACK,ATTACK,MOVE];
    
    if (Game.time%10==0){ 
        console.log('Energy:'+Game.spawns.Spawn1.room.energyAvailable+' h#/X='+Types[0][2]+'/'+Types[0][1]+' b#/X='+Types[1][2]+'/'+Types[1][1]+' u#/X='+Types[2][2]+'/'+Types[2][1]+' r#/X='+Types[3][2]+'/'+Types[3][1]+' g#/X='+Types[4][2]+'/'+Types[4][1]);
    }
    
    for (i=0; i <NumofTypes; i++){
        if (Types[i][1] > Types[i][2] && Game.spawns.Spawn1.room.energyAvailable > energyspawnlevel && !toggle){         
            var newName = Game.spawns.Spawn1.createCreep(Types[i][3], undefined, {role: Types[i][0]});
            console.log('Spawning new '+Types[i][0]+': ' + newName);
            toggle = true;
        }
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {  roleHarvester.run(creep); }
        if(creep.memory.role == 'upgrader') {   roleUpgrader.run(creep); }
        if(creep.memory.role == 'builder') {    roleBuilder.run(creep); }
        if(creep.memory.role == 'repairer') {   rolerepairer.run(creep); }
        if (creep.memory.role == 'guard'){      roleguard.run(creep); }
    }
    //console.log(Game.time);
};
