Un port de mon jeu NotSpaceWar vers le langage Haxe, qui permet de cibler diverses plateformes.

On notera que les étoiles dans le fond du jeu original ont disparu : elles consommaient trop de ressources pour que le jeu reste jouable. Il serait nécessaire de forcer un rendu 3D, utilisant le processeur graphique, à l'aide de la librairie [Starling](https://github.com/openfl/starling "Github") par exemple.

Le but du jeu est d'être le dernier vaisseau à survivre. Les contrôles pour le joueur 1 sont : Z pour avancer, Q pour pivoter à gauche, D pour pivoter à droite, T pour accélérer, Y pour tirer. Pour le joueur 2, respectivement, flèche du haut, flèche de gauche, flèche de droite, et sur le pavé numérique, 2 pour accélérer, 3 pour tirer. Les parties s'enchaînent rapidement, appuyez sur espace pour passer à la suivante. L'IA du jeu est assez difficile à battre mais une fois les contrôles maîtrisés les parties deviennent intéressantes !

+ Projet personnel, Avril 2018
+ Jeu de combat spatial, 2D vue de dessus, 1 - 2 joueurs
+ Plateformes : Adobe Flash Player, Web, Android, Windows
+ Technologies utilisées :
    - [Haxe](https://fr.wikipedia.org/wiki/Haxe "Wikipedia")
    - [OpenFL](http://www.openfl.org/ "openfl.org")
+ Problèmes connus :
    - Le framerate n'est pas limité, le jeu ira donc deux fois plus vite sur un écran 120Hz (dû a une conception trop simpliste datant de la première version du projet) 

![](°project-image°)