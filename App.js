/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Moment, { max } from 'moment';
import React from 'react';
import Carousel from "pinar";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'


import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

Moment.locale('en');

const userURLs = [ 
  "https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json",
  "https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json",
  "https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json"
]

const carouselStyle = {
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a3c9a8"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#84b59f"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#69a297"
  },
  text: {
    color: "#1f2d3d",
    opacity: 0.7,
    fontSize: 48,
    fontWeight: "bold"
  }
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

let getSchemaFromApiAsync = (url) => {
  return new Promise((resolve, reject) =>  {
    
     fetch(url)
      .then(response => resolve(response.json()))
      .catch(error => {
        console.error(error);
        reject(error);
      });
    })
  }

  

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>

     
      <UserCard url={userURLs[0]} key='Addy'></UserCard>
      </SafeAreaView>

    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

export class UserCard extends React.Component<Props> {
  
  constructor(props: Props) {
    super(props);
    this.addy = this.addy.bind(this);
    this.brit = this.brit.bind(this);
    this.cal = this.cal.bind(this);
    this.state = {
      "intervals": [ // a collection of sleep sessions (or intervals)
        {
          "id": "999999999999", // id of the interval
          "ts": "2017-02-28T05:10:00.000Z", // time the session starts in ISO 8601 format
          "stages": [ // the sleep stages of the session
            {
              "stage": "awake", // each stage can be any of "awake" (in bed, awake), "out" (out of bed), "light" (in light sleep), "deep" (in deep sleep)
              "duration": 1024 // duration of the stage, in seconds
            },
            {
              "stage": "light",
              "duration": 1020
            }
          ],
          "score": 93, // the sleep score of the session (min 0, max 100)
          "timeseries": { // collection of timeseries data
            "tnt": [ // short for "toss and turns"
              ["2017-02-28T06:20:00.000Z", 1], // datapoint of the timeseries, in the format [time, value]
              ["2017-02-28T06:21:00.000Z", 2],
              ["2017-02-28T06:30:00.000Z", 1]
            ],
            "tempRoomC": [ // ambient room temperature, in celsius
              ["2017-02-28T05:00:00.000Z", 19.787400000000005],
            ],
            "tempBedC": [ // bed temperature, celsius
              ["2017-02-28T05:00:00.000Z", 34.151399999999995]
            ],
            "respiratoryRate": [ // measured in "breaths per minute"
              ["2017-02-28T05:00:00.000Z", 16.666666666666668],
            ],
            "heartRate": [ // measured in "beats per minute"
              ["2017-02-28T05:00:00.000Z", 48],
            ],
            "heating": [ // ignore this
              ["2017-02-28T05:10:00.000Z", 18840],
              ["2017-02-28T10:25:00.000Z", 11100]
            ]
          }
        },
        {
          // next interval
        }
      ]
    }

    if ((props.url || 0) <= 0) {
      throw new Error(
        'I NEED A URL'
      );
    } else {
      let main = async () => {
        let json = await getSchemaFromApiAsync(props.url);
        this.setState(json);
        
      };
    
      main();
    }
  }

  addy() {
    let main = async () => {
      let json = await getSchemaFromApiAsync(userURLs[0]);
      console.log(json)
      this.setState(json);
    
      
    };
  
    main();
  }

  brit() {
    let main = async () => {
      let json = await getSchemaFromApiAsync(userURLs[1]);
      console.log(json)
      this.setState(json);
    
      
    };
  
    main();
  }

  cal() {
    let main = async () => {
      let json = await getSchemaFromApiAsync(userURLs[2]);
      console.log(json)
      this.setState(json);
    
      
    };
  
    main();
  }

