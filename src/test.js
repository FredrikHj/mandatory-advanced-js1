let socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000/');
socket.on('connect', function(){});
socket.on('new_message', function(data){
  console.log(data);
});
socket.on('disconnect', function(){});
