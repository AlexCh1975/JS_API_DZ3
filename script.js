const photoList = document.querySelector(".photo-list");
const btnHistory = document.querySelector(".history");
const btnClear = document.querySelector(".clear");
let page = 1;
let photos = [];

async function fetchPhotos() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?page=${page}&per_page=6&client_id=IoopFsFp2WYoNzb6K6_veswVbm483IrvtCr_TV99IgM`
    );
    const photos = await response.json();
    return photos;
  } catch (error) {
    console.error("Ошибка при загрузке фотографий:", error);
    return [];
  }
}

async function loadPhotos() {
  page++;
  let photosData = await fetchPhotos();
  photosData.forEach((photoData) => {
    addPhoto(photoData, photoData.id);
    renderPhoto(photoData);
    photos.push(photoData);
  });
}

function renderPhoto(item) {

  photoList.insertAdjacentHTML(
    "beforeend",
    `
        <div id="${item.id}" class="photo">
            <img class="photo-img" src="${item.urls.small}" alt="photo"/>
            <div class="photo-content">
                <h4 class="photo-author">
                     ${item.user.first_name !== null ? item.user.first_name : ``
                     } ${ item.user.last_name !== null ? item.user.last_name : ``}
                </h4>
                <div class="photo-likes">
                    <p class="like-count">${item.likes}</p>
                    <div class="like">
                        <img data-toggle-id="${item.id}" class="like-img" src="./img/like_535139.png" alt="like" />
                    </div>
                </div>
            </div>
        </div>
    `
  );
}

// window.addEventListener("scroll", () => {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//     loadPhotos();
//   }
// });

loadPhotos();

setTimeout(() =>{
    document.querySelectorAll('.like').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const elId = e.target.dataset.toggleId
            let photo = document.getElementById(elId);
            let likes = photo.children[1].children[1].children[0];
            let count = +likes.textContent;
            count++;
            likes.textContent = count;
            let photoEl = photos.filter(photo => photo.id === elId);
            addPhoto(photoEl, photoEl[0].id);
        });
    });
}, 2000);

btnHistory.addEventListener('click', (e) => {
    const photos = getAllPhotos();
    photoList.innerHTML = ``;
    photos.forEach(photo => {
        renderPhoto(photo);
    });
});

btnClear.addEventListener('click', () => {
    removeAllPhotos();
});



