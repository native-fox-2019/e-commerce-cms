function changeMoney(money) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  })
  return formatter.format(money)
}

export default changeMoney