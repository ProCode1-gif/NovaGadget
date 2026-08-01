// import React from 'react'

const FormatCurrency = (amount, currency = 'USD', local = 'en-US') => {
  return new Intl.NumberFormat(local, {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export default FormatCurrency