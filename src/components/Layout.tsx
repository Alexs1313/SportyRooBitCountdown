import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {gradients} from '../theme';

const Layout = ({
  children,
  bounces = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  bounces?: boolean;
}) => {
  return (
    <LinearGradient
      colors={[...gradients.screen]}
      style={styles.container}>
      <ScrollView
        bounces={bounces}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </LinearGradient>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  flexFill: {
    flex: 1,
  },
});
