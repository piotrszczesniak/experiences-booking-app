'use client';

import useBasketStore from '@/lib/basket-store';
import { useState } from 'react';

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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Utility to format a Date object to a 'YYYY-MM-DD' string
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        name,
        email,
        phone,
        notes,
        dateFrom: dateFrom ? formatDate(dateFrom) : '',
        dateTo: dateTo ? formatDate(dateTo) : '',
        items: basketProducts.map((p) => ({
          name: p?.name,
          quantity: p.quantity,
          eventDate: p.eventDate ? formatDate(p.eventDate) : '',
          eventTime: p.eventTime,
        })),
      };

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to send enquiry. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (count === 0) {
    return <p>Your basket is empty.</p>;
  }

  if (submitted) {
    return (
      <div>
        <h2>Thank you, {name}!</h2>
        <p>Your enquiry has been received. We will get back to you at {email} shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <table style={{ border: '1px solid black', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', border: '1px solid black' }}></th>
            <th style={{ textAlign: 'left', border: '1px solid black' }}>Activity name</th>
            <th style={{ textAlign: 'center', border: '1px solid black' }}>No. of participants</th>
            <th style={{ textAlign: 'center', border: '1px solid black' }}>Game date/time</th>
          </tr>
        </thead>
        <tbody>
          {basketProducts.map((product) => {
            return (
              <tr key={product.databaseId}>
                <td style={{ textAlign: 'center', border: '1px solid black' }}>
                  <button type='button' onClick={() => removeFromBasket(product.databaseId)}>Remove</button>
                </td>
                <td style={{ textAlign: 'center' }}>{product.name}</td>
                <td style={{ textAlign: 'center' }}>
                  <button type='button' onClick={() => decrease(product.databaseId)}>-</button> {product.quantity}
                  <button type='button' onClick={() => increase(product.databaseId)}>+</button>
                </td>
                <td style={{ textAlign: 'center', display: 'flex', gap: '8px' }}>
                  <input
                    type='date'
                    onChange={(e) => setEventDate(e, product.databaseId)}
                    value={product.eventDate ? formatDate(product.eventDate) : ''}
                  />
                  <select
                    value={product.eventTime ? product.eventTime : '---'}
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
        </tbody>
      </table>

      <h3>When do you arrive in Kraków?</h3>
      <input onChange={(e) => setDateFrom(e)} value={dateFrom ? formatDate(dateFrom) : ''} type='date' name='date-arrive' />
      <h3>When do you leave Kraków?</h3>
      <input onChange={(e) => setDateTo(e)} value={dateTo ? formatDate(dateTo) : ''} type='date' name='date-leave' />
      <h3>Do you need anything extra?</h3>
      <textarea onChange={(e) => setNotes(e.target.value)} value={notes} name='notes' cols={30} rows={10} />

      <h3>Your contact details</h3>
      <div>
        <label htmlFor='enquiry-name'>Name</label>
        <input
          id='enquiry-name'
          type='text'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Your full name'
        />
      </div>
      <div>
        <label htmlFor='enquiry-email'>Email</label>
        <input
          id='enquiry-email'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='your@email.com'
        />
      </div>
      <div>
        <label htmlFor='enquiry-phone'>Phone</label>
        <input
          id='enquiry-phone'
          type='tel'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='+48 123 456 789'
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type='submit' disabled={submitting}>
        {submitting ? 'Sending enquiry…' : 'Send booking enquiry'}
      </button>
    </form>
  );
};

export default Basket;
