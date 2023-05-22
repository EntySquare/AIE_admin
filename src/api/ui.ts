import axios from 'axios';

export interface uiData {
  uiPicture: string;
  title: string;
  content: string;
  publishTimer: string;
}

export interface tableListData {
  dataLen: number;
  data: uiData[];
}

export interface Carousel {
  content: string;
  content_img_url: string;
  title: string;
  url: string;
}

export interface CarouselList {
  carousel_list: Carousel[];
}

export interface CarouselReq {
  carousel_list: Carousel[];
  place: string;
}

// 查询轮播列表
export function fetchCarouselList(place: string) {
  return axios.post<CarouselList>('/admin/carousel/list', { place });
}

// 更新轮播列表
export function updateCarouselList(carList: Carousel[], place: string) {
  return axios.post<string>('/admin/carousel/createOrUpdate', {
    carousel_list: carList,
    place,
  });
}
