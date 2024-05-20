export const getNameInitial =(name)=>{

const splitName = name.toUpperCase().split(' ');

if(splitName.length >1){
    return splitName[0][0] + splitName[1][0];
}else{
    return splitName[0][0];
}

}


export const transformToArr = (snapVal)=>{
    return snapVal ? Object.keys(snapVal) : []
}


export const transformToArrayWithId=(snap)=>{
    return snap ? Object.keys(snap).map(roomid =>{
        return {...snap[roomid],id:roomid}
    }) : []

}

export const getUserUpdates = async(profileId,keyToUpdate,value,db)=>{

    const updates={};

    updates[`/profile/${profileId}/${keyToUpdate}`] = value;

    const getMsg = db.ref('/messages').orderByChild('author/uid').equalTo(profileId).once('value');

    const getRoom = db.ref('/rooms').orderByChild('lastMessage/author/uid').equalTo(profileId).once("value");

    const [mSnap,rSnap] = await Promise.all([getMsg,getRoom]);

    mSnap.forEach(msgSnap => {
        updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
    });

    rSnap.forEach(roomSnap => {
        updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
    });
    

    return updates;

}