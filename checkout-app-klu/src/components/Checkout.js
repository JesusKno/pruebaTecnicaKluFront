// src/Checkout.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Checkout.css';

const Checkout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setError('');
    setTransaction(null);
    
    const payload = {
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      amount: parseFloat(data.amount),
      currency: data.currency,
    };

    try {
      const response = await fetch('http://localhost:8000/transactions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.detail || 'Error en la transacción');
      } else {
        const resp = await response.json();
        setTransaction(resp);
        reset();
      }
    } catch (err) {
      setError('Error de red');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {error && <p className="error-message">{error}</p>}
      {transaction ? (
        <div className="transaction-details">
          <h3>Transacción creada</h3>
          <p><strong>ID:</strong> {transaction.id}</p>
          <p><strong>Estado:</strong> {transaction.status}</p>
          <p><strong>Stripe Payment Intent ID:</strong> {transaction.stripe_payment_intent_id}</p>
          <p><strong>Stripe Client Secret:</strong> {transaction.stripe_client_secret}</p>
          <p><strong>Fecha:</strong> {new Date(transaction.created_at).toLocaleString()}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
          <div>
            <label htmlFor="customer_name">Nombre del Cliente</label>
            <input
              id="customer_name"
              type="text"
              {...register('customer_name', { required: 'El nombre es requerido' })}
            />
            {errors.customer_name && (
              <p className="error-message">{errors.customer_name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="customer_email">Email del Cliente</label>
            <input
              id="customer_email"
              type="email"
              {...register('customer_email', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: 'El email debe tener un formato válido, por ejemplo, usuario@dominio.com'
                }
              })}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.customer_email && (
              <p className="error-message">{errors.customer_email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="amount">Monto</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              {...register('amount', {
                required: 'El monto es requerido',
                valueAsNumber: true,
                min: { value: 0.01, message: 'El monto debe ser mayor que 0' },
              })}
            />
            {errors.amount && (
              <p className="error-message">{errors.amount.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="currency">Moneda</label>
            <select
              id="currency"
              {...register('currency', { required: 'La moneda es requerida' })}
            >
              <option value="USD">USD</option>
              <option value="MXN">MXN</option>
            </select>
            {errors.currency && (
              <p className="error-message">{errors.currency.message}</p>
            )}
          </div>
          <button type="submit">Pagar</button>
        </form>
      )}
    </div>
  );
};

export default Checkout;

