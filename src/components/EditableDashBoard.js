import { useCallback, useState } from 'react';
import {InputGroup,Input,Icon,Alert} from 'rsuite';


const EditableDashBoard = ({initialValue , 
    onSave, 
    label = null , 
    plsceholder = "Write Your Value", 
    emtyMsg ="Empty Message"},
    ...inputProps
) => {

const [input ,setInput] = useState(initialValue);
const [isEditable ,setIsEditable ] = useState(false);


    const onInputChange =useCallback(value =>{
        setInput(value);
    },[])

const onEditClick = useCallback(()=>{

    setIsEditable(p => !p);
    setInput(initialValue);
},[initialValue])

const onSaveData = async()=>{
    const trimmed = input.trim();
     
    if(trimmed ===''){
        Alert.info(emtyMsg);
    }

    if(trimmed){
      await  onSave(trimmed);
    }
    
}


  return (
    <div>
        {label}
        <InputGroup >
        <Input
        {...inputProps}
        plsceholder={plsceholder}
        disabled={!isEditable}
        value={input}
         onChange={onInputChange}/>

<InputGroup.Button onClick={onEditClick}>
    <Icon  icon={isEditable ? 'close' : 'edit2'}/>
 </InputGroup.Button>

       {isEditable &&(
        <InputGroup.Button onClick={onSaveData}>
        <Icon icon='check'/>
        </InputGroup.Button>
       )}
        </InputGroup>
 
    </div>
  )
}

export default EditableDashBoard