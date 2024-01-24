const photosKey = 'photos';

function addPhoto(photo, id){
    const photos = getAllPhotos();
    if (localStorage.getItem(photosKey)){
        if(findPhotoByIdInRepository(id)){
            let index = 0;
            photos.forEach(el => {
                if (el.id === id){
                    photos[index].likes++;
                }
                index++;
            })
            localStorage.setItem(photosKey, JSON.stringify(photos));
        }else{
            photos.push(photo);
            localStorage.setItem(photosKey, JSON.stringify(photos));
        }
    }else{
        localStorage.setItem(photosKey, JSON.stringify([photo]));
    }
}

function getAllPhotos(){
    return JSON.parse(localStorage.getItem(photosKey));
}

function findPhotoByIdInRepository(id){
    const photos = getAllPhotos();
    let result = false;
    for(let i=0; i < photos.length; i++) {
        if (photos[i].id === id) {
            result = true;
            break;
        }
    }
    return result;
}

function removeAllPhotos(){
    localStorage.clear(photosKey);
}


