import React, { useEffect, useState } from "react";

const CurrencyConverter = () => {
  const initialData = {
    amount: 0,
    convertFrom: "EUR",
    convertTo: "USD",
  };

  const [formData, setFormData] = useState(initialData);
  const [output, setOutpt] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const signal = controller.signal; // Get the abort signal

    const fetchCurrency = async () => {
      try {
        if (formData.amount > 0) {
          setLoading(true); // Start loading
          setError(null); // Reset the error state

          // Fetch currency conversion
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${formData.amount}&from=${formData.convertFrom}&to=${formData.convertTo}`,
            { signal } // Pass the abort signal to fetch
          );

          if (!res.ok) {
            throw new Error("Failed to fetch currency data.");
          }

          const data = await res.json();
          if (data.message) throw new Error(data.message);

          // Set the output with the converted value
          setOutpt(data.rates[formData.convertTo]);
        }
      } catch (error) {
        if (error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (formData.convertFrom === formData.convertTo)
      return setOutpt(formData.amount);

    fetchCurrency();

    return () => {
      controller.abort();
    };
  }, [formData]);

  return (
    <div>
      <form>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, amount: Number(e.target.value) }))
          }
          disabled={loading}
        />
        <select
          name="convertFrom"
          value={formData.convertFrom}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, convertFrom: e.target.value }))
          }
          disabled={loading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          name="convertTo"
          value={formData.convertTo}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, convertTo: e.target.value }))
          }
          disabled={loading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </form>

      {loading ? (
        <h3>LOADING...</h3>
      ) : error ? (
        <h3 style={{ color: "red" }}>Error: {error}</h3>
      ) : output ? (
        <h3>
          {formData.amount} {formData.convertFrom} = {output.toFixed(2)}{" "}
          {formData.convertTo}
        </h3>
      ) : (
        <h3>Enter an amount to convert</h3>
      )}
    </div>
  );
};

export default CurrencyConverter;
