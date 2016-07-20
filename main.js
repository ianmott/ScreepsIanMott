/** @module main */

require('./ext_StructureTower');
var roleHarvester = require('role.harvester');
var roletHarvester = require('role.tharvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolerepairer = require('role.repairer');
var roleguard = require('role.guard');
var rolerangedguard = require('role.rangedguard');
var roleatcontroller = require('role.atcontroller');
let controller_tower = require('./controller_tower');

module.exports.loop = function() {
    for (let name in Memory.creeps) { if (!Game.creeps[name]) { delete Memory.creeps[name]; } }
    
    controller_tower.run();
	
	// Variables
	var NumofTypes = 8;
	var numofFields = 5;
	var TWeights = new Array(NumofTypes);
	   //      Harvester            Guard         Upgrader         repairer        
	    TWeights[0] = 0; TWeights[1] = 6; TWeights[2] = 3; TWeights[3] = 2;
	   //      builder       rangedguard        tharvester      atcontroller
	    TWeights[4] = 1; TWeights[5] = 5; TWeights[6] = 4; TWeights[7] = 7;
	var toggle = false;
    var Types = new Array(NumofTypes);           // Type Name     Type Min       Type Current
        // Parts                                                        Cost
    Types[TWeights[0]] = new Array(numofFields); Types[TWeights[0]][0] = 'harvester'; Types[TWeights[0]][1] = 3; Types[TWeights[0]][4] = 1099; Types[TWeights[0]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;   
        Types[TWeights[0]][3] = [WORK,WORK,CARRY,CARRY,MOVE,CARRY,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];  
    Types[TWeights[1]] = new Array(numofFields); Types[TWeights[1]][0] = 'guard';     Types[TWeights[1]][1] = 1; Types[TWeights[1]][4] = 1199; Types[TWeights[1]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard').length; 
        Types[TWeights[1]][3] = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,ATTACK,MOVE,MOVE]; 
    Types[TWeights[2]] = new Array(numofFields); Types[TWeights[2]][0] = 'upgrader';  Types[TWeights[2]][1] = 5; Types[TWeights[2]][4] = 1199; Types[TWeights[2]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;   
        Types[TWeights[2]][3] = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,MOVE,CARRY,CARRY,MOVE,MOVE]; 
    Types[TWeights[3]] = new Array(numofFields); Types[TWeights[3]][0] = 'repairer';  Types[TWeights[3]][1] = 2;  Types[TWeights[3]][4] = 1199; Types[TWeights[3]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer').length;    
        Types[TWeights[3]][3] = [CARRY,WORK,WORK,WORK,CARRY,CARRY,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]; 
    Types[TWeights[4]] = new Array(numofFields); Types[TWeights[4]][0] = 'builder';   Types[TWeights[4]][1] = 2;  Types[TWeights[4]][4] = 1199; Types[TWeights[4]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;     
        Types[TWeights[4]][3] = [WORK,WORK,WORK,WORK,CARRY,CARRY,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];  
    Types[TWeights[5]] = new Array(numofFields); Types[TWeights[5]][0] = 'rangedguard';Types[TWeights[5]][1] = 2; Types[TWeights[5]][4] = 1199; Types[TWeights[5]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'rangedguard').length; 
        Types[TWeights[5]][3] = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK];
    Types[TWeights[6]] = new Array(numofFields); Types[TWeights[6]][0] = 'tharvester';Types[TWeights[6]][1] = 1;  Types[TWeights[6]][4] = 999; Types[TWeights[6]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'tharvester').length; 
        Types[TWeights[6]][3] = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
    Types[TWeights[7]] = new Array(numofFields); Types[TWeights[7]][0] = 'atcontroller';Types[TWeights[7]][1] = 0; Types[TWeights[7]][4] = 849; Types[TWeights[7]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'atcontroller').length; 
        Types[TWeights[7]][3] = [CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE];
    
    if (Game.time%10<1){ 
        var stringbuilder = 'Energy:'+Game.spawns.Spawn1.room.energyAvailable;
        for (i = 0; i< NumofTypes;i++) {
        stringbuilder += ' '+Types[TWeights[i]][0]+' #'+TWeights[i]+' '+Types[TWeights[i]][2]+'/'+Types[TWeights[i]][1];
        }
        console.log(stringbuilder);
    }
    if (Types[0][2] <= 1){
        if (Game.spawns.Spawn1.room.energyAvailable > 999){
            var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: Types[0][0]});
            console.log('Spawning new '+Types[0][0]+': ' + newName);
        }
    } else
    for (i=0; i <NumofTypes; i++){
        if (Types[i][1] > Types[i][2] && Game.spawns.Spawn1.room.energyAvailable > Types[i][4] && !toggle){         
            var newName = Game.spawns.Spawn1.createCreep(Types[i][3], undefined, {role: Types[i][0]});
            console.log('Spawning new '+Types[i][0]+': ' + newName);
            toggle = true;
        }
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {  roleHarvester.run(creep); }
        if(creep.memory.role == 'tharvester') {  roletHarvester.run(creep); }
        if(creep.memory.role == 'upgrader') {   roleUpgrader.run(creep); }
        if(creep.memory.role == 'builder') {    roleBuilder.run(creep); }
        if(creep.memory.role == 'repairer') {   rolerepairer.run(creep); }
        if (creep.memory.role == 'guard'){      roleguard.run(creep); }
        if (creep.memory.role == 'rangedguard'){rolerangedguard.run(creep);}
        if (creep.memory.role == 'atcontroller'){roleatcontroller.run(creep);}
        
    }
    //console.log(Game.time);
};