  render() {

    let intervals = this.state.intervals.map((interval) => {

      var awakeSeconds = 0.0;
      var outSeconds = 0.0;
      var lightSeconds = 0.0;
      var deepSeconds = 0.0;
      
      for (index in interval.stages) {
        let stage = interval.stages[index]
        

        switch(stage.stage) { 
          case 'deep': { 


            deepSeconds += stage.duration 
            
             break; 
          } 
          case 'out': { 
            outSeconds += stage.duration 
             break; 
          } 
          case 'light': { 
            lightSeconds += stage.duration 
             break; 
          }
          case 'awake': { 
            awakeSeconds += stage.duration 
             break; 
          }
       } 
      }

      var respritoryData = [];
      var heartRateData = [];
      var tossAndTurnData = [];
      var roomTempData = [];
      var bedTempData = [];
      var minUnixTime = Number.MAX_SAFE_INTEGER
      var maxUnixTime = Number.MIN_SAFE_INTEGER

      for (var key in interval.timeseries) {
        for (index in interval.timeseries[key]) {
          let tuple = interval.timeseries[key][index]
          let unixTime = Moment(interval.timeseries[key][index][0]).unix() 

          if (unixTime > maxUnixTime) {
            maxUnixTime = unixTime
          }

          if (unixTime < minUnixTime) {
            minUnixTime = unixTime
          }

          let value = interval.timeseries[key][index][1]
          switch(key) { 
            case 'respiratoryRate': { 
              respritoryData = respritoryData.concat({x:unixTime, y:value})
               break; 
            } 
            case 'heartRate': { 
              heartRateData = heartRateData.concat({x:unixTime, y:value})
               break; 
            } 
            case 'tnt': { 
              tossAndTurnData = tossAndTurnData.concat({x:unixTime, y:value})
               break; 
            } 
            case 'tempBedC': { 
              bedTempData = bedTempData.concat({x:unixTime, y:value})
               break; 
            } 
            case 'tempRoomC': { 
              roomTempData = roomTempData.concat({x:unixTime, y:value})
               break; 
            } 
            
         } 
        }
      }
    
      let totalDuration = 0.01 + awakeSeconds + deepSeconds + lightSeconds + outSeconds
      const data = {
        labels: ["Out", "Awake", "Light", "Deep"], // optional
        data: [outSeconds/totalDuration, awakeSeconds/totalDuration, lightSeconds/totalDuration,deepSeconds/totalDuration]
      };

      const cellStyle = StyleSheet.create ({
        item: {
           flexDirection: "column",
           justifyContent: 'space-between',
           alignItems: 'center',
           padding: 0,
           margin: 0,
           borderColor: '#FF0044',
           borderWidth: 0,
           height: Dimensions.get("window").height * 0.8
        }
     })

      return (
        <>
        <View style={cellStyle.item}>
        <Text>
        On { Moment(interval.ts).format('d MMM, HH:MM')} you scored {interval.score}
       </Text>

       <ProgressChart
          data={data}
          width={screenWidth}
          height={200}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
      />

<Text>Respiration Rate</Text>
      <Chart
  style={{ height: 80, width: screenWidth }}
  data={respritoryData}
  padding={{ left: 0, bottom: 0, right: 0, top: 0 }}
  xDomain={{ min: minUnixTime, max: maxUnixTime }}
  yDomain={{ min: 10, max: 20 }}
>
  <VerticalAxis tickCount={0} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
  <HorizontalAxis tickCount={0} />
  <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
</Chart>

<Text>Heart Rate</Text>
<Chart
  style={{ height: 80, width: screenWidth }}
  data={heartRateData}
  padding={{ left: 0, bottom: 0, right: 0, top: 0 }}
  xDomain={{ min: minUnixTime, max: maxUnixTime }}
  yDomain={{ min: 40, max: 90 }}
>
  <VerticalAxis tickCount={0} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
  <HorizontalAxis tickCount={0} />
  <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
</Chart>

<Text>Tossing and Turning</Text>
<Chart
  style={{ height: 80, width: screenWidth }}
  data={tossAndTurnData}
  padding={{ left: 0, bottom: 0, right: 0, top: 0 }}
  xDomain={{ min: minUnixTime, max: maxUnixTime }}
  yDomain={{ min: 0, max: 3 }}
>
  <VerticalAxis tickCount={0} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
  <HorizontalAxis tickCount={0} />
  <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
</Chart>

<Text>Bed Temperature</Text>
<Chart
  style={{ height: 80, width: screenWidth }}
  data={bedTempData}
  padding={{ left: 0, bottom: 0, right: 0, top: 0 }}
  xDomain={{ min: minUnixTime, max: maxUnixTime }}
  yDomain={{ min: 10, max: 60 }}
>
  <VerticalAxis tickCount={0} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
  <HorizontalAxis tickCount={0} />
  <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
</Chart>

<Text>Room Temperature</Text>
<Chart
  style={{ height: 80, width: screenWidth }}
  data={roomTempData}
  padding={{ left: 0, bottom: 0, right: 0, top: 0 }}
  xDomain={{ min: minUnixTime, max: maxUnixTime }}
  yDomain={{ min: 10, max: 60 }}
>
  <VerticalAxis tickCount={0} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
  <HorizontalAxis tickCount={0} />
  <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
</Chart>

</View>
       </>
      )
    });


    return (
      <>
       <View style={{ flexDirection:"row" }}>

<Button
onPress={this.addy}
title="Addy"
width={screenWidth / 3.0} 
color="#841584"
accessibilityLabel="Learn more about this purple button"
/>

<Button
onPress={this.brit}
title="Brit"
width={screenWidth / 3.0} 
color="#841584"
accessibilityLabel="Learn more about this purple button"
/>

<Button
onPress={this.cal}
title="Cal"
width={screenWidth / 3.0} 
color="#841584"
accessibilityLabel="Learn more about this purple button"
/>
</View>
      <ScrollView horizontal= {true}
      decelerationRate={0}
      snapToInterval={screenWidth}
      snapToAlignment={"center"}>
               
        {intervals}
      </ScrollView>
      </>
      
    );
  }
  
}