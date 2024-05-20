import React, {useState, useCallback, useMemo} from 'react';
import {View, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {color} from '../../styles/color';
import CText from '../global/CText';
import SelectedVariant from './SelectedVariant';

const TreeView = ({data, title, subTitle}) => {
  const [expandedNodes, setExpandedNodes] = useState([]);

  const getAllChildNodeIds = useCallback(node => {
    let childNodeIds = [];
    if (node.children) {
      node.children.forEach(child => {
        childNodeIds.push(child.id);
        childNodeIds = [...childNodeIds, ...getAllChildNodeIds(child)];
      });
    }
    return childNodeIds;
  }, []);

  const handleToggleExpand = useCallback(
    node => {
      setExpandedNodes(prevExpandedNodes => {
        if (prevExpandedNodes.includes(node.id)) {
          const nodeAndChildIds = [node.id, ...getAllChildNodeIds(node)];
          return prevExpandedNodes.filter(id => !nodeAndChildIds.includes(id));
        } else {
          return [...prevExpandedNodes, node.id];
        }
      });
    },
    [getAllChildNodeIds],
  );

  const TreeNode = React.memo(({node, expandedNodes, handleToggleExpand}) => {
    const isExpanded = expandedNodes.includes(node.id);

    return (
      <View style={styles.nodeContainer}>
        <TouchableOpacity onPress={() => handleToggleExpand(node)}>
          <View style={styles.nodeHeader}>
            <View style={styles.checkbox}>
              {isExpanded && <AntDesign size={RFPercentage(2)} name="check" />}
            </View>
            <CText type="li" style={styles.nodeText}>
              {node?.name}
            </CText>
          </View>
        </TouchableOpacity>
        {isExpanded && node?.children && renderTree(node?.children)}
      </View>
    );
  });

  const renderTree = useCallback(
    items => {
      return items.map(item => (
        <TreeNode
          key={item.id}
          node={item}
          expandedNodes={expandedNodes}
          handleToggleExpand={handleToggleExpand}
        />
      ));
    },
    [expandedNodes, handleToggleExpand],
  );

  return (
    <View>
      <CText marginVertical={RFPercentage(1)} type="h1">
        {title}
      </CText>
      <ScrollView style={styles.treeContainer}>{renderTree(data)}</ScrollView>
      <SelectedVariant
        expandedNodes={expandedNodes}
        data={data}
        subTitle={subTitle}
      />
    </View>
  );
};

const styles = {
  nodeContainer: {
    marginLeft: RFPercentage(2.5),
    paddingVertical: RFPercentage(1),
  },
  nodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFPercentage(1),
  },
  checkbox: {
    borderWidth: RFPercentage(0.1),
    borderColor: color.black,
    height: RFPercentage(2.5),
    width: RFPercentage(2.5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
  },
  nodeText: {
    marginLeft: 5,
  },
  treeContainer: {
    backgroundColor: color.gray,
    maxHeight: RFPercentage(60),
  },
};

export default TreeView;
