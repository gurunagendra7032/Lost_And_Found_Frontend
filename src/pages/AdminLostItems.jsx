import React, { useEffect, useState } from "react";
import "./AdminFoundItems.css";

function AdminLostItems() {

    const [items, setItems] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch("https://lostandfound-production-33dc.up.railway.app/admin/lostitems", {
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

return (
    <div className="lostitems-page">

        <div className="lostitems-header">
            <div>
                <h1>All Lost Items</h1>
                <p>Manage and monitor all reported found items</p>
            </div>
        </div>

        <div className="lostitems-container">

            <div className="lostitems-table">

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

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    </div>
)
}

export default AdminLostItems;