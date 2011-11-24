﻿// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.Rex_Hash = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.Rex_Hash.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};
	
	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function()
	{
		this._my_hash = null;
        this._current_entry = null;
        this.CleanAll();  
	};
    
	instanceProto.CleanAll = function()
	{
		this._my_hash = {};
        this._current_entry = this._my_hash;
	};    
        
	instanceProto._set_entry_byKeys = function(keys)
	{
        var key_len = keys.length;
        var i, key;
        var _entry = this._my_hash;
        for (i=0; i< key_len; i++)
        {
            key = keys[i];
            if (_entry[key] == null)
            {
                _entry[key] = {};
            }
            _entry = _entry[key];            
        }
        
        this._current_entry = _entry;
	};
	
	//////////////////////////////////////
	// Conditions
	pluginProto.cnds = {};
	var cnds = pluginProto.cnds;

	//////////////////////////////////////
	// Actions
	pluginProto.acts = {};
	var acts = pluginProto.acts;
    
	acts.SetByKeyString = function (key_string, val)
	{        
        if (key_string != "")
        {
		    var keys = key_string.split(".");             
            var last_key = keys.splice(keys.length-1, 1);      
            this._set_entry_byKeys(keys);
            this._current_entry[last_key] = val;
        }
	};

	acts.SetCurHashEntey = function (key_string, val)
	{        
        if (key_string != "")
        {
            var keys = key_string.split(".");      
		    this._set_entry_byKeys(keys);
        }
	};

	acts.SetValueInCurHashEntey = function (key_name, val)
	{        
        if (key_name != "")
        {
            this._current_entry[key_name] = val;
        }        
	};    

	acts.CleanAll = function ()
	{        
        this.CleanAll();      
	};        

	//////////////////////////////////////
	// Expressions
	pluginProto.exps = {};
	var exps = pluginProto.exps;
    
	exps.Hash = function (ret, key_string)
	{     
        var val;    
        var keys = key_string.split(".");             
        var last_key = keys.splice(keys.length-1, 1);      
        this._set_entry_byKeys(keys);
        val = this._current_entry[last_key];
		ret.set_any(val);
	};
    
	exps.Entry = function (ret, key_name)
	{       
		ret.set_any(this._current_entry[key_name]);
	};
}());