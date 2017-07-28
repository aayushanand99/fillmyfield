import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    Dimensions
} from 'react-native';
import Interactable from 'react-native-interactable'
var that
const width =  Dimensions.get('window').width;
const widthFactor = width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;
export default class App extends Component {

		// constructor(props) {
		//     super(props);
		//     this._deltaX = new Animated.Value(0);
		//     this._deltaY = new Animated.Value(0);
		//     this._face1Scale = new Animated.Value(1);
		//     this._face2Scale = new Animated.Value(1);
		//   }

		constructor(props){
		    super(props);

		    this.state = {
		    	showDraggable   : true,     //Step 1
        		dropZoneValues  : null,
		        pan     : new Animated.ValueXY()   //Step 1
		    };

		    this.panResponder = PanResponder.create({    //Step 2
		        onStartShouldSetPanResponder : () => true,
		        onPanResponderMove           : Animated.event([null,{ //Step 3
										            dx : this.state.pan.x,
										            dy : this.state.pan.y
										        }]),
		        onPanResponderRelease        : (e, gesture) => {  
													         if(this.isDropZone(gesture)){ //Step 1
													                this.setState({
													                    showDraggable : false //Step 3
													                });
													            }
												            else{
													            	let k=gesture.dx>0?((Window.width/2) - CIRCLE_RADIUS):0-((Window.width/2) - CIRCLE_RADIUS)
													            	if(gesture.moveY>Window.height-(2*CIRCLE_RADIUS)){
																	    Animated.spring(            
																            this.state.pan,         //Step 2
																            {toValue:{x:k,y:Window.height-(2*CIRCLE_RADIUS)}}     //Step 3
																        ).start();
													            	}
												            	else{
													            	let y=gesture.dy
															        Animated.spring(            
													            		this.state.pan,         //Step 2
													            		{toValue:{x:k,y:y}}     //Step 3
													        		).start();
															    }
														    }
											    } //Step 4
		    });
		}
		isDropZone(gesture){     //Step 2
		    var dz = this.state.dropZoneValues;
		    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
		}
		renderDraggable(){
		  if(this.state.showDraggable){ 
		    return (
		        <View style={styles.draggableContainer}>
		            <Animated.View 
		                {...this.panResponder.panHandlers}                       
		                style={[this.state.pan.getLayout(), styles.circle]}>     
		                <Text style={styles.text}>Drag me!</Text>
		            </Animated.View>
		        </View>
		    );
			}
		}
		setDropZoneValues(event){      //Step 1
		    this.setState({
		        dropZoneValues : event.nativeEvent.layout
		    });
		}
	    render(){
	    	that=this
	        return (
	            <View style={styles.mainContainer}>
	                <View 
	                 onLayout={this.setDropZoneValues.bind(this)}
	                style={styles.dropZone}>
	                    <Text style={styles.text}>Drop me here!</Text>
	                </View>

	                {this.renderDraggable()}
	            </View>
	        );
	    }
	// render(){
	// 	return(
	// 			 <Interactable.View
 //            snapPoints={[
 //              {x: -140*widthFactor, y: 20*heightFactor}, {x: -140*widthFactor, y: -120*heightFactor}, {x: -140*widthFactor, y:  160*heightFactor}, {x: -140*widthFactor, y: -250*heightFactor}, {x: -140*widthFactor, y: 290*heightFactor},
 //              {x:  140*widthFactor, y: 20*heightFactor}, {x:  140*widthFactor, y:  160*heightFactor}, {x:  140*widthFactor, y: -120*heightFactor}, {x:  140*widthFactor, y: -250*heightFactor}, {x:  140*widthFactor, y: 290*heightFactor}]}
 //            dragWithSpring={{tension: 2000, damping: 0.5}}
 //            gravityPoints={[{x: 0, y: 200*heightFactor, strength: 8000, falloff: 40, damping: 0.5, haptics: true}]}
 //            onStop={(event) => this.onStopInteraction(event, this._face2Scale)}
 //            animatedValueX={this._deltaX}
 //            animatedValueY={this._deltaY}
 //            initialPosition={{x: 140*widthFactor, y: -250*heightFactor}}>
 //            <Animated.View style={[styles.head, {
 //              transform: [{
 //                scale: this._face2Scale
 //              }]
 //            }]}>
 //            </Animated.View>
 //          </Interactable.View>
	// 		)
	// }

	//   onStopInteraction(event, scaleValue) {
 //    const x = event.nativeEvent.x;
 //    const y = event.nativeEvent.y;
 //    if (x > -10 && x < 10 && y < 210*heightFactor && y > 190*heightFactor) {
 //      Animated.timing(scaleValue, {toValue: 0, duration: 300}).start();
 //    }
 //  }
}
let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
const styles = StyleSheet.create({
    mainContainer: {
        flex    : 1,
        backgroundColor:'transparent'
    },
    dropZone    : {
        height         : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        // position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#eff7ff',
//   },
//   head: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     borderWidth: 1,
//     borderColor: '#dddddd',
//     shadowColor: '#000000',
//     shadowOffset: {
//       width: 0,
//       height: 0
//     },
//     shadowRadius: 3,
//     shadowOpacity: 0.8
//   },
//   image: {
//     width: 78,
//     height: 78,
//     borderRadius: 40,
//   },
//   frame: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0
//   },
//   marker: {
//     width: 60,
//     height: 60,
//     margin: 10,
//     position: 'relative'
//   },
// });
