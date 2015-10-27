angular.module('storyService',[])

.factory('Story',function($http){

	var storyFactory ={};

	storyFactory.allStories= function(storyData){

		return $http.get('/api/all_stories');
	}

	storyFactory.create= function(storyData){

		return $http.post('/api',storyData);
	}

	storyFactory.allStory =function(){

		return $http.get('/api');
	}

	return storyFactory

})

.factory('socketio',function($rootScope){

	var socket = io.connect();
	return{
		on:function(eventname,callback){
			socket.on(eventname,function(){

				var args= arguments;
				$rootScope.$apply(function(){
					callback.apply(socket,args);
				});
			});

		},
		emit:function(eventname,data,callback){
			socket.on(eventname,data,function(){

				var args= arguments;
				$rootScope.$apply(function(){
					if(callback){
					callback.apply(socket,args);
				    }
				});
			});

		}

	};
});