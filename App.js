import React from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { Constants } from 'expo'

import images from './imgs/images'
import Avatar from './components/Avatar'

const Button = ({ title, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
)

export default class App extends React.Component {
  state = {
    animation: new Animated.Value(0),
    panelOpen: false
  }

  tooglePanel = () => {
    const toValue = this.state.panelOpen ? 0 : 1

    Animated.timing(this.state.animation, {
      toValue,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState(state => ({
        panelOpen: !state.panelOpen
      }))
    })
  }

  render() {
    const panelTransformInterpolation = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [200, 0]
    })
    const panelOpacityInterpolation = this.state.animation.interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: [0, 1, 1]
    })
    const coverOpacityInterpolation = this.state.animation.interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: [0, 0.7, 0.7]
    })
    const textTransformInterpolation = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0]
    })

    const panelAnimatedStyle = {
      transform: [
        {
          translateY: panelTransformInterpolation
        }
      ],
      opacity: panelOpacityInterpolation
    }
    const coverAnimatedStyle = {
      opacity: coverOpacityInterpolation
    }
    const textAnimatedStyle = {
      transform: [
        {
          translateY: panelTransformInterpolation
        }
      ]
    }

    return (
      <View style={styles.container}>
        <View style={{ marginTop: 30 }} />
        <Button title="Tap me!" onPress={this.tooglePanel} />
        <Animated.View
          pointerEvents={this.state.panelOpen ? 'auto' : 'none'}
          style={[
            StyleSheet.absoluteFill,
            styles.containerCover,
            coverAnimatedStyle
          ]}
        />

        <Animated.View style={[styles.panel, panelAnimatedStyle]}>
          <View style={{ marginTop: 30 }} />
          <View style={styles.avatarList}>
            {images.map((image, index) => (
              <View
                key={index}
                style={{ marginRight: index === images.length - 1 ? 0 : 10 }}
              >
                <Avatar
                  index={index}
                  numberOfAvatars={images.length}
                  source={image}
                  animation={this.state.animation}
                />
              </View>
            ))}
          </View>
          <View style={{ marginTop: 30 }} />
          <Animated.Text style={[styles.panelTitle, textAnimatedStyle]}>
            Someone likes your place suggestion!
          </Animated.Text>
          <View style={{ marginTop: 20 }} />
          <Animated.Text style={[styles.panelSubtitle, textAnimatedStyle]}>
            When the most of invitated people accept you place suggestion, we'll
            send you a notification!
          </Animated.Text>
          <View style={{ marginTop: 30 }} />
          <Button title="Ok, thanks!" onPress={this.tooglePanel} />
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  containerCover: {
    backgroundColor: '#d3d3d3'
  },
  button: {
    // elevation: 1 --> if we give elevation to the button it is not covered by the overlay view
    width: '70%',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#ff9999',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  },
  panel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    backgroundColor: '#fff',
    padding: 20,
    elevation: 1
  },
  panelTitle: {
    color: '#595959',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  panelSubtitle: {
    color: '#808080',
    fontSize: 16,
    textAlign: 'center'
  },
  avatarList: {
    flexDirection: 'row'
  }
})
