{
DEBUG = 1;	
var taskMgr = new BackgroundTaskMgr();
var task = new BackgroundTask(task1);	
task.setInterval(300);
//task.setPeriodic(3000);
taskMgr.addTask(task);


describe('BackgroundTaskMgr invoke ', function(){

	  it('should be initialized and status should be `not started` ', function() {	  
		  expect(taskMgr.state).to.be.a('string');
		  expect(taskMgr.state).to.equal('not started');
		 });
	 	
});

describe('BackgroundTaskMgr start/run ', function(){

	  before(function() {taskMgr.start(); });
	  it('TaskMgr status should be `running` while all task(s) are being run', function(done) {	  
		  expect(taskMgr.state).to.be.a('string');
		  expect(taskMgr.state).to.equal('running');
		  done();
		 });
		this.timeout(400);

	  it('task status should be `completed` after execution', function(done) {
			setTimeout( function(){
			  expect(taskMgr.state).to.be.a('string');
			  expect(task.getStatus()).to.equal('completed');			  
			  done()},300);
		});
	it('TaskMgr status should be `completed` after all tasks are complete ', function(done) {
			
			  expect(taskMgr.state).to.be.a('string');
			expect(taskMgr.state).to.equal('completed');		  
			done();
		});		
	 	
});


}

describe('BackgroundTaskMgr forcing stop  ', function(){

	  before(function() { taskMgr = new BackgroundTaskMgr();
							var task = new BackgroundTask(task2);	
							task.setInterval(1000); //task.setPeriodic(1000);
							taskMgr.addTask(task);
		  taskMgr.start(task2StartCallback); taskMgr.stop()  });
		  this.timeout(1000);
	  it('status should be `stopped` when forced to stop using stop()', function(done) {	  
		  expect(taskMgr.state).to.be.a('string');
		  expect(taskMgr.state).to.equal('stopped');
		  done();
		 });
	 	
});

describe('BackgroundTaskMgr - handle periodic ( continueous running ) tasks ', function(){

	  before(function() { taskMgr = new BackgroundTaskMgr();
							var task = new BackgroundTask(task2);	
							task.setInterval(3000); task.setPeriodic(1000);
							taskMgr.addTask(task);
		  taskMgr.start();   });
			this.timeout(1000);
	  it('status should be `running` when a task is set as periodic', function() {	  
		  expect(taskMgr.state).to.be.a('string');
		  expect(taskMgr.state).to.equal('running');
		  //done();
		 
		 });
		 
	 it('status should be `stopped` when forced to stop using stop()', function(done) {	
				taskMgr.stop();
			  expect(taskMgr.state).to.be.a('string');
			  expect(taskMgr.state).to.equal('stopped');
			  done();
			 }); 	
});



function task1()
{
	describe('Task module ', function(){
		it('task should be correctly run', function(done) {	  
			expect(task.getId()).to.be.a('number');
			done();
			});
	});
}
function task2()
{
	console.log("Task 2 was executed.");
}	
function task2StartCallback()
{
	console.log("Task 2 was started.");
}	