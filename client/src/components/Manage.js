import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Manage( { user, transactions, balance, fetchData } ) {

    const navigate = useNavigate();
    const [display, setDisplay] = React.useState("");
    const [type, setType] = React.useState(true);
    const [input, setInput] = React.useState({ detail: "", amount: 0, date: "", type: "" });

    const handleChange = (e) => { setInput ({ ...input, [e.target.name]: e.target.value }) }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_POST_TRANSACTION, { ...input, userId: user.id })
            .then(res => { setDisplay(""); fetchData(); setInput({ detail: "", amount: 0, date: "", type: "" });})
            .catch(err => console.log(err.response.data))
        setInput({ detail: "", amount: 0, date: "", type: "" });
    }

    const handleEdit = (e) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_POST_TRANSACTION}/${input.id}`, { detail: input.detail, amount: input.amount, date: input.date })
            .then(res => { setDisplay(""); fetchData(); setInput({ detail: "", amount: 0, date: "", type: "" });})
            .catch(err => console.log(err.response.data))
    }

    const handleDelete = (e) => {
        axios.delete(`${process.env.REACT_APP_POST_TRANSACTION}/${e.target.name}`)
        .then(() => fetchData())
        .catch(err => console.log(err.response.data))
    }

    const handleAutoComplete = (e) => {
        const t = transactions.find(a => a.id === parseInt(e.target.name));
        setInput({ id: t.id, detail: t.detail, amount: t.amount, date: t.date })
        setDisplay("edit");
    }

    return (
    <React.Fragment>
        <div className="dashboard">
            <div className="info">
            <h2>Balance: ${balance(transactions)}</h2>
                <div>
                    <button onClick={(e) => setDisplay("add")} className="plus">Add</button>
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
                                    <td className="edit"><button name={e.id} onClick={(e) => handleAutoComplete(e)} className="edit">Edit</button></td>
                                    <td className="delete"><button name={e.id} onClick={(e) => handleDelete(e)} className="delete">Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>        
            </div>
        </div>

        <div className={display ? "overlay" : "overlay no-display"}>
            <div className="box manage">
                <form>
                    <div className="input-section">
                        <div>
                            <div className="join">
                                <label>Detail</label> <input type="text" name="detail" onChange={(e) => {handleChange(e); }} value={input.detail}/>
                            </div>
                        </div>
                        <div>
                                <div className="join">
                            <label>Amount</label> <input type="number" name="amount" onChange={(e) => {handleChange(e); }} value={input.amount} className="amount"/>
                                </div>
                        </div>
                        <div>
                            <div className="join">
                                <label>Date</label> <input type="date" name="date" onChange={(e) => {handleChange(e); }} value={input.date} className="date"/>
                            </div>
                        </div>
                        { display === "edit" ? null : (
                            <div>
                                <div className="join">
                                    <label>Type</label>
                                    <div className="buttons">
                                        <button className={input.type === "in" ? "in active" : "in"} onClick={(e) => { e.preventDefault(); setInput ({ ...input, type: "in" }); }}> In </button>
                                        <button className={input.type === "out" ? "out active" : "out"} onClick={(e) => { e.preventDefault(); setInput ({ ...input, type: "out" }); }}> Out </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='button-section'>
                        <button onClick={(e) => { e.preventDefault(); setDisplay(""); setInput({ detail: "", amount: 0, date: "", type: "" } ) } }>Cancel</button>
                        <button onClick={(e) => display === "add" ? handleSubmit(e) : handleEdit(e) }> { display === "add" ? "Create" : "Edit" }</button>
                    </div>
                </form>
            </div>
        </div>
    </React.Fragment>
    );
}

export default Manage;