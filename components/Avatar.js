import React from 'react'
import { Animated, Image, StyleSheet, Text, View } from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons'

export default class Avatar extends React.Component {
  render() {
    const { animation, numberOfAvatars, index } = this.props

    const rangePerAvatar = 0.8 / numberOfAvatars
    const startRange = 1 - 0.8 + rangePerAvatar * index
    const endRange = startRange + rangePerAvatar

    const avatarScaleInterpolation = animation.interpolate({
      inputRange: [0, startRange, endRange, 1],
      outputRange: [0.01, 0.01, 1, 1]
    })
    const checkScaleInterpolation = animation.interpolate({
      inputRange: [0, startRange + rangePerAvatar / 2, endRange, 1],
      outputRange: [0.01, 0.01, 1, 1]
    })

    const imageAnimatedStyle = {
      transform: [
        {
          scale: avatarScaleInterpolation
        }
      ]
    }
    const checkAnimatedStyle = {
      transform: [
        {
          scale: checkScaleInterpolation
        }
      ]
    }

    return (
      <View>
        <Animated.Image
          style={[styles.avatar, imageAnimatedStyle]}
          source={this.props.source}
          resizeMode="cover"
        />
        <Animated.View style={[styles.check, checkAnimatedStyle]}>
          <Icon name="check" size={15} color="#fff" />
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  check: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007f00'
  }
})
