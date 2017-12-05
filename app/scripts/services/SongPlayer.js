(function(){
      function SongPlayer(Fixtures){
              var SongPlayer = {};

              /**
             * @desc album playing, playbar next/previous buttons
             * @type {Object}
             */
              var currentAlbum = Fixtures.getAlbum();


              /**
             * @desc Buzz object audio file
             * @type {Object}
             */

              var currentBuzzObject = null;


              /**
             * @function playSong
             * @desc currently playing song
             * @param {Object} song
             */

             var playSong =  function (song){
                  currentBuzzObject.play();
                  song.playing = true;
             }

             /**
            * @desc obtains song index for playbar buttons
            * @type {Object}
            */

            var getSongIndex = function(song){
              return currentAlbum.songs.indexOf(song);
            };

             /**
            * @desc Active song object from list of songs
            * @type {Object}
            */
             SongPlayer.currentSong = null;

              /**
             * @function setSong
             * @desc Stops currently playing song and loads new audio file as currentBuzzObject
             * @param {Object} song
             */

              var setSong =  function(song){
                  if (currentBuzzObject){
                      currentBuzzObject.stop();
                      SongPlayer.currentSong.playing = null;
                  }
                  currentBuzzObject = new buzz.sound(song.audioUrl, {
                          formats: ['mp3'],
                          preload: true
                  });

                  SongPlayer.currentSong = song;
            };

              SongPlayer.play = function(song){
                    song = song || SongPlayer.currentSong;
                    if (SongPlayer.currentSong !== song){

                  setSong(song);
                  playSong(song);

            } else if (SongPlayer.currentSong === song){
                if (currentBuzzObject.isPaused()){
                      playSong(song);
                }
          }
        };
              SongPlayer.pause = function(song){
                      song = song || SongPlayer.currentSong;
                      currentBuzzObject.pause();
                      song.playing = false;
                };

                /**
               * @desc activates previous button on playbar stops at track#1
               * @type {Object}
               */

              SongPlayer.previous =   function(){
                      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                      currentSongIndex--;

                      if(currentSongIndex < 0){
                          currentBuzzObject.stop();
                          SongPlayer.currentSong.playing = null;
                      }else{
                            var song = currentAlbum.songs[currentSongIndex];
                            setSong(song);
                            playSong(song);
                      }
              };

              return SongPlayer;
      }

      angular
            .module('blocJams')
            .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
