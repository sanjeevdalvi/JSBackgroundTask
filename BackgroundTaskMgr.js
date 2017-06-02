
const MAX_TRIES = 10;

function BackgroundTaskMgr()
{
	this.tasks= [];
	this.state="not started";
	this.addTask = function(task){
		
		this.tasks.push(task);
		console.log("A task was added ");
	}
	
	this.start = function(){
		if (this.tries == undefined )
			this.tries=0;
		else
			this.tries++;
		if (this.tries > MAX_TRIES ) 
		{
				console.log("Task mgr not started !, after "+this.tries+" tries. ");
				return;
		}	
		if (arguments.length > 0 )
		if(typeof arguments[0] == "function" ) this.startCallback=arguments[0];
		if( document.readyState == "complete" )
			{
				this.state = "started";
				console.log("Task mgr started .., after "+this.tries+" tries. ");
				this.run();
				if ( typeof this.startCallback  == "function" ) this.startCallback();
				return;
			}
			var self=this;
			var id = setTimeout(function(){	clearTimeout(id); self.start(); }, 2000);
			
		
	}
	
	this.run = function(){
		this.state = "running";
		console.log("Task mgr running .....");
		for(var i=0; i < this.tasks.length; i++ )
		{
			if(this.state == "stopped" ) return;
			var task = this.tasks[i];
			var id = setInterval(function(){	
					if(!task.isPeriodic() ) clearTimeout(id); 
						task.callback(); 
					console.log("Task called....");
						},task.getInterval());
			task.setId(id);	
			
		}	
		console.log("Task mgr run completed .....");
	}
	
	
	this.stop = function(){
		this.state = "stopped";
		console.log("Task mgr stopped.....");
	}

	//this.start();
}



function BackgroundTask(callback)
{
	var _periodic=false;
	var nRun=1;
	var _interval=1000;
	
	this.callback=callback;
	
	this.setPeriodic = function(interval)
	{
		_periodic = true;
		_interval = interval;
	}
	
	this.setInterval = function(interval)
	{	_interval = interval;  	}
	
	this.isPeriodic = function() { return _periodic; }
	this.getInterval = function() { return _interval;}
	
	this.getId = function() { return this.id; }
	this.setId =  function(id) { this.id =id; }
	
}
