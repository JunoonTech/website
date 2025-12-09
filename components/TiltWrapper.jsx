"use client";
import { Tilt } from 'react-tilt';

const defaultOptions = {
	reverse:        false, 
	max:            15,
	perspective:    1000,
	scale:          1.05,
	speed:          1000,
	transition:     true, 
	axis:           null, 
	reset:          true,
	easing:         "cubic-bezier(.03,.98,.52,.99)",
}

export default function TiltWrapper({ children, className }) {
  return (
    <Tilt options={defaultOptions} className={className}>
      {children}
    </Tilt>
  );
}
