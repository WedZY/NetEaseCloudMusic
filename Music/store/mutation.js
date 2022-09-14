import { SET_BACKGROUND_IMG } from './mutation-types'
export default({
  [SET_BACKGROUND_IMG](state,obj){
    state.Image=obj.img
  }
})