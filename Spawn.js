
var Spawn = {

    run: function(RoomName) {
        var spawn = Game.rooms[RoomName].find(FIND_MY_SPAWNS)[0];
        //console.log(spawn.name);
        var totalCreeps = 0; 
        var maxCreeps = 0;
        var NumofSpawns = 5;
    	var SpawnRange = new Array(NumofSpawns);
    	    for(i=0;i<NumofSpawns;i++){SpawnRange[i]=299+i*100;}
    	var RangeID = 0;
    	var PartsA = new Array(NumofSpawns); 
    	    PartsA[0]= [WORK,WORK,CARRY,MOVE]; 
    	    PartsA[1]= [WORK,WORK,CARRY,CARRY,CARRY,MOVE];  
    	    PartsA[2]= [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]; 
    	    PartsA[3]= [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
    	    PartsA[4]= [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
    	var NumofTypes = 10;
    	var numofFields = 5;
    	var TWeights = new Array(NumofTypes);
    	   //      Harvester            Guard         Upgrader         repairer        
    	    TWeights[0] = 0; TWeights[1] = 8; TWeights[2] = 3; TWeights[3] = 6;
    	   //      builder       rangedguard        tharvester      atcontroller
    	    TWeights[4] = 5; TWeights[5] = 7; TWeights[6] = 4; TWeights[7] = 9;
    	   //      Gather       Haul
    	   TWeights[8] = 1; TWeights[9] = 2;
    	var toggle = false;
        var Types = new Array(NumofTypes);           // Type Name     Type Min       Type Current            Parts                                                        Cost
        Types[TWeights[0]] = new Array(numofFields); Types[TWeights[0]][0] = 'harvester';    Types[TWeights[0]][1] = 2;  Types[TWeights[0]][4] = 949;  Types[TWeights[0]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.roomName == RoomName).length;     Types[TWeights[0]][3] = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];  
        Types[TWeights[1]] = new Array(numofFields); Types[TWeights[1]][0] = 'guard';        Types[TWeights[1]][1] = 0;  Types[TWeights[1]][4] = 1049; Types[TWeights[1]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard' && creep.memory.roomName == RoomName).length;        Types[TWeights[1]][3] = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,ATTACK,MOVE,MOVE]; 
        Types[TWeights[2]] = new Array(numofFields); Types[TWeights[2]][0] = 'upgrader';     Types[TWeights[2]][1] = 6;  Types[TWeights[2]][4] = 949;  Types[TWeights[2]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.roomName == RoomName).length;      Types[TWeights[2]][3] = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
        Types[TWeights[3]] = new Array(numofFields); Types[TWeights[3]][0] = 'repairer';     Types[TWeights[3]][1] = 1;  Types[TWeights[3]][4] = 949;  Types[TWeights[3]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.roomName == RoomName).length;     Types[TWeights[3]][3] = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
        Types[TWeights[4]] = new Array(numofFields); Types[TWeights[4]][0] = 'builder';      Types[TWeights[4]][1] = 2;  Types[TWeights[4]][4] = 949;  Types[TWeights[4]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.roomName == RoomName).length;      Types[TWeights[4]][3] = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]; 
        Types[TWeights[5]] = new Array(numofFields); Types[TWeights[5]][0] = 'rangedguard';  Types[TWeights[5]][1] = 0;  Types[TWeights[5]][4] = 1049; Types[TWeights[5]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'rangedguard' && creep.memory.roomName == RoomName).length;  Types[TWeights[5]][3] = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK];
        Types[TWeights[6]] = new Array(numofFields); Types[TWeights[6]][0] = 'tharvester';   Types[TWeights[6]][1] = 1;  Types[TWeights[6]][4] = 949;  Types[TWeights[6]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'tharvester' && creep.memory.roomName == RoomName).length;   Types[TWeights[6]][3] = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
        Types[TWeights[7]] = new Array(numofFields); Types[TWeights[7]][0] = 'atcontroller'; Types[TWeights[7]][1] = 0;  Types[TWeights[7]][4] = 849;  Types[TWeights[7]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'atcontroller' && creep.memory.roomName == RoomName).length;  Types[TWeights[7]][3] = [CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE];
        Types[TWeights[8]] = new Array(numofFields); Types[TWeights[8]][0] = 'gather';       Types[TWeights[8]][1] = 1;  Types[TWeights[8]][4] = 949;  Types[TWeights[8]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'gather' && creep.memory.roomName == RoomName).length;   Types[TWeights[8]][3] = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE];
        Types[TWeights[9]] = new Array(numofFields); Types[TWeights[9]][0] = 'haul';         Types[TWeights[9]][1] = 1;  Types[TWeights[9]][4] = 949;  Types[TWeights[9]][2] = _.filter(Game.creeps, (creep) => creep.memory.role == 'haul' && creep.memory.roomName == RoomName).length;  Types[TWeights[9]][3] = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
        //console.log(RoomName);
        
        for (j=SpawnRange.length; j > 0 && !toggle;j--)
            {
                if (SpawnRange[j] < Game.rooms[RoomName].energyCapacityAvailable){
                    if (SpawnRange[j-1] < Game.rooms[RoomName].energyCapacityAvailable)
                    {RangeID = j-1;} else { RangeID = j;}
                    toggle = true;
                }
            }
            toggle = false;
        if (Game.time%5<1){ 
            var stringbuilder = ' RC: '+Game.rooms[RoomName].controller.progress+'/'+Game.rooms[RoomName].controller.progressTotal+' ECap: '+Game.rooms[RoomName].energyCapacityAvailable+' E: '+Game.rooms[RoomName].energyAvailable;
            for (i = 0; i< NumofTypes;i++) {
                if (RangeID == 0 && Types[TWeights[i]][1] >0) { if (i < 6)Types[TWeights[i]][1] = 1; else Types[TWeights[i]][1] = 0;}
                stringbuilder += ' '+Types[TWeights[i]][0].substring(0,2)+' #'+TWeights[i]+' '+Types[TWeights[i]][2]+'/'+Types[TWeights[i]][1];
                totalCreeps += Types[TWeights[i]][2];
                maxCreeps +=Types[TWeights[i]][1];
            }
            stringbuilder = RoomName+' TC: ' + totalCreeps+'/'+maxCreeps+stringbuilder;
            console.log(stringbuilder);
            for (let name in Memory.creeps) { if (!Game.creeps[name]) { console.log('deleting '+name+' role '+Memory.creeps[name].role); delete Memory.creeps[name]; } }
        }
        if (Game.rooms[RoomName].energyCapacityAvailable < Types[0][4] ){
            if(Types[TWeights[0]][2] ==0 && Types[TWeights[8]][2] ==0 && Types[TWeights[9]][2] ==0) {RangeID = 0;}
            //console.log('RangeID:'+RangeID+' Spawn Range '+SpawnRange[j]+' energyCap:'+Game.rooms[RoomName].energyCapacityAvailable);
                
                for (i=0; i <NumofTypes; i++){
                    if (RangeID == 0 && Types[TWeights[i]][1] >0) { if (i < 6)Types[TWeights[i]][1] = 1; else Types[TWeights[i]][1] = 0;}
                    if (Types[TWeights[i]][1] > Types[TWeights[i]][2] && !spawn.spawning && Game.rooms[RoomName].energyAvailable > SpawnRange[RangeID] && Game.rooms[RoomName].energyCapacityAvailable > SpawnRange[RangeID] && !toggle){         
                        var newName = spawn.createCreep(PartsA[RangeID], undefined, {role: Types[TWeights[i]][0]});
                        if (Game.creeps[newName]){ Game.creeps[newName].memory.roomName = RoomName;}
                        console.log('Spawning new '+Types[TWeights[i]][0]+': ' + newName);
                        toggle = true;
                    }
                } 
            }
            else 
                if (Game.rooms[RoomName].energyCapacityAvailable > Types[TWeights[0]][4]){
                    for (i=0; i <NumofTypes; i++){
                        if (Types[TWeights[i]][1] > Types[TWeights[i]][2] && !spawn.spawning && Game.rooms[RoomName].energyAvailable > Types[TWeights[i]][4] && !toggle){         
                            var newName = spawn.createCreep(Types[TWeights[i]][3], undefined, {role: Types[TWeights[i]][0]});
                            if (Game.creeps[newName]){ Game.creeps[newName].memory.roomName = RoomName;}
                            console.log('Spawning new '+Types[TWeights[i]][0]+': ' + newName);
                            toggle = true;
                        }
                    }
                } 
                /* else  
                    if (Game.rooms[RoomName].energyCapacityAvailable > Types[TWeights[0]][4] && totalCreeps == maxCreeps){
                        for (i=0; i <NumofTypes; i++){
                            if ((Types[TWeights[i]][0] == 'harvester' || Types[TWeights[i]][0] == 'upgrader' || Types[TWeights[i]][0] == 'builder') && Types[TWeights[i]][1] > Types[TWeights[i]][2] && !spawn.spawning && Game.rooms[RoomName].energyAvailable > Types[TWeights[i]][4] && !toggle){         
                                var newName = spawn.createCreep(Types[TWeights[i]][3], undefined, {role: Types[TWeights[i]][0]});
                                if (Game.creeps[newName]){ Game.creeps[newName].memory.roomName = 'W44S37';}
                                console.log('Spawning new '+Types[TWeights[i]][0]+': ' + newName);
                                toggle = true;
                            }
                        }
                    } */
    }
};

module.exports = Spawn;