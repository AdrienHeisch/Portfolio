This is a port of my game NotSpaceWar to the Haxe language, that enables play on multiple platforms.

The only difference is the removal of the stars in the background of the original game : they used too much memory as it would be necessary to force 3D rendering, using the graphic card, from a library like [Starling](https://github.com/openfl/starling "Github") for example.

The goal is to be the last ship on screen. The controls for the first player are : Z to move forward, Q to rotate to the right, D to rotate to the left, T to speed up, and Y to shoot. For the second player, respectively, up arrow, left arrow, right arrow, and on the number pad, 2 to speed up, 3 to shoot. Games are fast-paced, press space to restart when the game is over. Beware, the AI is hard to beat !

+ Personnal project, Avril 2018
+ Space combat game, 2D (top-down view), 1 to 2 players
+ Plateforms : Adobe Flash Player, Web, Android, Windows
+ Technology stack :
    - [Haxe](https://en.wikipedia.org/wiki/Haxe "Wikipedia")
    - [OpenFL](http://www.openfl.org/ "openfl.org")
+ Known issues :
    - The framerate is not capped, so the game will run too fast on a 120Hz screen. This is caused by a misconception from the original project.

![](°project-image°)