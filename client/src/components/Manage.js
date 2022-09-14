import React from 'react';
import { useNavigate } from 'react-router-dom';

function Manage( { transactions, balance } ) {

    const navigate = useNavigate();
    const [type, setType] = React.useState(true);

    return (
        <div className="dashboard">
            <div className="info">
            <h2>Balance: ${balance(transactions)}</h2>
                <div>
                    <button className="plus">Add</button>
                    <button onClick={(e) => navigate("/dashboard")} className="back">Back</button>
                </div>
            </div>
            <div className="table">
                <div className="caption">
                <span>Listing all {type ? "positive" : "negative"} transactions</span>
                    <div className="filter">
                        <button className={type ? "in active" : "in"} onClick={(e) => {setType(true);}}> In </button>
                        <button className={type ? "out" : "out active"} onClick={(e) => {setType(false);}}> Out </button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="id">ID</th>
                            <th>Date</th>
                            <th>Detail</th>
                            <th>Amount</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { Array.isArray(transactions) && transactions.filter((e) => type ? (e.type === "in") : (e.type === "out")).map(e => {
                            return ( 
                                <tr key={e.id}>
                                    <td className="id">{e.id}</td>
                                    <td className="date">{e.date}</td>
                                    <td className="detail">{e.detail}</td>
                                    <td className="amount"> {e.type === "in" ? "+" : "-" }${e.amount} </td>
                                    <td className="edit"><button name={e.id} className="edit">Edit</button></td>
                                    <td className="delete"><button name={e.id} className="delete">Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>        
            </div>
        </div>
    );
}

export default Manage;