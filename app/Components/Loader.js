import React from 'react';
import { ActivityIndicator } from 'react-native';

export const Loader = ({animating, ...props}) => (
	animating && (
		<ActivityIndicator animating={animating} {...props} />
	)
);