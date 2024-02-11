import React, {useRef} from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import {editorHtml} from './Editor/build/editorHtml';
import {
  RichText,
  useEditorBridge,
  useBridgeState,
  type EditorBridge,
  TenTapStartKit,
} from '@10play/tentap-editor';

import {CounterBridge} from './CounterBridge';

const exampleStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});

const Counter = ({editor}: {editor: EditorBridge}) => {
  const state = useBridgeState(editor);
  return (
    <View>
      <Text>
        {state.wordCount} || {state.characterCount}
      </Text>
    </View>
  );
};

export const Advanced = () => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    customSource: editorHtml,
    initialContent: `<p>This is a basic example of implementing images.</p><img src="https://source.unsplash.com/8xznAGy4HcY/800x400" /><p>s sdfdsf fd dsfd ssdfd dsfdsfdsfdsfd</p>`,
    bridgeExtensions: [...TenTapStartKit, CounterBridge],
  });
  const TapRef = useRef(null);

  return (
    <SafeAreaView style={exampleStyles.fullScreen} ref={TapRef}>
      <View style={exampleStyles.fullScreen}>
        <Counter editor={editor} />
        <RichText editor={editor} />
      </View>
    </SafeAreaView>
  );
};
