
var Spawn = {

    run: function(RoomName, DebugMode) {
        const spawn = Game.rooms[RoomName].find(FIND_MY_SPAWNS)[0];
        var totalCreeps = 0; 
        var maxCreeps = 0;
        const NumofSpawns = 5;
    	var SpawnRange = new Array(NumofSpawns);
    	var RangeID = 0;
    	var PartsA = new Array(NumofSpawns); 
    	const NumofTypes = 9;
    	const numofFields = 6;
    	var TWeights = new Array(NumofTypes);
    	var toggle = false;
        var Types = new Array(NumofTypes);  
        
        for(i=0;i<NumofSpawns;i++){SpawnRange[i]=299+i*100;}
        var SpawnRangeResult = SpawnRange[0];
        
        PartsA[0]= [WORK,WORK,CARRY,MOVE]; 
        PartsA[1]= [WORK,WORK,CARRY,CARRY,CARRY,MOVE];  
        PartsA[2]= [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]; 
        PartsA[3]= [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
        PartsA[4]= [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
 	 
        var Parts = PartsA[0];
        
        TWeights[0] = 0; // weight                                                                                                            
        Types[TWeights[0]] = new Array(numofFields); 
            Types[TWeights[0]][0] = 'harvester';    // Type Name   
            Types[TWeights[0]][1] = 1;  //   Type Min 
            Types[TWeights[0]][4] = 949;  // Cost
            Types[TWeights[0]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.memory.roomName === RoomName).length;    // Type Current 
            Types[TWeights[0]][3] = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];  //  Parts    
            Types[TWeights[0]][5] = '';
            
        TWeights[1] = 7; // weight 
        Types[TWeights[1]] = new Array(numofFields); 
            Types[TWeights[1]][0] = 'combat';     // Type Name      
            Types[TWeights[1]][1] = 0;  //   Type Min 
            Types[TWeights[1]][4] = 1049; // Cost
            Types[TWeights[1]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'combat' && creep.memory.subrole === 'guard' && creep.memory.roomName === RoomName).length;        // Type Current
            Types[TWeights[1]][3] = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,ATTACK,MOVE,MOVE]; //  Parts    
            Types[TWeights[1]][5] = 'guard';
            
        TWeights[2] = 3;
        Types[TWeights[2]] = new Array(numofFields); 
            Types[TWeights[2]][0] = 'upgrader';    // Type Name    
            Types[TWeights[2]][1] = 6;  //   Type Min 
            Types[TWeights[2]][4] = 949;  // Cost
            Types[TWeights[2]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader' && creep.memory.roomName === RoomName).length;      // Type Current
            Types[TWeights[2]][3] = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; //  Parts    
            Types[TWeights[2]][5] = '';
            
        TWeights[3] = 5;
        Types[TWeights[3]] = new Array(numofFields); 
            Types[TWeights[3]][0] = 'repairer';     // Type Name   
            Types[TWeights[3]][1] = 1;  //   Type Min 
            Types[TWeights[3]][4] = 949;  // Cost
            Types[TWeights[3]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer' && creep.memory.roomName === RoomName).length;     // Type Current
            Types[TWeights[3]][3] = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; //  Parts    
            Types[TWeights[3]][5] = '';
            
            
        TWeights[4] = 6;
        Types[TWeights[4]] = new Array(numofFields); 
            Types[TWeights[4]][0] = 'combat';  // Type Name   
            Types[TWeights[4]][1] = 0;  //   Type Min 
            Types[TWeights[4]][4] = 1049; // Cost
            Types[TWeights[4]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'combat' && creep.memory.subrole === 'rangedguard' && creep.memory.roomName === RoomName).length;  // Type Current
            Types[TWeights[4]][3] = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK]; //  Parts    
            Types[TWeights[4]][5] = 'rangedguard';
            
        TWeights[5] = 4;
        Types[TWeights[5]] = new Array(numofFields); 
            Types[TWeights[5]][0] = 'tharvester';   // Type Name   
            Types[TWeights[5]][1] = 1;  //   Type Min 
            Types[TWeights[5]][4] = 949;  // Cost
            Types[TWeights[5]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'tharvester' && creep.memory.roomName === RoomName).length;   // Type Current
            Types[TWeights[5]][3] = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; //  Parts    
            Types[TWeights[5]][5] = '';
            
        TWeights[6] = 8;
        Types[TWeights[6]] = new Array(numofFields); 
            Types[TWeights[6]][0] = 'combat'; // Type Name   
            Types[TWeights[6]][1] = 0;  //   Type Min 
            Types[TWeights[6]][4] = 849;  // Cost
            Types[TWeights[6]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'combat' && creep.memory.subrole === 'atcontroller' && creep.memory.roomName === RoomName).length;  // Type Current
            Types[TWeights[6]][3] = [CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE]; //  Parts    
            Types[TWeights[6]][5] = 'atcontroller';
            
        TWeights[7] = 1;
        Types[TWeights[7]] = new Array(numofFields); 
            Types[TWeights[7]][0] = 'gather';       // Type Name   
            Types[TWeights[7]][1] = 1;  //   Type Min 
            Types[TWeights[7]][4] = 849;  // Cost
            Types[TWeights[7]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'gather' && creep.memory.roomName === RoomName).length;   // Type Current
            Types[TWeights[7]][3] = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE]; //  Parts    
            Types[TWeights[7]][5] = '';
            
        TWeights[8] = 2;
        Types[TWeights[8]] = new Array(numofFields); 
            Types[TWeights[8]][0] = 'haul';         // Type Name   
            Types[TWeights[8]][1] = 1;  //   Type Min 
            Types[TWeights[8]][4] = 949;  // Cost
            Types[TWeights[8]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'haul' && creep.memory.roomName === RoomName).length;  // Type Current
            Types[TWeights[8]][3] = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]; //  Parts    
            Types[TWeights[8]][5] = '';
            
        for (j=SpawnRange.length; j > 0 && !toggle;j--) {
            if (SpawnRange[j] < Game.rooms[RoomName].energyCapacityAvailable){
                if (SpawnRange[j-1] < Game.rooms[RoomName].energyCapacityAvailable)
                {RangeID = j-1;} else { RangeID = j;}
                toggle = true;
            }
        }
        toggle = false;
        
        

        
        if(Types[TWeights[0]][2] ===0 || ( Types[TWeights[8]][2] ===0 && Types[TWeights[7]][2] ===0 ) ) {
            RangeID = 0;
        }else {
            if(Types[TWeights[0]][2] ===1 && Types[TWeights[8]][2] ===0 && Game.rooms[RoomName].energyAvailable > SpawnRange[1]){
                RangeID = 1;
            } else {
                RangeID = 0;
            }
        }
        //console.log(RangeID);
        if (Game.rooms[RoomName].energyCapacityAvailable < Types[TWeights[0]][4] || (Types[TWeights[0]][2] <2 && Types[TWeights[8]][2] ===0) ){
            SpawnRangeResult = SpawnRange[RangeID];
            Parts = PartsA[RangeID];
        }
        if (Game.rooms[RoomName].energyCapacityAvailable > Types[TWeights[0]][4]){
            SpawnRangeResult = Types[TWeights[0]][4];
        }
        
        for (i=0; i <NumofTypes; i++){
            if (Game.rooms[RoomName].energyCapacityAvailable > Types[TWeights[0]][4]){
                Parts = Types[i][3];
            } 
            if (RangeID < 3 && SpawnRangeResult < SpawnRange[3]) { 
                if (i ===TWeights[0] || i===TWeights[5] || i===TWeights[3] || i===TWeights[2] )
                    Types[i][1] = 1; 
                else 
                    Types[i][1] = 0;
            }
            if (Types[i][1] > Types[i][2] && !spawn.spawning && Game.rooms[RoomName].energyAvailable > SpawnRangeResult  && Game.rooms[RoomName].energyCapacityAvailable > SpawnRangeResult && !toggle){         
                var newName = spawn.createCreep(Parts, undefined, {role: Types[i][0]});
                if (Game.creeps[newName]){ Game.creeps[newName].memory.roomName = RoomName;}
                if (Game.creeps[newName] && Types[i][5] !== ''){ Game.creeps[newName].memory.subrole = Types[i][5]; }
                if (DebugMode) console.log('SRange '+SpawnRangeResult+' Spawning new '+Types[i][0]+': ' + newName + ' Parts: '+Parts+' Room: '+RoomName);
                toggle = true;
            }
        }
        
        if (DebugMode && Game.time%10===0){ 
            var stringbuilder = ' RC: '+Game.rooms[RoomName].controller.progress+'/'+Game.rooms[RoomName].controller.progressTotal+
                                ' ECap: '+Game.rooms[RoomName].energyCapacityAvailable+' E: '+Game.rooms[RoomName].energyAvailable;
            for (i = 0; i< NumofTypes;i++) {
                stringbuilder += ' '+Types[TWeights[i]][0].substring(0,2)+' #'+TWeights[i]+' '+Types[TWeights[i]][2]+'/'+Types[TWeights[i]][1];
                totalCreeps += Types[TWeights[i]][2];
                maxCreeps +=Types[TWeights[i]][1];
            }
            stringbuilder = RoomName+' TC: ' + totalCreeps+'/'+maxCreeps+stringbuilder;
            console.log(stringbuilder);
        }
    
        if (Game.time%100===0){ 
            for (let name in Memory.creeps) { 
                if (!Game.creeps[name]) { 
                    if (DebugMode) console.log('deleting '+name+' role '+Memory.creeps[name].role+' room: '+Memory.creeps[name].roomName); 
                    delete Memory.creeps[name]; 
                } 
            } 
        }
    
    }
};

module.exports = Spawn;