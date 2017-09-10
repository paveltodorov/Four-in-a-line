                        var reversei = [];
                        var reversej = [];

                       function putPiece()
                       { 
                           if(arr[(cone.position.x + 15)/5].length<6)
                            {
                             var index1 = (cone.position.x + 15)/5;
                             var index2 = arr[(cone.position.x + 15)/5].length;
                             reversei.push(index1);
                             reversej.push(index2);
                             
                             if(player1)
                             { 
                             info[index1][index2] = 1;
                             arr[index1][index2] = new THREE.Mesh(
			     new THREE.BoxGeometry(4,4,4),
			     new THREE.MeshPhongMaterial({color:'blue',shininess: 60, specular: 0xffffff})) 
                             }
                             else
                             {
                             info[index1][index2] = 2; 
                             arr[index1][index2] = new THREE.Mesh(
			     new THREE.SphereGeometry(2),
			     new THREE.MeshPhongMaterial({color:'gold',shininess: 60, specular: 0xffffff}))                             
                             }
                             arr[index1][index2].position.x = cone.position.x;
                             arr[index1][index2].position.y = arr[(cone.position.x + 15)/5].length*5 - 17.5;
                             arr[index1][index2].position.z = 0;
                             scene.add(arr[index1][index2]);
                             switchPlayers()
                             movesCount += 1;
                           }
                       }
                       function clear()
                        {
                        for(var i = 0;i<7;i++)
                         {
                          for(var j = 0;j<6;j++)
                            if(info[i][j] != 0)
                                  {
                                    scene.remove(arr[i][j]);
                                    info[i][j] = 0;
                                  }
                           arr[i] = [];
                          }
                          movesCount = 0;
                          reversei = [];
                          reversej = [];
                          if(wins1) {scene.remove(player1wins);}
                          if(wins2) {scene.remove(player2wins);}
                          if(wins12) {scene.remove(tie);}
                          wins1 = false;
                          wins2 = false;
                          wins12 = false;
                          
                          
                        }
                        function onKeyDown(event)
                        {
                         if(endGame == true )
                         {
                          gamesPlayed++;
                          clear();
                         } 
                         if (event.keyCode == 82) //r 
                         { 
                          reverse();
                         }
                         if (cone.position.x >-15 && (event.code=='ArrowLeft'  || event.keyCode==37) ) 
                         { 
                          cone.position.x -= 5
                         }
		         if ( cone.position.x <15 && (event.code=='ArrowRight' || event.keyCode==39)) 
                         {cone.position.x += 5}
                         
                         if (event.keyCode==100) 
                         {scene.rotation.y -= 0.05} //left
                          
                         if (event.keyCode==102)    //right
                         {scene.rotation.y += 0.05}

                         if (event.keyCode==104)  //up
                         {scene.rotation.x += 0.05}
                         if (event.keyCode==98)  //down 
                         {scene.rotation.x -= 0.05}
                         if (event.keyCode==107)  //+
                         {scene.position.z += 1}
                         if (event.keyCode==109)  //- 
                          {scene.position.z -= 1}
                         if (event.keyCode == 80) 
                         { 
                          switchPlayers(); 
                         }
                         
                          if (event.keyCode == 13 || event.code == 'Enter' || event.code == 'Space' )
                         {
                            
                              putPiece();
                              endGame = checkWin() ;
                              if(movesCount >= 7*6 ) 
                                {endGame = true;
                                 scene.add(tie);
                                 wins12 = true;
                                 player1points++;
                                 player2points++;
                                 document.getElementById('player1points').innerHTML = player1points;
                                 document.getElementById('player2points').innerHTML = player2points;
                                }  
                         }
                         
                          
                        }
                         
                        function displayEndGame(number)
                        {
                          if(number == 1)
                          {
                           wins1 = true;
                           player1points++;
                           scene.add( player1wins );
                          } 
                           else
                          {
                           wins2 = true;
                           player2points++;
                           scene.add( player2wins );
                          }
                          document.getElementById('player1points').innerHTML = player1points;
                          document.getElementById('player2points').innerHTML = player2points;
                        }
                        function checkWin()
                        {
                           var flag = false;
                           for(var i = 0;i<4;i++)
                           {
                           for(var j = 0;j<7;j++)
                           {
                           
                            if(info[j][i] != 0 && info[j][i] == info[j][i + 1] && 
                            info[j][i + 1] == info[j][i + 2] && info[j][i + 2] == info[j][i + 3]) 
                            {
                             arr[j][i    ].material.color.setRGB(0,1,0)
                             arr[j][i + 1].material.color.setRGB(0,1,0)
                             arr[j][i + 2].material.color.setRGB(0,1,0)
                             arr[j][i + 3].material.color.setRGB(0,1,0)
                             displayEndGame(info[j][i]); 
                             return true;
                            }
                                        
                            if( info[i][j] != 0  && info[i][j] == info[i + 1][j] && 
                                 info[i + 1][j] == info[i + 2][j] && info[i + 2][j] == info[i + 3][j]) 
                            {
                             arr[i    ][j].material.color.setRGB(0,1,0)
                             arr[i + 1][j].material.color.setRGB(0,1,0)
                             arr[i + 2][j].material.color.setRGB(0,1,0)
                             arr[i + 3][j].material.color.setRGB(0,1,0)
                             displayEndGame(info[i][j]);
                             return true
                            }

                            if( info[j][i] != 0  && info[j][i] == info[j + 1][i + 1] && 
                                 info[j][i] == info[j + 2][i + 2] && info[j][i] == info[j + 3][i + 3]) 
                            {
                             arr[j    ][i    ].material.color.setRGB(0,1,0)
                             arr[j + 1][i + 1].material.color.setRGB(0,1,0)
                             arr[j + 2][i + 2].material.color.setRGB(0,1,0)
                             arr[j + 3][i + 3].material.color.setRGB(0,1,0)
                             displayEndGame(info[j][i]);
                             return true;
                            }
                            
                            if( j>=3 && info[j][i] != 0  && info[j][i] == info[j - 1][i + 1] && 
                                 info[j][i] == info[j - 2][i + 2] && info[j][i] == info[j - 3][i + 3]) 
                            {
                             arr[j    ][i    ].material.color.setRGB(0,1,0)
                             arr[j - 1][i + 1].material.color.setRGB(0,1,0)
                             arr[j - 2][i + 2].material.color.setRGB(0,1,0)
                             arr[j - 3][i + 3].material.color.setRGB(0,1,0)
                             displayEndGame(info[j][i]);
                             return true;}                   
                            
                           }
                            
                           }
                         return false
                        }
                        
                        function switchPlayers()
                        {
                         player1 = !player1;
                         arrow.position.x *= (-1);
                         arrow.rotation.z += Math.PI;
                         //pl.material.color.setRGB(1,1,1);
                        }
                        function reverse()
                        {
                         if(movesCount>0)
                         {
                          movesCount--;
                          var index1 = reversei.pop();
                          var index2 = reversej.pop(); 
                          info[index1][index2] = 0;
                          scene.remove(arr[index1][index2]);
                          arr[index1].pop();
                          switchPlayers();
                         }
                        }
                         