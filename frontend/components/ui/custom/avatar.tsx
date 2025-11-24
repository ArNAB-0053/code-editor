import { BaseCAvatar } from '../_Base'
import { IBaseCAvatarProps } from '@/@types/_base'

const CAvatar = ({name = "Guest", theme}: IBaseCAvatarProps) => {
  return (
    <BaseCAvatar name={name} theme={theme} />
  )
}

export default CAvatar