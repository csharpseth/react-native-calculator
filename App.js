import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Calculator from './app/views/screens/Calculator';

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen 
					name='Calculator'
					component={Calculator}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
