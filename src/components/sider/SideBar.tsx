import Sider from "antd/es/layout/Sider"
import { FC, MouseEventHandler, ReactNode, useState } from "react"
import styles from './SideBar.module.scss'

interface Props {
  children: ReactNode
}

const OPEN_SLIDER_WIDTH = 200
const CLOSE_SLIDER_WIDTH = 70

export const SideBar: FC<Props> = ({ children }) => {
  const [isSliderOpen, setIsSliderOpen] = useState(false)

  const handleMouseEnter: MouseEventHandler = () => {
    setIsSliderOpen(true)
  }

  const handleMouseLeave: MouseEventHandler = () => {
    setIsSliderOpen(false)
  }
  
  return (
    <Sider
        className={styles.sider}
        theme='light'
        width={
          isSliderOpen ? OPEN_SLIDER_WIDTH : CLOSE_SLIDER_WIDTH
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >{children}</Sider>
  )
}