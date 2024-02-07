import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {
  RichText,
  useEditorBridge,
  CoreBridge,
  LinkBridge,
  PlaceholderBridge,
  Toolbar,
  ColorKeyboard,
  CustomKeyboard,
  TenTapStartKit,
} from '@10play/tentap-editor';
import React, {useRef} from 'react';

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

const customFont = `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
* {
  font-family: 'Roboto', sans-serif;
}
`;

const initialContent = `<p>This is a basic <a href="https://google.com">example</a> of implementing images.</p><img src="https://source.unsplash.com/8xznAGy4HcY/800x400" /><p>s</p>`;

const App = () => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent,
    bridgeExtensions: [
      // Here we define all the bridgeExtensions that we want to use
      CoreBridge.configureCSS(customFont), // If we want to add custom css - we can configure it here on the core bridge
      PlaceholderBridge.configureExtension({
        placeholder: 'Type something...',
      }),
      LinkBridge.configureExtension({openOnClick: false}),
      ...TenTapStartKit,
    ],
  });

  const rootRef = useRef(null);
  const [activeKeyboard, setActiveKeyboard] = React.useState<string>();

  return (
    <SafeAreaView style={exampleStyles.fullScreen} ref={rootRef}>
      <View style={exampleStyles.fullScreen}>
        <RichText editor={editor} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={exampleStyles.keyboardAvoidingView}>
        <Toolbar
          activeKeyboard={activeKeyboard}
          setActiveKeyboard={setActiveKeyboard}
          editor={editor}
        />
        <CustomKeyboard
          rootRef={rootRef}
          activeKeyboardID={activeKeyboard}
          setActiveKeyboardID={setActiveKeyboard}
          keyboards={[ColorKeyboard]}
          editor={editor}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;
