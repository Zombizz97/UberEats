import { computed, reactive } from 'vue'

const state = reactive({ items: [] })

const count = computed(() => state.items.reduce((s, i) => s + i.quantity, 0))
const total = computed(() => state.items.reduce((s, i) => s + i.quantity * i.price, 0))

function addItem (payload, qty = 1) {
  const found = state.items.find(i => i.productId === payload.productId && i.restaurantId === payload.restaurantId)
  if (found) {
    found.quantity += qty
  } else {
    state.items.push({ ...payload, quantity: qty })
  }
}

function increment (productId) {
  const it = state.items.find(i => i.productId === productId)
  if (it) {
    it.quantity += 1
  }
}

function decrement (productId) {
  const it = state.items.find(i => i.productId === productId)
  if (!it) {
    return
  }
  it.quantity -= 1
  if (it.quantity <= 0) {
    remove(productId)
  }
}

function remove (productId) {
  const idx = state.items.findIndex(i => i.productId === productId)
  if (idx !== -1) {
    state.items.splice(idx, 1)
  }
}

export function useCart () {
  return { items: state.items, count, total, addItem, increment, decrement, remove }
}
