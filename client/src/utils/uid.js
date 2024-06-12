import {v4 as uuidv4} from 'uuid'

export const checkUID = () => {
  if (!localStorage.getItem('uid')) {
    localStorage.setItem('uid', 'guest-' + uuidv4())
  }
}

export const updateUID = () => {
  localStorage.setItem('uid', 'guest-' + uuidv4())
}
