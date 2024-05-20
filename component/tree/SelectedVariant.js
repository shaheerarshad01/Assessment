import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import CText from '../global/CText';
import {color} from '../../styles/color';
import {RFPercentage} from 'react-native-responsive-fontsize';

const SelectedVariant = ({expandedNodes, data, subTitle}) => {
  const mergeData = useCallback(arr => {
    const merged = arr?.reduce((acc, curr) => {
      const key = curr?.charAt(0);
      if (!acc[key]) {
        acc[key] = [curr];
      } else {
        acc[key].push(curr);
      }
      return acc;
    }, {});
    return Object.values(merged);
  }, []);

  const result = useMemo(
    () => mergeData(expandedNodes),
    [expandedNodes, mergeData],
  );

  const findNodeName = useCallback((tree, id) => {
    for (const node of tree) {
      if (node.id === id) {
        return node.name;
      }
      if (node.children) {
        const result = findNodeName(node.children, id);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }, []);

  return (
    result.length > 0 && (
      <>
        <CText marginVertical={RFPercentage(1)} type="h2">
          {subTitle}
        </CText>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={result}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View key={index} style={styles.selectedVariant}>
              <CText color={color.black}>
                {item.map(id => findNodeName(data, id)).join(', ')}
              </CText>
            </View>
          )}
        />
      </>
    )
  );
};

export default React.memo(SelectedVariant);

const styles = StyleSheet.create({
  selectedVariant: {
    backgroundColor: color.gray,
    padding: RFPercentage(1),
    marginRight: RFPercentage(1),
  },
});
