Stay Awake
==========
Chrome app and extension to keep the user awake. The app creates a popup every
5 minutes. If the user does not respond to the popup in 1 minute, a sound is
played.

Usage
-----
Place a sound file in app/misc/sound.mp3 (not included for copyright reasons).
Then load the two directories app/ and extension/ as unpacked extensions in
Chrome. 

Limitations
------------
* Both an app and extension are required for proper functionality. This is
  because apps cannot create buttons in the toolbar (necessary for toggling
  on/off) and extensions cannot take focus from other applications.
* The time between popups is not configurable.
