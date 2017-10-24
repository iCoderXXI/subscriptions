export function addSubscription(data) {
  return {
    type: 'ADD_SUBSCRIPTION',
    payload: data,
  }
}

export function deleteSubscription(id) {
  return {
    type: 'DELETE_SUBSCRIPTION',
    payload: id,
  }
}

export function setDuplicate() {
  return {
    type: 'SET_DUPLICATE',
  }
}

export function unsetDuplicate() {
  return {
    type: 'UNSET_DUPLICATE',
  }
}
