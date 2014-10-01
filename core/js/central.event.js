(function(){
central.event ={};
central.event.list = {};
central.event.list.listen = [];
central.event.list.broadcast = [];
var mediator = new Mediator();

central.event.broadcast =  function(channel,_from,_message)
	{
	//console.log('broadcast :'+channel);
	central.event.list.broadcast.push([channel,_from]);
	mediator.publish(channel,{message:_message,from:_from});
	}
	
central.event.broadcastAndWait =  function(channel,_from,_message,_waitChannel)
	{
	if (_waitChannel == undefined) { _waitChannel = ""};
	central.event.list.broadcast.push([channel,_from]);
	mediator.publish(channel,{message:_message,waitChannel:_waitChannel,from:_from});
	}

central.event.stopListen =function(channel)
	{
	mediator.remove(channel);
	}

central.event.listen =  function(channel,callback)
	{
	//console.log('listen :'+channel);
	central.event.list.listen.push(channel);
	mediator.subscribe(channel,callback);
	}

central.event.listenFrom =  function(channel,_from,callback)
	{
	//console.log('listenFrom :'+channel);
	central.event.list.listen.push([channel,_from]);
	var _predicate = function(data){return data.from === _from};
	mediator.subscribe(channel,callback,{predicate:_predicate});
	};

})(central);
