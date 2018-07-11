export default (state = 'Simplesurance', action = {}) => {
  switch (action.type) {
    case 'HOME':
      return 'Simplesurance - home'
    default:
      return state
  }
}
