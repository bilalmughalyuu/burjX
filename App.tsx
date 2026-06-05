import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './src/store';
import { Provider } from 'react-redux';
import KycFlowScreen from './src/screens/KycFlowScreen';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        <KycFlowScreen />
      </Provider>
    </SafeAreaProvider>
  );
}
