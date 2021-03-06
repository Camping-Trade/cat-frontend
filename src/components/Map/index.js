import React, {useEffect, useState} from "react";

const {kakao} = window;
let map;

export const KakaoMapAPI = () => {
  console.log("πμΉ΄μΉ΄μ€λ§΅ api μ°κ²°");

  const container = document.getElementById('kakao-map');
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  };
  map = new kakao.maps.Map(container, options);
};


export const KakaoSpotBasedSearch = async (spotText) => {

  console.log("πμΉ΄μΉ΄μ€ μ£Όμ κ²μ μ°κ²°: ", spotText);

  const [mapX, setMapX] = useState(37.4917882876857);
  const [mapY, setMapY] = useState(127.487578470072);

  // μ£Όμ-μ’ν λ³ν κ°μ²΄λ₯Ό μμ±ν©λλ€
  const geocoder = new kakao.maps.services.Geocoder();

  // μ£Όμλ‘ μ’νλ₯Ό κ²μν©λλ€
  geocoder.addressSearch(spotText, await function(result, status) {

    // μ μμ μΌλ‘ κ²μμ΄ μλ£λμΌλ©΄
    if (status === kakao.maps.services.Status.OK) {
      // console.log(result);
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      setMapX(Number(result[0].y));
      setMapY(Number(result[0].x));
      // console.log("result[0]: ", result[0].y, result[0].x);

      // κ²°κ³Όκ°μΌλ‘ λ°μ μμΉλ₯Ό λ§μ»€λ‘ νμν©λλ€
      const marker = new kakao.maps.Marker({
        map: map,
        position: coords
      });

      // μΈν¬μλμ°λ‘ μ₯μμ λν μ€λͺμ νμν©λλ€
      const infowindow = new kakao.maps.InfoWindow({
        content: '<div style="width:150px;text-align:center;padding:6px 0;">κ²μμμΉ</div>'
      });
      infowindow.open(map, marker);

      // μ§λμ μ€μ¬μ κ²°κ³Όκ°μΌλ‘ λ°μ μμΉλ‘ μ΄λμν΅λλ€
      map.setCenter(coords);
    }
  });

  return [mapY, mapX];
}