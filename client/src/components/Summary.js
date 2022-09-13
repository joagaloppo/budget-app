import React from 'react';
import { useNavigate } from 'react-router-dom';

function Summary( { transactions, balance } ) {
    const navigate = useNavigate()

    return (
        <div className="dashboard">
                <div className="info">
                    <h2>Balance: ${balance(transactions)}</h2>
                    <button onClick={(e) => navigate("/dashboard/manage")}  className="manage">Manage</button>
                </div>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th className="id">ID</th>
                                <th>Date</th>
                                <th>Detail</th>
                                <th>Type</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            { Array.isArray(transactions) && transactions.filter((e, i) => i < 10).map(e => {
                                return ( 
                                    <tr key={e.id}>
                                        <td className="id">{e.id}</td>
                                        <td className="date">{e.date}</td>
                                        <td className="detail">{e.detail}</td>
                                        <td className="type">{e.type}</td>
                                        <td className="amount"> {e.type === "in" ? "+" : "-" }${e.amount} </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
    );
}

export default Summary;