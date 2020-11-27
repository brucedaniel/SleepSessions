import Moment, { max } from 'moment';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Button, StatusBar, } from 'react-native';

import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";

import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';

import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'

import { Dimensions } from "react-native";

const userURLs = [ 
    "https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json",
    "https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json",
    "https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json"
  ]


export default class UserCard extends React.Component<Props> {
  
    constructor(props: Props) {
      super(props);
      this.addy = this.addy.bind(this);
      this.brit = this.brit.bind(this);
      this.cal = this.cal.bind(this);
      this.state = { "intervals": [ ] }
  
       this.addy()
    }
  
    addy() {
      let main = async () => {
        let json = await getSchemaFromApiAsync(userURLs[0]);
        this.setState(json);
      };
      main();
    }
  
    brit() {
      let main = async () => {
        let json = await getSchemaFromApiAsync(userURLs[1]);
        this.setState(json);
      };
      main();
    }
  
    cal() {
      let main = async () => {
        let json = await getSchemaFromApiAsync(userURLs[2]);
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
          labels: ["Out", "Awake", "Light Sleep", "Deep Sleep"],
          data: [outSeconds/totalDuration, awakeSeconds/totalDuration, lightSeconds/totalDuration,deepSeconds/totalDuration]
        };
  
        return (
          <>
          <View style={cellStyle.item}>

          <View style={{ flexDirection:"row",width:screenWidth }}>
          <Text style={{width:"50%", fontSize:25, textAlign:"left" }}>
          { Moment(interval.ts).format('MMM DD, HH:MM')}
         </Text>

         <Text style={{width:"50%", fontSize:25, textAlign:"right" }}>
           Sleep Score: {interval.score} 
         </Text>
          </View>
  
         <ProgressChart
            data={data}
            width={screenWidth}
            height={200}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
          />
  
          <Text style={{width:"100%", fontSize:15, textAlign:"left" }}> Respiration Rate</Text>
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
  
          <Text style={{width:"100%", fontSize:15, textAlign:"left" }}> Heart Rate</Text>
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
  
          <Text style={{width:"100%", fontSize:15, textAlign:"left" }}> Tossing and Turning</Text>
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
  
          <Text style={{width:"100%", fontSize:15, textAlign:"left" }}> Bed Temperature</Text>
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
  
          <Text style={{width:"100%", fontSize:15, textAlign:"left" }}> Room Temperature</Text>
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
      )});
  
  
      return (
        <>
         <View style={{ flexDirection:"row" }}>

          <View style={[{ width: screenWidth/3.0, margin: 0, backgroundColor: "grey" }]}>
            <Button onPress={this.addy} title="Addy" color="#FFFFFF" />
          </View>
  
          <View style={[{ width: screenWidth/3.0, margin: 0, backgroundColor: "grey" }]}>
            <Button onPress={this.brit} title="Brit" width={screenWidth / 3.0} color="#FFFFFF" />
          </View>

          <View style={[{ width: screenWidth/3.0, margin: 0, backgroundColor: "grey" }]}>
            <Button onPress={this.cal} title="Cal" width={screenWidth / 3.0} color="#FFFFFF" />
          </View>

        </View>
        <ScrollView horizontal= {true} decelerationRate={0} snapToInterval={screenWidth} snapToAlignment={"center"}>      
          {intervals}
        </ScrollView>
        </>
        
      );
    }
  }


const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
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

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
Moment.locale('en');