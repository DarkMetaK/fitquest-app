import React from 'react'
import { Path, Svg } from 'react-native-svg'

export interface IconProps {
  color?: string
}

export function BalanceWeight({ color = '#000' }: IconProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        d="M17.5545 1.8832H15.8041C14.9281 0.739219 13.5488 0 11.9999 0C10.451 0 9.07184 0.739219 8.19579 1.8832H6.44543C3.65651 1.8832 1.38757 4.15214 1.38757 6.94102V17.0922C1.38753 20.9012 4.48639 24 8.29535 24H15.7046C19.5136 24 22.6124 20.9012 22.6124 17.0922V6.94102C22.6124 4.15214 20.3434 1.8832 17.5545 1.8832ZM11.9999 0.956156C14.1137 0.956156 15.8333 2.67581 15.8333 4.7895C15.8333 6.90319 14.1136 8.6228 11.9999 8.6228C9.88624 8.6228 8.16659 6.90314 8.16659 4.78945C8.16659 2.67577 9.88624 0.956156 11.9999 0.956156ZM21.6563 17.0922H21.6562C21.6562 20.374 18.9863 23.0438 15.7046 23.0438H8.29535C5.01359 23.0438 2.34373 20.3739 2.34373 17.0922V6.94102C2.34373 4.67934 4.18376 2.83936 6.44543 2.83936H7.62584C7.35907 3.43538 7.21048 4.09538 7.21048 4.78955C7.21048 7.43048 9.359 9.57909 12 9.57909C14.6411 9.57909 16.7896 7.43058 16.7896 4.78955C16.7896 4.09542 16.641 3.43542 16.3742 2.83936H17.5546C19.8163 2.83936 21.6563 4.67934 21.6563 6.94102V17.0922H21.6563Z"
        fill={color}
      />
      <Path
        d="M11.9999 1.57767C11.7359 1.57767 11.5219 1.79175 11.5219 2.05575V4.78082C11.5219 5.04482 11.7359 5.2589 11.9999 5.2589C12.2639 5.2589 12.478 5.04482 12.478 4.78082V2.05579C12.4781 1.79179 12.264 1.57767 11.9999 1.57767Z"
        fill={color}
      />
      <Path
        d="M3.3944 8.55779C3.1304 8.55779 2.91632 8.77186 2.91632 9.03586V16.0637C2.91632 16.3277 3.1304 16.5418 3.3944 16.5418C3.6584 16.5418 3.87248 16.3277 3.87248 16.0637V9.03586C3.87248 8.77186 3.6584 8.55779 3.3944 8.55779Z"
        fill={color}
      />
      <Path
        d="M3.3944 6.5498C3.1304 6.5498 2.91632 6.76388 2.91632 7.02788V7.50596C2.91632 7.76996 3.1304 7.98404 3.3944 7.98404C3.6584 7.98404 3.87248 7.76996 3.87248 7.50596V7.02788C3.87248 6.76388 3.6584 6.5498 3.3944 6.5498Z"
        fill={color}
      />
    </Svg>
  )
}

export function Muscle({ color = '#000' }) {
  return (
    <Svg width="22" height="24" viewBox="0 0 22 24" fill="none">
      <Path
        d="M21.3877 12.251C21.066 9.99998 19.6902 3.24712 18.3353 2.56945C18.2132 2.50842 18.0255 2.40614 17.7886 2.27742C14.9462 0.732371 12.1394 -0.581301 10.8701 0.266059C9.88607 0.922309 9.04143 2.44959 8.90568 3.8189C8.82689 4.61456 8.9977 5.24737 9.39951 5.64918C10.2802 6.53029 13.2214 6.1649 14.7717 5.89725C14.6678 6.38761 14.4442 7.21996 13.9612 8.42657C13.1863 10.3639 13.6041 13.3967 13.8282 14.6797H12.8214C12.0387 13.0469 10.9594 12.2068 9.61045 11.9384C6.94804 11.4067 4.14529 13.63 3.48792 14.2131H1.79864C1.54078 14.2131 1.33214 14.422 1.33214 14.6796C1.33214 14.9372 1.54078 15.1461 1.79864 15.1461H3.66468C3.78178 15.1461 3.89475 15.0869 3.98085 15.0076C4.00954 14.9809 6.91664 12.3297 9.4305 12.8313C10.5462 13.054 11.446 13.9025 12.1048 15.3302C12.1813 15.4956 12.3467 15.6126 12.5285 15.6126H14.3945C14.5362 15.6126 14.6697 15.5333 14.7585 15.4228C14.8469 15.3126 14.8806 15.1604 14.8501 15.0224C14.841 14.9818 13.9581 10.9355 14.8278 8.76187C15.7667 6.41357 15.7941 5.42587 15.7941 5.32111C15.7941 5.18147 15.7312 5.04792 15.6232 4.95932C15.5157 4.87097 15.3735 4.83496 15.236 4.86229C13.1102 5.28665 10.5262 5.45592 10.0592 4.98961C9.86737 4.79779 9.78539 4.40451 9.83414 3.91068C9.94303 2.81048 10.6255 1.55029 11.3877 1.04231C12.0369 0.609512 14.041 1.30195 17.343 3.09712C17.5922 3.23245 17.7895 3.3397 17.9134 3.40143C18.5517 3.80484 19.9339 8.67319 20.4637 12.383C20.8587 15.1467 20.5671 19.3461 20.4824 20.4169C18.8842 21.2096 8.97623 25.7522 1.11478 20.7862C0.896573 20.6492 0.609089 20.7139 0.471042 20.9315C0.333464 21.1494 0.39862 21.4376 0.616354 21.5752C3.47831 23.3825 6.58584 24 9.4979 23.9998C15.7343 23.9996 21.0701 21.1665 21.148 21.1244C21.2851 21.0499 21.3763 20.9119 21.3904 20.7563C21.4095 20.5449 21.8564 15.533 21.3877 12.251Z"
        fill={color}
      />
    </Svg>
  )
}

