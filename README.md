Haxe Studio
===========

Haxe Studio aims to be a cross-platform IDE for Haxe. It started with a branch of HIDE (i developed with as3boyan) , then it get too different. Hence, the fork.

Developed on node-webkit, Haxe Studio uses Generated Javascript (from Haxe) as it's main programming language. Supporting javascript functions are used, and untyped are used everywhere in the haxe source code.

Why Fork ?
=======
### tl;dr;
well, it's quite similar with the [Tanenbaum–Torvalds debate](http://en.wikipedia.org/wiki/Tanenbaum%E2%80%93Torvalds_debate) where Haxe Studio is the microkernel and HIDE is the monolithic kernel.

### long explanation
tl;dr; are too short ? read the difference below.

#### Haxe Studio
Haxe Studio are developed by following the popular CMS, Wordpress architecture (similar to microkernel architecture). The Haxe Studio core is included with very specific function/plugin. The developer then, can add new features/function by introducing plugins into the wordpress installation. Plugin may be replaced by introducing a plugin with similar [Hooks/message/event](http://en.wikipedia.org/wiki/Hooking) which returns the same format for other plugin usage. Plugin also may communicate with each other using hooks/message. HaxeJS externs are everywhere, but as generated javascript functions & variables can be accessed through DOM, plugin may access other plugin's function by calling it directly (eg : plugin.misterpah.Editor.create_ui();)

#### HIDE
HIDE are developed by following the architecture of Linux (i think). The core and it's plugin are embedded together for a tight intergration (which is awesome!). In this architecture, the development are easier (relatively?) because the minimal-to-none usage of HaxeJS externs. There are other advantage by using this architecture. Please refer to the HIDE's official Git.

Why make it hard ? HIDE architecture are perfect !
=======
I consider myself as a Web developer (Wordpress,html,css,js,php) developer. Hence, I really love the microkernel architecture. it's just a matter of preference. =D


How to use this ?
=======
Visit [HaxeStudio.com](http://www.haxestudio.com) for the latest stable release. Here the code are in development stage. 


Licence
=======
The core (all of files within this git) are licensed with MIT licence. 
Other external plugin may/may-not be a open source software and licensed respected to the owner's choice.
