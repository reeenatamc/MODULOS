const apiUrl = 'http://localhost:3000/payments';

const paymentForm = document.getElementById('paymentForm');
const paymentTable = document.getElementById('paymentTable').querySelector('tbody');

const fetchPayments = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    renderPayments(data);
};

const renderPayments = (payments) => {
    paymentTable.innerHTML = '';
    payments.forEach(({ id, payer_name, amount, payment_date }) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${id}</td>
            <td>${payer_name}</td>
            <td>${amount}</td>
            <td>${payment_date}</td>
            <td>
                <button onclick="editPayment(${id}, '${payer_name}', ${amount}, '${payment_date}')">Edit</button>
                <button onclick="deletePayment(${id})">Delete</button>
            </td>
        `;
        paymentTable.appendChild(row);
    });
};

const savePayment = async (e) => {
    e.preventDefault();
    const id = document.getElementById('paymentId').value;
    const payer_name = document.getElementById('payerName').value;
    const amount = document.getElementById('amount').value;
    const payment_date = document.getElementById('paymentDate').value;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;
    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payer_name, amount, payment_date }),
    });

    paymentForm.reset();
    fetchPayments();
};

const editPayment = (id, payer_name, amount, payment_date) => {
    document.getElementById('paymentId').value = id;
    document.getElementById('payerName').value = payer_name;
    document.getElementById('amount').value = amount;
    document.getElementById('paymentDate').value = payment_date;
};

const deletePayment = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchPayments();
};

paymentForm.addEventListener('submit', savePayment);
fetchPayments();
