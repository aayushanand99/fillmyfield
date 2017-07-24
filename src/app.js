import React, { Component } from 'react';
import { StyleSheet, View,Animated } from 'react-native';
import Interactable from 'react-native-interactable'

export default class App extends Component {
	constructor(props){
		super(props);
		this._deltaX = new Animated.Value(0);
		this._deltaY = new Animated.Value(0);
	}
	render(){
// 		    return (
//       <View style={styles.container}>
//         <Interactable.View
//           snapPoints={[
//             {x: -140, y: -250},
//             {x: 140, y: -250},
//             {x: -140, y: -120},
//             {x: 140, y: -120},
//             {x: -140, y: 0},
//             {x: 140, y: 0},
//             {x: -140, y: 120},
//             {x: 140, y: 120},
//             {x: -140, y: 250},
//             {x: 140, y: 250, tension: 50, damping: 0.9}
//           ]}
//           initialPosition={{x: -140, y: -250}}>
//           <View style={{width: 70, height: 70, backgroundColor: 'red', borderRadius: 35}} />
//         </Interactable.View>
//       </View>
//     );
		return(
				<Interactable.View
				  snapPoints={[{x: 140}, {x: -140}]}
				  gravityPoints={[{x: 0, y: 200, strength: 8000, falloff: 40, damping: 0.5, haptics: true}]}
				  dragWithSpring={{tension: 2000, damping: 0.5}}
				  onStop={this.onStopInteraction}
				  animatedValueX={this._deltaX}
				  animatedValueY={this._deltaY}
				>
					<View style={{width: 70, height: 70, backgroundColor: 'red', borderRadius: 35}} />
				</Interactable.View>
			)
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});