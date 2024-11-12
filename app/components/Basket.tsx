'use client';

import useBasketStore from '@/lib/basket-store';

const Basket = () => {
  const { basketProducts, increase, decrease, count, removeFromBasket, setDateFrom, setDateTo, dateFrom, dateTo } = useBasketStore();

  console.log('dateFrom', dateFrom);
  console.log('dateTo', dateTo);

  // Utility to format a Date object to a 'YYYY-MM-DD' string
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    // * padStart(2, 0) to ensure the string is at least 2 characters long, padding with '0' if necessaryIt ensures that single-digit months are displayed with a leading zero, making the date format consistent.

    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (count === 0) {
    return <p>Your basket is empty.</p>;
  }

  if (count > 0)
    return (
      <>
        <table style={{ border: '1px solid black', width: '100%', maxWidth: '700px', margin: '0 auto' }}>
          <tr>
            <th style={{ textAlign: 'left', border: '1px solid black' }}></th>
            <th style={{ textAlign: 'left', border: '1px solid black' }}>Name</th>
            <th style={{ textAlign: 'center', border: '1px solid black' }}>Quantity</th>
            <th style={{ textAlign: 'center', border: '1px solid black' }}>Date of the game</th>
          </tr>

          {basketProducts.map((product) => {
            return (
              <tr key={product.databaseId}>
                <td style={{ textAlign: 'center', border: '1px solid black' }}>
                  <button onClick={() => removeFromBasket(product.databaseId)}>Remove</button>
                </td>
                <td style={{ textAlign: 'center' }}>{product.name}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => decrease(product.databaseId)}>-</button> {product.quantity}
                  <button onClick={() => increase(product.databaseId)}>+</button>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <input type='datetime-local' name='' id='' />
                </td>
              </tr>
            );
          })}
        </table>
        <h3>When do you arrive in Kraków?</h3>
        <input onChange={(e) => setDateFrom(e)} value={dateFrom ? formatDate(dateFrom) : ''} type='date' name='date-arrive' id='' />
        <h3>When do you leave Kraków?</h3>
        <input onChange={(e) => setDateTo(e)} value={dateTo ? formatDate(dateTo) : ''} type='date' name='date-leave' id='' />
      </>
    );
};

export default Basket;
