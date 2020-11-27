# Sleep Sessions

This project visualizes sleep session data from Eight Sleep
![](demo.gif)

## Usage
In the normal place:
```bash
yarn install
react-native run-ios
```
This is my first React Native project, so there may be some gotchas running fresh on another computer. I've done a clean clone and test though, so you should be good :)

## TODO

-User select buttons should show selected user

-Rotation and smaller screens not handled well

-Screen does not reset data while fetching new data

-Json is always re-fetched, not cached

-CSS is scattered all over the place, not well managed

-Refactor render method in UserCard so that the data processing is somewhere else

-Tick marks and labels to show timeline duration

-Bridge that sends device model from native to react does not know what type of simulator, you only get an actual device name on a real device

-Process the sequential sleep state blocks into timeseries so it can be line plotted like the other types

-Combine some of the spark lines (temps, biometrics)

-Lazy load the intervals screens

-Design considerations - I kind of cobbled it together while learning all the React gotchas

-Since the tnt data doesn't have much of a range it would probably be better not to use its own spark line for it but use a little dot icon that indicated movement and put it on the combined chart

