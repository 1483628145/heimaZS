import request from '@/utils/request'

/**
 * 获取月卡管理列表
 * **/

/* 参数在get中是 params 在post中是 data */
export function getCardList(params) {
  return request({
    url: '/parking/card/list',
    method: 'GET',
    params
  })
}

/**
 * 添加月卡
 * **/
export function addCard(data) {
  return request({
    url: '/parking/card',
    method: 'POST',
    data
  })
}
