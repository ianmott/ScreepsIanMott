/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roles');
 * mod.thing == 'a thing'; // true
 */
const roleHarvester = require('role.harvester');
const roletHarvester = require('role.tharvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const rolerepairer = require('role.repairer');
const roleguard = require('role.guard');
const rolerangedguard = require('role.rangedguard');
const roleatcontroller = require('role.atcontroller');
const rolegather = require('role.gather');
const rolehaul = require('role.haul');
const rolecombat = require('role.combat');

require('./ext_StructureTower');
const controller_tower = require('./controller_tower');

module.exports.run = function() {
    
    controller_tower.run();
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') { roleHarvester.run(creep); }
        if (creep.memory.role == 'tharvester') { roletHarvester.run(creep); }
        if (creep.memory.role == 'upgrader') { roleUpgrader.run(creep); }
        if (creep.memory.role == 'builder') { roleBuilder.run(creep); }
        if (creep.memory.role == 'repairer') { rolerepairer.run(creep); }
        if (creep.memory.role == 'gather') { rolegather.run(creep);}
        if (creep.memory.role == 'haul') { rolehaul.run(creep);}
        
        if (creep.memory.role == 'combat') { rolecombat.run(creep);}
        
        //if (creep.memory.role == 'guard') { roleguard.run(creep); }
        //if (creep.memory.role == 'rangedguard') { rolerangedguard.run(creep);}
        //if (creep.memory.role == 'atcontroller') { roleatcontroller.run(creep);}
        
    }
};