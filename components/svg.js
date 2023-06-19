import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default function SvgComponent(props) {
  return (
    <Svg
    width={102.75}
    height={92}
    viewBox="0 0 280 400" // Adjust the viewBox values to maintain the aspect ratio
      // width={50}
      // height={44.77}
      // viewBox="0 0 600 150"
      fill="#000"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#000" d="M0 0H700V700H0z" />
      <Path
        d="M344.346 29.73L188.922 306.04c-3.771 6.703-13.421 6.703-17.192 0L16.306 29.73c-4.54-8.071 3.54-17.384 12.17-14.026l148.276 57.66a9.845 9.845 0 007.148 0l148.276-57.66c8.63-3.357 16.71 5.955 12.17 14.026z"
        fill="#8E049A"
        stroke="#8E049A"
        strokeWidth={29.588}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
