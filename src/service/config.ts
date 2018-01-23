import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  constructor() { }

  getCatTitles(){
    return [
      // 0
      {
        id: 0,
        title: '热点'
      },
      // 1
      {
        id: 1,
        title: '中国'
      },
      // 2
      {
        id: 2,
        title: '国际'
      },
      // 3
      {
        id: 3,
        title: '科教'
      },
      // 4
      {
        id: 4,
        title: '军事'
      },
      // 5
      {
        id: 5,
        title: '体育'
      },
      // 6
      {
        id: 6,
        title: '娱乐'
      },
      // 7
      {
        id: 7,
        title: '艺术'
      },
      // 8
      {
        id: 8,
        title: '文史'
      },
      // 9
      {
        id: 9,
        title: '观点'
      },
      // 10
      {
        id: 10,
        title: '生活'
      },
      // 11
      {
        id: 11,
        title: '产经'
      },
      // 12
      {
        id: 12,
        title: '其它'
      }
    ];
  }

}