export function Heart({ color = '#000' }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.5 9.00002H16.5M16.5 9.00002H14.5M16.5 9.00002V7M16.5 9.00002V11"
        stroke={color}
        strokeLinecap="round"
      />
      <Path
        d="M12 5.57412L11.4522 6.08635C11.594 6.23803 11.7923 6.32412 12 6.32412C12.2077 6.32412 12.406 6.23803 12.5478 6.08635L12 5.57412ZM2.65159 13.6821C2.86595 14.0366 3.32705 14.1501 3.68148 13.9358C4.03591 13.7214 4.14946 13.2603 3.9351 12.9059L2.65159 13.6821ZM6.53733 16.1707C6.24836 15.8739 5.77352 15.8676 5.47676 16.1566C5.18 16.4455 5.17369 16.9204 5.46267 17.2171L6.53733 16.1707ZM2.75 9.3175C2.75 6.41289 4.01766 4.61731 5.58602 4.00319C7.15092 3.39043 9.34039 3.82778 11.4522 6.08635L12.5478 5.06189C10.1598 2.50784 7.34924 1.70187 5.0391 2.60645C2.73242 3.50967 1.25 5.99209 1.25 9.3175H2.75ZM15.5109 19.961C17.0033 18.7499 18.7914 17.1268 20.2127 15.314C21.6196 13.5196 22.75 11.4354 22.75 9.31747H21.25C21.25 10.9289 20.3707 12.6814 19.0323 14.3884C17.7084 16.077 16.0156 17.6197 14.5657 18.7963L15.5109 19.961ZM22.75 9.31747C22.75 5.99208 21.2676 3.50966 18.9609 2.60645C16.6508 1.70187 13.8402 2.50784 11.4522 5.06189L12.5478 6.08635C14.6596 3.82778 16.8491 3.39042 18.414 4.00319C19.9823 4.6173 21.25 6.41287 21.25 9.31747H22.75ZM8.48914 19.961C9.76058 20.9928 10.6423 21.75 12 21.75V20.25C11.2771 20.25 10.8269 19.9263 9.43432 18.7963L8.48914 19.961ZM14.5657 18.7963C13.1731 19.9263 12.7229 20.25 12 20.25V21.75C13.3577 21.75 14.2394 20.9928 15.5109 19.961L14.5657 18.7963ZM3.9351 12.9059C3.18811 11.6708 2.75 10.455 2.75 9.3175H1.25C1.25 10.8297 1.82646 12.3179 2.65159 13.6821L3.9351 12.9059ZM9.43432 18.7963C8.51731 18.0521 7.49893 17.1582 6.53733 16.1707L5.46267 17.2171C6.47548 18.2572 7.53996 19.1908 8.48914 19.961L9.43432 18.7963Z"
        fill={color}
      />
    </Svg>
  )
}

export function Stretching({ color = '#000' }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.5 7C15.8807 7 17 5.88071 17 4.5C17 3.11929 15.8807 2 14.5 2C13.1193 2 12 3.11929 12 4.5C12 5.88071 13.1193 7 14.5 7Z"
        stroke={color}
      />
      <Path
        d="M5 22.0002L8.84856 20.6274C9.30437 20.4648 9.68576 20.1425 9.92204 19.7202M19 22.0002V16.7681C19 15.5356 17.8958 14.5963 16.6792 14.794L15.6667 14.9586M8.5 14.0002L7.88594 13.4015C7.12031 12.655 7.35935 11.37 8.34221 10.9488L10.798 9.89634C11.7878 9.47213 12.8889 10.1982 12.8889 11.2751V13.8955C12.8889 14.2374 12.8012 14.5736 12.6343 14.872L11.9562 16.084"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}