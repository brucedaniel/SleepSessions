/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Moment from 'moment';
import React from 'react';
import Carousel from "pinar";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
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

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width

const data = {
  labels: ["Swim", "Bike", "Run"], // optional
  data: [0.4, 0.6, 0.8]
};

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
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <Carousel>
    <View style={carouselStyle.slide1}>
      <UserCard url={userURLs[0]}></UserCard>
    </View>
    <View style={carouselStyle.slide2}>
      <UserCard url={userURLs[1]}></UserCard>
    </View>
    <View style={carouselStyle.slide3}>
    <UserCard url={userURLs[2]}></UserCard>
    </View>
  </Carousel>


        </ScrollView>
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

  render() {

    // let intervals = '';
    // for(let i=0; i<this.state.intervals.length; i++){
    //   intervals = <Text>
    //   Intervals: {this.state.intervals[i].ts}
    //   </Text>
    // }

    let intervals = this.state.intervals.map((interval) => {
      return (
        <Text>
        { Moment(interval.ts).format('d MMM, HH:MM')}
       </Text>
      )
    });

    return (
      <View style={styles.root}>
        {intervals}
      </View>
    );
  }
}