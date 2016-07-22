/** @module main */

require('./ext_StructureTower');
// var roleHarvester = require('role.harvester');
// var roletHarvester = require('role.tharvester');
// var roleUpgrader = require('role.upgrader');
// var roleBuilder = require('role.builder');
// var rolerepairer = require('role.repairer');
// var roleguard = require('role.guard');
// var rolerangedguard = require('role.rangedguard');
// var roleatcontroller = require('role.atcontroller');
var SpawnSystem = require('Spawn');
let controller_tower = require('./controller_tower');

module.exports.loop = function() {
    for (let name in Memory.creeps) { if (!Game.creeps[name]) { delete Memory.creeps[name]; } }
    
    controller_tower.run();
	SpawnSystem.run();
	// Variables
	// var NumofSpawns = 5;
	// var SpawnRange = new Array(NumofSpawns);
	    // for(i=0;i<NumofSpawns;i++){SpawnRange[i]=299+i*100;}
	// var RangeID = 0;
	// var PartsA = new Array(NumofSpawns); 
	    // PartsA[0]= [WORK,WORK,CARRY,MOVE]; 
	    // PartsA[1]= [WORK,WORK,CARRY,CARRY,CARRY,MOVE];  
	    // PartsA[2]= [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]; 
	    // PartsA[3]= [WORK,WORK,CARRY,CARRY,MOVE,CARRY,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
	    // PartsA[4]= [WORK,WORK,WORK,CARRY,CARRY,MOVE,CARRY,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
	// var NumofTypes = 8;
	// var numofFields = 5;
	// var TWeights = new Array(NumofTypes);
	   // //      Harvester            Guard         Upgrader         repairer        
	    // TWeights[0] = 0; TWeights[1] = 6; TWeights[2] = 3; TWeights[3] = 2;
	   // //      builder       rangedguard        tharvester      atcontroller
	    // TWeights[4] = 1; TWeights[5] = 5; TWeights[6] = 4; TWeights[7] = 7;
	// var toggle = false;
    // var Types = new Array(NumofTypes);           // Type Name     Type Min       Type Current
        // // Parts                                                        Cost
    // Types[TWeights[0]] = new Array(numofFields); Types[TWeights[0]][0] = 'harvester'; Types[TWeights[0]][1] = 5; Types[TWeights[0]][4] = 999; Types[TWeights[0]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;   
        // Types[TWeights[0]][3] = [WORK,WORK,CARRY,CARRY,MOVE,CARRY,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];  
    // Types[TWeights[1]] = new Array(numofFields); Types[TWeights[1]][0] = 'guard';     Types[TWeights[1]][1] = 0; Types[TWeights[1]][4] = 1099; Types[TWeights[1]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard').length; 
        // Types[TWeights[1]][3] = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,ATTACK,MOVE,MOVE]; 
    // Types[TWeights[2]] = new Array(numofFields); Types[TWeights[2]][0] = 'upgrader';  Types[TWeights[2]][1] = 5; Types[TWeights[2]][4] = 999; Types[TWeights[2]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;   
        // Types[TWeights[2]][3] = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,MOVE,MOVE,MOVE]; 
    // Types[TWeights[3]] = new Array(numofFields); Types[TWeights[3]][0] = 'repairer';  Types[TWeights[3]][1] = 3;  Types[TWeights[3]][4] = 999; Types[TWeights[3]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer').length;    
        // Types[TWeights[3]][3] = [CARRY,WORK,WORK,WORK,CARRY,CARRY,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]; 
    // Types[TWeights[4]] = new Array(numofFields); Types[TWeights[4]][0] = 'builder';   Types[TWeights[4]][1] = 3;  Types[TWeights[4]][4] = 999; Types[TWeights[4]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;     
        // Types[TWeights[4]][3] = [WORK,WORK,WORK,WORK,CARRY,CARRY,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];  
    // Types[TWeights[5]] = new Array(numofFields); Types[TWeights[5]][0] = 'rangedguard';Types[TWeights[5]][1] = 0; Types[TWeights[5]][4] = 1099; Types[TWeights[5]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'rangedguard').length; 
        // Types[TWeights[5]][3] = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK];
    // Types[TWeights[6]] = new Array(numofFields); Types[TWeights[6]][0] = 'tharvester';Types[TWeights[6]][1] = 1;  Types[TWeights[6]][4] = 999; Types[TWeights[6]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'tharvester').length; 
        // Types[TWeights[6]][3] = [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
    // Types[TWeights[7]] = new Array(numofFields); Types[TWeights[7]][0] = 'atcontroller';Types[TWeights[7]][1] = 0; Types[TWeights[7]][4] = 849; Types[TWeights[7]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'atcontroller').length; 
        // Types[TWeights[7]][3] = [CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE];
    
 
    }
    // if (Game.spawns.Spawn1.room.energyCapacityAvailable < Types[0][4]){
        // for (j=SpawnRange.length; j >= 0 && !toggle;j--)
        // {
            // if (SpawnRange[j] < Game.spawns.Spawn1.room.energyCapacityAvailable)
            // {
                // RangeID = j;
                // toggle = true;
            // }
        // }
        // //console.log('RangeID:'+RangeID+'energyCap:'+Game.spawns.Spawn1.room.energyCapacityAvailable);
        // toggle = false;
        // for (i=0; i <NumofTypes; i++){
            // if (Types[i][1] > Types[i][2] && Game.spawns.Spawn1.room.energyAvailable > SpawnRange[RangeID] && !toggle){         
                // var newName = Game.spawns.Spawn1.createCreep(PartsA[RangeID], undefined, {role: Types[i][0]});
                // console.log('Spawning new '+Types[i][0]+': ' + newName);
                // toggle = true;
            // }
        // } 
    // }
    // else
    // for (i=0; i <NumofTypes; i++){
        // if (Types[i][1] > Types[i][2] && Game.spawns.Spawn1.room.energyAvailable > Types[i][4] && !toggle){         
            // var newName = Game.spawns.Spawn1.createCreep(Types[i][3], undefined, {role: Types[i][0]});
            // console.log('Spawning new '+Types[i][0]+': ' + newName);
            // toggle = true;
        // }
    // }
    // for(var name in Game.creeps) {
        // var creep = Game.creeps[name];
        // if (creep.memory.role == Types[TWeights[0]][0]) { roleHarvester.run(creep); }
        // if (creep.memory.role == Types[TWeights[6]][0]) { roletHarvester.run(creep); }
        // if (creep.memory.role == Types[TWeights[2]][0]) { roleUpgrader.run(creep); }
        // if (creep.memory.role == Types[TWeights[4]][0]) { roleBuilder.run(creep); }
        // if (creep.memory.role == Types[TWeights[3]][0]) { rolerepairer.run(creep); }
        // if (creep.memory.role == Types[TWeights[1]][0]) { roleguard.run(creep); }
        // if (creep.memory.role == Types[TWeights[5]][0]) { rolerangedguard.run(creep);}
        // if (creep.memory.role == Types[TWeights[7]][0]) { roleatcontroller.run(creep);}
        
    // }
    //console.log(Game.time);

