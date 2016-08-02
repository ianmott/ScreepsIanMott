
var Spawn = {

    run: function(RoomName, DebugMode, TargetRoom) {
        const roomTypes = new Array(3);
        var currentRoomType = '';
        const spawn = Game.rooms[RoomName].find(FIND_MY_SPAWNS)[0];
        var totalCreeps = 0; 
        var maxCreeps = 0;
        const NumofSpawns = 9;
    	var SpawnRange = new Array(NumofSpawns);
    	var RangeID = 0;
    	var PartsA = new Array(NumofSpawns); 
    	const NumofCombatTypes = 3;
    	var PartsC = new Array(NumofSpawns); 
    	const NumofTypes = 11;
    	const numofFields = 6;
    	var TWeights = new Array(NumofTypes);
    	var toggle = false;
        var Types = new Array(NumofTypes);  
        var stringbuilder = ' RC: '+Game.rooms[RoomName].controller.progress+'/'+Game.rooms[RoomName].controller.progressTotal+
                                ' ECap: '+Game.rooms[RoomName].energyCapacityAvailable+' E: '+Game.rooms[RoomName].energyAvailable;
                                
        for(i=0;i<NumofSpawns;i++){
            SpawnRange[i]=299+i*100;
            PartsC[i] = new Array(NumofCombatTypes);
            PartsC[i][0] = 'TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,MOVE';
            PartsC[i][1] = 'TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK';
            PartsC[i][2] = 'CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE';
            
            if(i*1 > 0){
                for (j=0;j<NumofCombatTypes;j++){
                    switch (j){
                        case 0:
                            for (k=0;k<i;k++)
                                PartsC[i][0] = 'ATTACK,'+PartsC[i][j] 
                            break;
                        case 1:
                            for (k=0;k<i;k++)
                                PartsC[i][1] = 'TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,'+PartsC[i][j] 
                            break;
                    }
                }
            }
            
            //for (j=0;j<NumofCombatTypes;j++)PartsC[i][j] = [PartsC[i][j]];
            //console.log(PartsC[i][0]+' '+ PartsC[i][1])
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
        PartsA[8]= [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]; // 1100
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
            Types[TWeights[0]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.memory.roomName === RoomName).length;    // Type Current 
            Types[TWeights[0]][3] = '';  //  Parts    
            Types[TWeights[0]][5] = '';
            
        TWeights[1] = 7; // weight 
        Types[TWeights[1]] = new Array(numofFields); 
            Types[TWeights[1]][0] = 'combat';     // Type Name      
            Types[TWeights[1]][1] = 0;  //   Type Min 
            Types[TWeights[1]][4] = 1049; // Cost
            Types[TWeights[1]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'combat' && creep.memory.subrole === 'guard' && creep.memory.roomName === RoomName).length;        // Type Current
            Types[TWeights[1]][3] = ''; //  Parts    
            Types[TWeights[1]][5] = 'guard';
            
        TWeights[2] = 3;
        Types[TWeights[2]] = new Array(numofFields); 
            Types[TWeights[2]][0] = 'upgrader';    // Type Name    
            Types[TWeights[2]][1] = 7;  //   Type Min 
            Types[TWeights[2]][4] = 849;  // Cost
            Types[TWeights[2]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader' && creep.memory.roomName === RoomName).length;      // Type Current
            Types[TWeights[2]][3] = ''; //  Parts    
            Types[TWeights[2]][5] = '';
            
        TWeights[3] = 5;
        Types[TWeights[3]] = new Array(numofFields); 
            Types[TWeights[3]][0] = 'repairer';     // Type Name   
            Types[TWeights[3]][1] = 2;  //   Type Min 
            Types[TWeights[3]][4] = 949;  // Cost
            Types[TWeights[3]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer' && creep.memory.roomName === RoomName).length;     // Type Current
            Types[TWeights[3]][3] = ''; //  Parts    
            Types[TWeights[3]][5] = '';
            
            
        TWeights[4] = 6;
        Types[TWeights[4]] = new Array(numofFields); 
            Types[TWeights[4]][0] = 'combat';  // Type Name   
            Types[TWeights[4]][1] = 0;  //   Type Min 
            Types[TWeights[4]][4] = 1049; // Cost
            Types[TWeights[4]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'combat' && creep.memory.subrole === 'rangedguard' && creep.memory.roomName === RoomName).length;  // Type Current
            Types[TWeights[4]][3] = ''; //  Parts    
            Types[TWeights[4]][5] = 'rangedguard';
            
        TWeights[5] = 4;
        Types[TWeights[5]] = new Array(numofFields); 
            Types[TWeights[5]][0] = 'tharvester';   // Type Name   
            Types[TWeights[5]][1] = 1;  //   Type Min 
            Types[TWeights[5]][4] = 849;  // Cost
            Types[TWeights[5]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'tharvester' && creep.memory.roomName === RoomName).length;   // Type Current
            Types[TWeights[5]][3] = ''; //  Parts    
            Types[TWeights[5]][5] = '';
            
        TWeights[6] = 8;
        Types[TWeights[6]] = new Array(numofFields); 
            Types[TWeights[6]][0] = 'combat'; // Type Name   
            Types[TWeights[6]][1] = 0;  //   Type Min 
            Types[TWeights[6]][4] = 849;  // Cost
            Types[TWeights[6]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'combat' && creep.memory.subrole === 'atcontroller' && creep.memory.roomName === RoomName).length;  // Type Current
            Types[TWeights[6]][3] = ''; //  Parts    
            Types[TWeights[6]][5] = 'atcontroller';
            
        TWeights[7] = 1;
        Types[TWeights[7]] = new Array(numofFields); 
            Types[TWeights[7]][0] = 'gather';       // Type Name   
            Types[TWeights[7]][1] = 1;  //   Type Min 
            Types[TWeights[7]][4] = 849;  // Cost
            Types[TWeights[7]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'gather' && creep.memory.roomName === RoomName).length;   // Type Current
            Types[TWeights[7]][3] = ''; //  Parts    
            Types[TWeights[7]][5] = '';
            
        TWeights[8] = 2;
        Types[TWeights[8]] = new Array(numofFields); 
            Types[TWeights[8]][0] = 'haul';         // Type Name   
            Types[TWeights[8]][1] = 1;  //   Type Min 
            Types[TWeights[8]][4] = 949;  // Cost
            Types[TWeights[8]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'haul' && creep.memory.roomName === RoomName).length;  // Type Current
            Types[TWeights[8]][3] = ''; //  Parts    
            Types[TWeights[8]][5] = '';
            
        TWeights[9] = 9;
        Types[TWeights[9]] = new Array(numofFields); 
            Types[TWeights[9]][0] = 'rh';         // Type Name   
            Types[TWeights[9]][1] = 0;  //   Type Min 
            Types[TWeights[9]][4] = 1799;  // Cost
            Types[TWeights[9]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'rh' && creep.memory.roomName === RoomName).length;  // Type Current
            Types[TWeights[9]][3] = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]; //  Parts    
            Types[TWeights[9]][5] = 'remote';

        TWeights[10] = 10;
        Types[TWeights[10]] = new Array(numofFields); 
            Types[TWeights[10]][0] = 'rg';         // Type Name   
            Types[TWeights[10]][1] = 0;  //   Type Min 
            Types[TWeights[10]][4] = 1149;  // Cost
            Types[TWeights[10]][2] = _.filter(Game.creeps, (creep) => creep.memory.role === 'rg' && creep.memory.roomName === RoomName).length;  // Type Current
            Types[TWeights[10]][3] = [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK]; //  Parts    
            Types[TWeights[10]][5] = 'remote';
        
        
        if (RoomName === 'W44S38') {
            currentRoomType = roomTypes[0];
        }
        if (RoomName === 'W44S37') {
            currentRoomType = roomTypes[1];
        }
          
        for (i = 0; i< NumofTypes;i++) {
                stringbuilder += ' '+Types[TWeights[i]][0].substring(0,2)+' #'+TWeights[i]+' '+Types[TWeights[i]][2]+'/'+Types[TWeights[i]][1];
                totalCreeps += Types[TWeights[i]][2];
                maxCreeps +=Types[TWeights[i]][1];
                if (currentRoomType === roomTypes[0]) {
                }
                if (currentRoomType === roomTypes[1]) {
                    if (i ===TWeights[0] || i===TWeights[5] || i===TWeights[3] || i===TWeights[2] )
                        Types[i][1] = 1; 
                    else 
                        Types[i][1] = 0;
                }
        }
           
        for (j=0; j < SpawnRange.length;j++) {
            if (SpawnRange[j] < Game.rooms[RoomName].energyCapacityAvailable){
                RangeID = j;
            }
        }
        SpawnRangeResult = SpawnRange[RangeID];
        Parts = PartsA[RangeID];

        //console.log('rid '+RangeID+' srr '+SpawnRangeResult+' p '+Parts);
        
        
        if (Types[TWeights[0]][2] === 0 && totalCreeps < 2 && !spawn.spawning){
                const newName = spawn.createCreep(PartsA[0], undefined, {role: Types[TWeights[0]][0]});
                if (Game.creeps[newName]){ Game.creeps[newName].memory.roomName = RoomName;}
                if (DebugMode) console.log('Recovery Harvester Being Spawned Check Code! Name:' + newName + ' Parts: '+PartsA[0]+' Room: '+RoomName);
            } else {
                if  (!spawn.spawning){
                    for (i=0; i <NumofTypes && !toggle; i++){
                        
                        if (Types[i][0] === 'combat'){
                            var subtypeid = 0;
                            if (Types[i][5] === 'rangedguard')
                                subtypeid = 1;
                            if (Types[i][5] === 'atcontroller')
                                subtypeid = 2;

                            Parts = PartsC[RangeID][subtypeid];
                        }
                        //console.log('rid ' + RangeID+'P '+Parts);

                        if (Types[i][1] > Types[i][2] && !spawn.spawning && Game.rooms[RoomName].energyAvailable > SpawnRangeResult  && Game.rooms[RoomName].energyCapacityAvailable > SpawnRangeResult){         
                            if (Game.rooms[RoomName].energyCapacityAvailable > 649 && SpawnRangeResult > 649 && Types[i][0] === 'gather' ||  Types[i][0] === 'haul' ){
                                if (Types[i][0] === 'gather' ){
                                    Parts = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE];
                                    SpawnRangeResult = 649;
                                }
                                if (Types[i][0] === 'haul' ){
                                    Parts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
                                    SpawnRangeResult = 649;
                                }
                            }
                            var newName = spawn.createCreep(Parts, undefined, {role: Types[i][0]});
                            if (Game.creeps[newName]){ Game.creeps[newName].memory.roomName = RoomName;}
                            if (Game.creeps[newName] && Types[i][5] !== ''){ Game.creeps[newName].memory.subrole = Types[i][5]; Game.creeps[newName].memory.targetRoomName = TargetRoom;}
                            if (DebugMode) console.log('SRange '+SpawnRangeResult+' Spawning new '+Types[i][0]+': ' + newName + ' Parts: '+Parts+' Room: '+RoomName);
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