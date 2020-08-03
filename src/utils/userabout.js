import { v4 as uuidv4 } from 'uuid'

// 用来生产用户的临时id
function getUserTempId() {
  let userTempId = localStorage.getItem('USERTEMPID_KEY')
  // 如果获取不到，说明用户之前没有生产过临时id
  if (!userTempId) {
    userTempId = uuidv4()
    localStorage.setItem('USERTEMPID_KEY', userTempId)
  }
  // 存在就返回原来的，不存在就返回新创建的
  return userTempId
}

export {
  getUserTempId
}