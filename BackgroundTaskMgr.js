


function BackgroundTaskMgr()
{
	const MAX_TRIES = 10;
	if ( typeof DEBUG !== "number" ) DEBUG=0;
	
	this.tasks= [];
	this.state="not started";
	this.addTask = function(task){
		
		this.tasks.push(task);
		if (DEBUG) console.log("A task with function "+task.name +" was added ");
	}
	
	this.start = function(){
		if (this.tries == undefined )
			this.tries=0;
		else
			this.tries++;
		if (this.tries > MAX_TRIES ) 
		{
				if (DEBUG) console.log("Task mgr not started !, after "+this.tries+" tries. ");
				return;
		}	
		if (arguments.length > 0 )
		if(typeof arguments[0] == "function" ) this.startCallback=arguments[0];
		if( document.readyState == "complete" )
			{
				this.state = "started";
				if (DEBUG) console.log("Task mgr started, after "+this.tries+" tries. "+ this.getTime());
				if ( typeof this.startCallback  == "function" ) this.startCallback();
				this.run();
				return;
			}
			var self=this;
			var id = setTimeout((function(){	clearTimeout(id); this.start(); }).bind(this), 2000);
			
		
	}
	
	this.run = function(){
		this.state = "running";
		console.log("Task mgr running .....");
		for(var i=0; i < this.tasks.length; i++ )
		{
			if(this.state == "stopped" ) return;
			
			
			var task = this.tasks[i];
			var self=this;
			var id = setInterval((function(task){
					return (function(){
								if(!task.isPeriodic() ) clearTimeout(task.getId()); 
									task.run(); 
								if (DEBUG) console.log("Task called....@ " + self.getTime());
								self.checkForCompletion();
					});
						})(task),task.getInterval());
			
			task.setId(id);	
			
		}	
		if (DEBUG) console.log("Task mgr run completed ....."+ this.getTime());
		//this.state = "completed";
	}
	
	
	this.stop = function(){
		for(var i=0; i < this.tasks.length; i++ )
			if (this.tasks[i].getStatus() !== 'completed') clearTimeout(this.tasks[i].getId());
			
		
		this.state = "stopped";
		if (DEBUG) console.log("Task mgr stopped.....");
	}
	this.checkForCompletion = function(){
		
		for(var i=0; i < this.tasks.length; i++ )
			if (this.tasks[i].getStatus() !== 'completed') return false;
		
		this.state = "completed";
		if (DEBUG) console.log("Task mgr has completed.....");
		return true;
	}

	//this.start();
	this.getTime = function () {
			  var today = new Date();
			  var h = today.getHours();
			  var m = today.getMinutes();
			  var s = today.getSeconds();
			  // add a zero in front of numbers<10
			  //m = checkTime(m);
			  //s = checkTime(s);
			  var time  = h + ":" + m + ":" + s;
			  return time;
			};

}



function BackgroundTask(callback)
{
	var _periodic=false;
	var nRun=1;
	var _interval=1000;
	
	var _callback=callback;
	var _status = "pending";
	
	if ( callback.hasOwnProperty("name") && ( callback.name.trim() != "") )
		this.name=callback.name;
	else
		this.name="<no name>";
	this.setPeriodic = function(interval)
	{
		_periodic = true;
		_interval = interval;
	}
	this.run = function()
	{
		_status = "running";
		_callback();
		if (!_periodic) _status = "completed";
		
	}
	
	this.setInterval = function(interval)
	{	_interval = interval;  	}
	
	this.isPeriodic = function() { return _periodic; }
	this.getInterval = function() { return _interval;}
	
	this.getStatus = function() { return _status; }
	

	
	this.getId = function() { return this.id; }
	this.setId =  function(id) { this.id =id; }	
}


module.exports = {
    BackgroundTaskMgr: BackgroundTaskMgr,
    BackgroundTask: BackgroundTask
}