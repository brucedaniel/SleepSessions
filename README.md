# Sleep Sessions

This project visualizes sleep session data from Eight Sleep


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
