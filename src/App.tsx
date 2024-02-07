import {SafeAreaView} from 'react-native';
import {
  RichText,
  useEditorBridge,
  CoreBridge,
  TenTapStartKit,
} from '@10play/tentap-editor';
import React from 'react';
const App = () => {
  const editor = useEditorBridge({
    bridgeExtensions: [CoreBridge, ...TenTapStartKit],
    DEV: true,
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <RichText editor={editor} />
    </SafeAreaView>
  );
};

export default App;
