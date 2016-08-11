
var Spawn = {

    run: function(RoomName, DebugMode, TargetRoom) {
        const roomTypes = new Array(3);
        var currentRoomType = '';
        const spawn = Game.rooms[RoomName].find(FIND_MY_SPAWNS)[0];
        var totalCreeps = 0; 
        var maxCreeps = 0;
        const NumofSpawns = 8;
    	var SpawnRange = new Array(NumofSpawns);
    	var RangeID = 0;
    	var PartsA = new Array(NumofSpawns); 
    	const NumofCombatTypes = 3;
    	var PartsC = new Array(NumofCombatTypes); 
    	const NumofTypes = 11;
    	const numofFields = 6;
    	var TWeights = new Array(NumofTypes);
    	var toggle = false;
        var Types = new Array(NumofTypes);  
        var stringbuilder = ' RC: '+Game.rooms[RoomName].controller.progress+'/'+Game.rooms[RoomName].controller.progressTotal+
                                ' ECap: '+Game.rooms[RoomName].energyCapacityAvailable+' E: '+Game.rooms[RoomName].energyAvailable;
                                
        PartsC[0] = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE];
        PartsC[1] = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK];
        PartsC[2] = [CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE];

        for (i = 0; i < NumofSpawns;i++){
            SpawnRange[i] = 299+i*100;
        }
        var SpawnRangeResult = SpawnRange[0];
        
        PartsA[0]= [WORK,WORK,CARRY,MOVE]; // 300
        PartsA[1]= [WORK,WORK,CARRY,CARRY,CARRY,MOVE];  // 400
        PartsA[2]= [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]; // 500
        PartsA[3]= [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]; // 600
        PartsA[4]= [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]; // 700
        PartsA[5]= [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]; // 800
        PartsA[6]= [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]; // 900
        PartsA[7]= [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]; // 1000
        //PartsA[8]= [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]; // 1100
        //PartsA[9]= [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]; // 1200
        //PartsA[10]= [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]; // 1300
        //PartsA[11]= [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]; // 1400

        var Parts = PartsA[0];  
        
        roomTypes[0] = 'P'; // Primary
        roomTypes[1] = 'S'; // Secondary
        roomTypes[2] = 'T'; // Target
        
        TWeights[0] = 0; // weight                                                                                                            
        Types[TWeights[0]] = new Array(numofFields); 
            Types[TWeights[0]][0] = 'harvester';    // Type Name   
            Types[TWeights[0]][1] = 2;  //   Type Min 
            Types[TWeights[0]][4] = 999;  // Cost
            Types[TWeights[0]][3] = '';  //  Parts    
            Types[TWeights[0]][5] = '';
            
        TWeights[1] = 7; // weight 
        Types[TWeights[1]] = new Array(numofFields); 
            Types[TWeights[1]][0] = 'combat';     // Type Name      
            Types[TWeights[1]][1] = 0;  //   Type Min 
            Types[TWeights[1]][4] = 999; // Cost
            Types[TWeights[1]][3] = ''; //  Parts    
            Types[TWeights[1]][5] = 'guard';
            
        TWeights[2] = 3;
        Types[TWeights[2]] = new Array(numofFields); 
            Types[TWeights[2]][0] = 'upgrader';    // Type Name    
            Types[TWeights[2]][1] = 7;  //   Type Min 
            Types[TWeights[2]][4] = 849;  // Cost
            Types[TWeights[2]][3] = ''; //  Parts    
            Types[TWeights[2]][5] = '';
            
        TWeights[3] = 5;
        Types[TWeights[3]] = new Array(numofFields); 
            Types[TWeights[3]][0] = 'repairer';     // Type Name   
            Types[TWeights[3]][1] = 2;  //   Type Min 
            Types[TWeights[3]][4] = 949;  // Cost
            Types[TWeights[3]][3] = ''; //  Parts    
            Types[TWeights[3]][5] = '';
             
        TWeights[4] = 6;
        Types[TWeights[4]] = new Array(numofFields); 
            Types[TWeights[4]][0] = 'combat';  // Type Name   
            Types[TWeights[4]][1] = 0;  //   Type Min 
            Types[TWeights[4]][4] = 999; // Cost
            Types[TWeights[4]][3] = ''; //  Parts    
            Types[TWeights[4]][5] = 'rangedguard';
            
        TWeights[5] = 4;
        Types[TWeights[5]] = new Array(numofFields); 
            Types[TWeights[5]][0] = 'tharvester';   // Type Name   
            Types[TWeights[5]][1] = 1;  //   Type Min 
            Types[TWeights[5]][4] = 849;  // Cost
            Types[TWeights[5]][3] = ''; //  Parts    
            Types[TWeights[5]][5] = '';
            
        TWeights[6] = 8;
        Types[TWeights[6]] = new Array(numofFields); 
            Types[TWeights[6]][0] = 'combat'; // Type Name   
            Types[TWeights[6]][1] = 0;  //   Type Min 
            Types[TWeights[6]][4] = 849;  // Cost
            Types[TWeights[6]][3] = ''; //  Parts    
            Types[TWeights[6]][5] = 'atcontroller';
            
        TWeights[7] = 1;
        Types[TWeights[7]] = new Array(numofFields); 
            Types[TWeights[7]][0] = 'gather';       // Type Name   
            Types[TWeights[7]][1] = 1;  //   Type Min 
            Types[TWeights[7]][4] = 849;  // Cost
            Types[TWeights[7]][3] = ''; //  Parts    
            Types[TWeights[7]][5] = '';
            
        TWeights[8] = 2;
        Types[TWeights[8]] = new Array(numofFields); 
            Types[TWeights[8]][0] = 'haul';         // Type Name   
            Types[TWeights[8]][1] = 2;  //   Type Min 
            Types[TWeights[8]][4] = 949;  // Cost
            Types[TWeights[8]][3] = ''; //  Parts    
            Types[TWeights[8]][5] = '';
            
        TWeights[9] = 9;
        Types[TWeights[9]] = new Array(numofFields); 
            Types[TWeights[9]][0] = 'remote';         // Type Name   
            Types[TWeights[9]][1] = 0;  //   Type Min 
            Types[TWeights[9]][4] = 1799;  // Cost
            Types[TWeights[9]][3] = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]; //  Parts    
            Types[TWeights[9]][5] = 'rh';

        TWeights[10] = 10;
        Types[TWeights[10]] = new Array(numofFields); 
            Types[TWeights[10]][0] = 'remote';         // Type Name   
            Types[TWeights[10]][1] = 0;  //   Type Min 
            Types[TWeights[10]][4] = 949;  // Cost
            Types[TWeights[10]][3] = [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK]; //  Parts    
            Types[TWeights[10]][5] = 'rg';
        
        if (RoomName === 'W44S38') {
            currentRoomType = roomTypes[0];
        }
        if (RoomName === 'W44S37') {
            currentRoomType = roomTypes[1];
        }
         // Setup Loop
        for (i = 0; i< NumofTypes;i++) {
                // Check for Current Num of Each Creep Type/Subtype
                if (Types[i][5] === ''){
                    Types[i][2] = _.filter(Game.creeps, (creep) => creep.memory.role === Types[i][0] && creep.memory.roomName === RoomName).length; 
                } else {
                    Types[i][2] = _.filter(Game.creeps, (creep) => creep.memory.role === Types[i][0] && creep.memory.subrole === Types[i][5] && creep.memory.roomName === RoomName).length;
                }
                // Change Creep Max's By Room Type 
                if (currentRoomType === roomTypes[0]) {
                }
                if (currentRoomType === roomTypes[1]) {
                    if (i ===TWeights[7] || i===TWeights[8] || i===TWeights[5] || i===TWeights[3] || i===TWeights[2] || i===TWeights[6] || i===TWeights[4] )
                        Types[i][1] = 1; 
                    else 
                        Types[i][1] = 0;
                }
                
                // Builds Creep Type output
                if (Types[i][5] === ''){
                    stringbuilder += ' '+Types[i][0].substring(0,2)+' #'+TWeights[i]+' '+Types[i][2]+'/'+Types[i][1];
                } else {
                    stringbuilder += ' '+Types[i][5].substring(0,2)+' #'+TWeights[i]+' '+Types[i][2]+'/'+Types[i][1];
                }
                // Suming of Creeps
                totalCreeps += Types[i][2];
                // Max Creep Num
                maxCreeps +=Types[i][1];
                
        }
           //console.log(currentRoomType+RoomName); 
        for (j=0; j < SpawnRange.length;j++) {
            if (SpawnRange[j] < Game.rooms[RoomName].energyCapacityAvailable){
                RangeID = j;
            }
        }
        SpawnRangeResult = SpawnRange[RangeID];
        Parts = PartsA[RangeID];

        //console.log('rid '+RangeID+' srr '+SpawnRangeResult+' p '+Parts);
        
    if (spawn)
        if ( Types[TWeights[0]][2] === 0 && totalCreeps < 2 && !spawn.spawning){
                const newName = spawn.createCreep(PartsA[0], undefined, {role: Types[TWeights[0]][0]});
                if (Game.creeps[newName]){ Game.creeps[newName].memory.roomName = RoomName;}
                if (DebugMode) console.log('Recovery Harvester Being Spawned Check Code! Name:' + newName + ' Parts: '+PartsA[0]+' Room: '+RoomName);
            } else {
                if  (!spawn.spawning){
                    for (i=0; i <NumofTypes && !toggle; i++){
                        SpawnRangeResult = SpawnRange[RangeID];
                        Parts = PartsA[RangeID];
                        //console.log(Types[i][0]+' '+SpawnRangeResult);
                            if (Types[i][0] === 'combat'){
                                Parts = PartsC[0];
                                if (Types[i][5] === 'rangedguard'){
                                    Parts = PartsC[1];}
                                if (Types[i][5] === 'atcontroller'){
                                    Parts = PartsC[2];}
                                
                                SpawnRangeResult = 849;         
                                
                            } else {
                                if (Types[i][0] === 'remote'){
                                    if (Types[i][5] === 'rh'){
                                        Parts = Types[TWeights[9]][3];
                                        SpawnRangeResult = Types[TWeights[9]][4];
                                    }
                                    if (Types[i][5] === 'rg'){
                                        Parts = Types[TWeights[10]][3];
                                        SpawnRangeResult = Types[TWeights[10]][4];
                                    }
                                } else{
                                    //console.log('rid ' + RangeID+'P '+Parts);
                                    if (Game.rooms[RoomName].energyCapacityAvailable > 649 && Types[i][0] === 'gather' ||  Types[i][0] === 'haul' ){
                                        if (Types[i][0] === 'gather' ){
                                            Parts = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE];
                                            SpawnRangeResult = 649;
                                        }
                                        if (Types[i][0] === 'haul' ){
                                            Parts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
                                            SpawnRangeResult = 649;
                                        }
                                    }
                                }
                            }
                        if (!SpawnRangeResult){
                            Parts = PartsA[RangeID];    
                            SpawnRangeResult = SpawnRange[RangeID];
                        }
                        //console.log(Types[i][1] > Types[i][2]);
                        //console.log(Types[i][0]+' '+SpawnRangeResult);
                            //console.log(Types[i][0]+' '+Parts); 
                            //console.log(Types[i][0]);
                            //console.log( Game.rooms[RoomName].energyCapacityAvailable > SpawnRangeResult);
                        if (Types[i][1] > Types[i][2] && !spawn.spawning && Game.rooms[RoomName].energyAvailable > SpawnRangeResult  && Game.rooms[RoomName].energyCapacityAvailable > SpawnRangeResult){    
                            
                             
                            //console.log(Types[i][0]+' '+Parts);   
                            var newName = spawn.createCreep(Parts, undefined, {role: Types[i][0], roomName: RoomName, subrole: Types[i][5], targetRoomName: TargetRoom});
                            if (DebugMode && Game.creeps[newName]) console.log('SRange '+SpawnRangeResult+' Spawning new '+Types[i][0]+': ' + newName + ' Parts: '+Parts+' Room: '+RoomName);
                            toggle = true;
                        }
                    }
                }
            }
        
        if (DebugMode && Game.time%10===0){ 
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