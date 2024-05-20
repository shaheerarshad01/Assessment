import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import tr from './data/translation/en.json';
import data from './data/hierarcalTree.json';
import TreeView from './component/tree/TreeView';
import {color} from './styles/color';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TreeView
        title={tr.browse_product}
        data={data}
        subTitle={tr.selected_variants}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: RFPercentage(1),
    backgroundColor: color.white,
  },
});
