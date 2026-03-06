/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {RNTesterModuleExample} from '../../types/RNTesterTypes';

import RNTesterText from '../../components/RNTesterText';
import * as React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

function Playground() {
  return (
    <ScrollView style={styles.container}>
      <RNTesterText style={styles.sectionTitle}>
        Nested Text borderRadius
      </RNTesterText>

      <View style={styles.example}>
        <RNTesterText style={styles.label}>
          Basic rounded highlight:
        </RNTesterText>
        <Text style={styles.baseText}>
          This has a{' '}
          <Text style={styles.highlightRounded}>rounded background</Text> on
          inline text.
        </Text>
      </View>

      <View style={styles.example}>
        <RNTesterText style={styles.label}>Different radii:</RNTesterText>
        <Text style={styles.baseText}>
          <Text style={styles.pillSmall}>small radius (4)</Text>
          {'  '}
          <Text style={styles.pillMedium}>medium radius (8)</Text>
          {'  '}
          <Text style={styles.pillLarge}>large radius (16)</Text>
        </Text>
      </View>

      <View style={styles.example}>
        <RNTesterText style={styles.label}>Pill-shaped tags:</RNTesterText>
        <Text style={styles.baseText}>
          Status: <Text style={styles.tagSuccess}>Active</Text>
          {'  '}
          <Text style={styles.tagWarning}>Pending</Text>
          {'  '}
          <Text style={styles.tagError}>Expired</Text>
        </Text>
      </View>

      <View style={styles.example}>
        <RNTesterText style={styles.label}>
          Mixed with other text styles:
        </RNTesterText>
        <Text style={styles.baseText}>
          You can combine{' '}
          <Text style={styles.boldRounded}>bold + rounded</Text> and{' '}
          <Text style={styles.italicRounded}>italic + rounded</Text> styles.
        </Text>
      </View>

      <View style={styles.example}>
        <RNTesterText style={styles.label}>
          Multiline rounded background:
        </RNTesterText>
        <Text style={styles.baseText}>
          <Text>Here is a </Text>
          <Text style={styles.highlightRounded}>
            longer piece of <Text style={styles.nestedInner}>highlighted text that should wrap across multiple
            lines to demonstrate how</Text> border radius works with multiline spans
          </Text>
          <Text> in a paragraph.</Text>
        </Text>
      </View>

      <View style={styles.example}>
        <RNTesterText style={styles.label}>
          Zero radius vs no radius (fallback):
        </RNTesterText>
        <Text style={styles.baseText}>
          <Text style={styles.highlightSharp}>sharp (radius 0)</Text>
          {'  '}
          <Text style={styles.highlightRounded}>rounded (radius 8)</Text>
          {'  '}
          <Text style={styles.highlightLegacy}>no borderRadius set</Text>
        </Text>
      </View>

      <View style={styles.example}>
        <RNTesterText style={styles.label}>
          Large borderRadius (pill effect):
        </RNTesterText>
        <Text style={styles.baseText}>
          <Text style={styles.pillEffect}>borderRadius: 999</Text>
        </Text>
      </View>

      <View style={styles.example}>
        <RNTesterText style={styles.label}>
          Deeply nested with borderRadius:
        </RNTesterText>
        <Text style={styles.baseText}>
          Outer{' '}
          <Text style={styles.highlightRounded}>
            middle{' '}
            <Text style={styles.nestedInner}>inner nested</Text> middle
          </Text>{' '}
          outer.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  example: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  baseText: {
    fontSize: 16,
    lineHeight: 24,
  },
  highlightRounded: {
    backgroundColor: '#FBBF24',
    borderRadius: 8,
    color: '#78350F',
  },
  highlightSharp: {
    backgroundColor: '#FBBF24',
    borderRadius: 0,
    color: '#78350F',
  },
  highlightLegacy: {
    backgroundColor: '#FBBF24',
    color: '#78350F',
  },
  pillSmall: {
    backgroundColor: '#DBEAFE',
    borderRadius: 4,
    color: '#1E40AF',
  },
  pillMedium: {
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    color: '#1E40AF',
  },
  pillLarge: {
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    color: '#1E40AF',
  },
  tagSuccess: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tagWarning: {
    backgroundColor: '#F59E0B',
    borderRadius: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tagError: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  boldRounded: {
    backgroundColor: '#E0E7FF',
    borderRadius: 6,
    color: '#3730A3',
    fontWeight: 'bold',
  },
  italicRounded: {
    backgroundColor: '#FCE7F3',
    borderRadius: 6,
    color: '#9D174D',
    fontStyle: 'italic',
  },
  topLeftOnly: {
    backgroundColor: '#DBEAFE',
    borderTopLeftRadius: 10,
    color: '#1E40AF',
  },
  topRightOnly: {
    backgroundColor: '#D1FAE5',
    borderTopRightRadius: 10,
    color: '#065F46',
  },
  bottomLeftOnly: {
    backgroundColor: '#FCE7F3',
    borderBottomLeftRadius: 10,
    color: '#9D174D',
  },
  bottomRightOnly: {
    backgroundColor: '#FEF3C7',
    borderBottomRightRadius: 10,
    color: '#92400E',
  },
  asymmetricRadii: {
    backgroundColor: '#E0E7FF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 12,
    color: '#3730A3',
  },
  asymmetricRadii2: {
    backgroundColor: '#FEE2E2',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 0,
    color: '#991B1B',
  },
  pillEffect: {
    backgroundColor: '#8B5CF6',
    borderRadius: 999,
    color: 'white',
    fontWeight: 'bold',
  },
  nestedInner: {
    backgroundColor: '#10B981',
    borderRadius: 6,
    color: 'white',
  },
});

export default ({
  title: 'Playground',
  name: 'playground',
  description: 'Test out new features and ideas.',
  render: (): React.Node => <Playground />,
}: RNTesterModuleExample);
