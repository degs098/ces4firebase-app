(function() {
    'use strict';

    angular
        .module('firebase-app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$q'];

    function AppCtrl($q) {
        var vm = this;
        vm.rooms = [];
        vm.getRooms = getRooms;
        vm.editRoom = editRoom;
        vm.saveRoom = saveRoom;
        vm.cancelEdit = cancelEdit;
        vm.roomInfo = null;
        vm.isEditingRoom = false;
        
        function getRooms(){
            var deferred = $q.defer();
            firebase.database().ref("rooms").once('value').then(function(data){
                deferred.resolve(data.val());
            })                             
            return deferred.promise;
        }

        function getRoomsSuccess(){
            getRooms().then(function(rooms){
                vm.rooms = rooms;                
            });
        }

        function editRoom(room){
            room.lastCleanup = new Date(room.lastCleanup);
            vm.roomInfo = room;
            vm.isEditingRoom = true;
        }

        function saveRoom(form){
            if(form.$valid){                
                firebase.database().ref('rooms/'+vm.roomInfo.id).set({
                    id: vm.roomInfo.id,
                    name: vm.roomInfo.name,
                    location: vm.roomInfo.location,
                    lastCleanup: vm.roomInfo.lastCleanup.getTime(),
                    capacity: vm.roomInfo.capacity,
                    createdAt: vm.roomInfo.createdAt
                });                
                getRoomsSuccess();
                vm.isEditingRoom = false;
            }            
        }

        function cancelEdit(){
            vm.isEditingRoom = false;
        }
    
        function main(){
            initializeApp();            
            getRoomsSuccess();            
        }
            
        main();
    }
})();