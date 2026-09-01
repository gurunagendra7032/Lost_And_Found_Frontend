import React, { useEffect, useState } from "react";
import "./AdminCurrentItems.css";

function AdminCurrentStorageItems() {

    const [items, setItems] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch("https://lostandfound-production-33dc.up.railway.app/admin/currentStorage/AllItems ", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setItems(data);
        })
        .catch(error => {
            console.error(error);
        });

    }, []);



    const handoverItem = (reference) => {

    const token = localStorage.getItem("token");

    fetch(
        `https://lostandfound-production-33dc.up.railway.app/admin/handover?reference=${reference}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
};

return (
    <div className="Currentitems-page">

        <div className="Currentitems-header">
            <div>
                <h1>All Found Items</h1>
                <p>Manage and monitor all reported found items</p>
            </div>
        </div>

        <div className="Currentitems-container">

            <div className="Currentitems-table">

                <table>

                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Reference</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {items.map(item => (

                            <tr key={item.id}>

                                <td>
                                    <strong>
                                        {item.imageName}
                                    </strong>
                                </td>

                                <td>
                                    <span className="reference">
                                        {item.reference}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={`status ${item.status?.toLowerCase()}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => handoverItem(item.reference)}>Handover</button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    </div>
)
}

export default AdminCurrentStorageItems;