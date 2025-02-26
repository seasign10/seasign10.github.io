import config from "./config.js";
import data from "./data.js";
const NAVER_API_CLIENT_ID = config.NAVER_API_CLIENT_ID;

const {fabrics} = data;
// console.log(fabrics);

document.addEventListener('DOMContentLoaded', async function(){
  // 네이버 지도 API 로드
  const script = document.createElement('script');
  script.src =
    `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_API_CLIENT_ID}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = ()=>{
    let HOME_PATH = window.HOME_PATH || '.';
    let position = new naver.maps.LatLng(35.86916758841046, 128.5799609450745);
    let map = new naver.maps.Map('map', {
      center: position,
      zoom: 18,
      minZoom: 16, // 줌을 disable 하기 위함
      maxZoom: 19, 
      disableDoubleTapZoom: true,
      disableDoubleClickZoom: true,
      disableTwoFingerTapZoom: true,
      zoomControl: true,
      draggable: false,
      scrollWheel: false,
      pinchZoom: false // 핀치 줌 비활성화
    });
    let marker = new naver.maps.Marker({
      position: position,
      map: map,
      icon: {
          url: HOME_PATH +'/src/marker.png', //50, 68 크기의 원본 이미지
          size: new naver.maps.Size(25, 34),
          scaledSize: new naver.maps.Size(25, 34),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(12, 34)
      }
    });
  }});

// tap
const tap = document.querySelectorAll('.tap li');
const tapContent = document.querySelectorAll('.posi_box .content');
const tapBtn = ()=>{
  for(let i=0; i<tap.length; i++){
    tap[i].addEventListener('click', ()=>{
      for(let j = 0; j < tap.length; j++){
        tap[j].classList.remove('on');
        tapContent[j].classList.remove('on');
      }
      tap[i].classList.add('on');
      tapContent[i].classList.add('on');
  })}
}
tapBtn();

// modal
const modalBackground = document.querySelector('.modal_background');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal_text');
const modalImg = document.querySelector('.modal img');
const modalBtn = document.querySelector('.modal button');
// winodw로 전역 함수로 선언해야 html에서 사용 가능
window.imgModal = (item) => {
  const srcMsg = item.split(', ');
  if(srcMsg.length === 2){
    modalImg.src = srcMsg[0];
    modalText.innerHTML = srcMsg[1];
    modalText.style.display = 'block';
  }else{
    modalImg.src = item;
    modalText.style.display = 'none';
  }
  modalBackground.style.display = 'flex';
}

modalBtn.addEventListener('click', () => {
  modalBackground.style.display = 'none';
});

modalBackground.addEventListener('click', (event) => {
  if (event.target === modalBackground) {
    modalBackground.style.display = 'none';
  }
});


const fabItems = document.querySelector('ul.fabrics');
const cloItems = document.querySelector('ul.cloths');
let gwangmokList = ''; 
let mumyeongList = '';
let ingyeonList = '';
let jagadeuList = '';
let myeonsilkeuList = '';
let seullabeuList = '';
let ectList = '';

let fabricList = '';
document.addEventListener('DOMContentLoaded', async()=>{
  await products();
});
const products = async()=>{
  for(let i = 0; i < fabrics.length; i++){
    for(let k = 0; k < fabrics[i].cloths.length; k++){
      const item = fabrics[i].cloths[k];
      let listHTML = `
      <li class="card fabrics">
        <img src="${item.src}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.species}</p>
          <div>
          `
      if(item.msg){
        listHTML += `<a class="btn btn-dark" onclick="imgModal('${item.src}, ${ item.msg}')">상세 사진</a>`
      }else{
        listHTML += `<a class="btn btn-dark" onclick="imgModal('${item.src}')">상세 사진</a>`
      }
      listHTML += `
          </div>
        </div>
        <div class="card-footer">
          <span>크기 </span>
          <p>${item.size}</p>
        </div>
      </li>
      `;
  
      switch(fabrics[i].name){
        case '광목':
          gwangmokList += listHTML;
          break;
        case '무명':
          mumyeongList += listHTML;
          break;
        case '인견':
          ingyeonList += listHTML;
          break;
        case '자가드':
          jagadeuList += listHTML;
          break;
        case '면실크':
          myeonsilkeuList += listHTML;
          break;
        case '슬라브':
          seullabeuList += listHTML;
          break;
        case '기타':
          ectList += listHTML;
          break;
      }
    }
  
    if (fabrics[i].fabric && fabrics[i].fabric.length > 0) {
      for(let k = 0; k < fabrics[i].fabric.length; k++){
        const item = fabrics[i].fabric[k];
        fabricList += `
        <li class="card fabrics">
          <img src="${item.src}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.species}</p>
            <div>
              <a class="btn btn-dark" onclick="imgModal('${item.src}')">상세 사진</a>
            </div>
          </div>
          <div class="card-footer">
            <span>크기 </span>
            <p>${item.size}</p>
          </div>
        </li>
        `;
      }
    }
  }
  const cloths = gwangmokList + mumyeongList + ingyeonList + jagadeuList + myeonsilkeuList + seullabeuList + ectList;
  cloItems.innerHTML = cloths;
  fabItems.innerHTML = fabricList;
}

const pdTap = document.querySelectorAll('.pd_tap .tap');
const pdTapContent = document.querySelectorAll('.product_tap ul');
for(let i = 0; i < pdTap.length; i++){
  pdTap[i].addEventListener('click', ()=>{
    for(let j = 0; j < pdTap.length; j++){
      pdTap[j].classList.remove('on');
      pdTapContent[j].classList.remove('active');
    }
    pdTap[i].classList.add('on');
    pdTapContent[i].classList.add('active');
  })
}
