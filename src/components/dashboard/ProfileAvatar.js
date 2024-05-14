import {Avatar} from 'rsuite';
import { getNameInitial } from '../../misc/InitialName';

const ProfileAvatar = ({name , ...avatarProps}) => {
  return (
   <Avatar circle {...avatarProps} >
    {getNameInitial(name)}
   </Avatar>
  )
}

export default ProfileAvatar