export const getNameInitial =(name)=>{

const splitName = name.toUpperCase().split(' ');

if(splitName.length >1){
    return splitName[0][0] + splitName[1][0];
}else{
    return splitName[0][0];
}

}

export const transformToArrayWithId=(snap)=>{
    return snap ? Object.keys(snap).map(roomid =>{
        return {...snap[roomid],id:roomid}
    }) : []

}