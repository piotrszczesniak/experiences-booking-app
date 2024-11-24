'use client';

import useBasketStore from '@/lib/basket-store';

const Basket = () => {
  const {
    basketProducts,
    increase,
    decrease,
    count,
    removeFromBasket,
    setDateFrom,
    setDateTo,
    dateFrom,
    dateTo,
    setNotes,
    notes,
    setEventDate,
    setEventTime,
  } = useBasketStore();

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
        <table style={{ border: '1px solid black', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <tr>
            <th style={{ textAlign: 'left', border: '1px solid black' }}></th>
            <th style={{ textAlign: 'left', border: '1px solid black' }}>Activity name</th>
            <th style={{ textAlign: 'center', border: '1px solid black' }}>No. of participants</th>
            <th style={{ textAlign: 'center', border: '1px solid black' }}>Game date/time</th>
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
                <td style={{ textAlign: 'center', display: 'flex', gap: '8px' }}>
                  <input
                    type='date'
                    onChange={(e) => {
                      setEventDate(e, product.databaseId);
                    }}
                    name=''
                    value={product.eventDate ? formatDate(product.eventDate) : ''}
                    id=''
                  />
                  <select
                    value={product.eventTime ? product.eventTime : '---'}
                    name=''
                    id=''
                    onChange={(e) => setEventTime(e, product.databaseId)}
                  >
                    <option value='---'>---</option>
                    <option value='morning'>Morning</option>
                    <option value='afternoon'>Afternoon</option>
                    <option value='evening'>Evening</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </table>
        <h3>When do you arrive in Kraków?</h3>
        <input onChange={(e) => setDateFrom(e)} value={dateFrom ? formatDate(dateFrom) : ''} type='date' name='date-arrive' id='' />
        <h3>When do you leave Kraków?</h3>
        <input onChange={(e) => setDateTo(e)} value={dateTo ? formatDate(dateTo) : ''} type='date' name='date-leave' id='' />
        <h3>Do you need anything extra?</h3>
        <textarea onChange={(e) => setNotes(e.target.value)} value={notes} name='notes' id='' cols={30} rows={10} />
      </>
    );
};

export default Basket;
