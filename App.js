/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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


const App: () => React$Node = () => {
  let getSchemaFromApiAsync = () => {
    return new Promise((resolve, reject) =>  {
      //https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json 
      //https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json 
      //https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json
       fetch('https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json')
        .then(response => resolve(response.json()))
        .catch(error => {
          console.error(error);
          reject(error);
        });
      })
    }
  
    let main = async () => {
      let res = await getSchemaFromApiAsync();
      console.log("res", res);
    };
  
    main();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          
          <View style={styles.body}>
          <ProgressChart
            data={data}
            width={screenWidth}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
/>
          </View>
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
