
import React, { useEffect, useState } from "react";
import "./AdminFoundItems.css";

function AdminFoundItems() {

    const [items, setItems] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch(
            "https://lostandfound-production-33dc.up.railway.app/admin/founditems",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to fetch found items");
                }

                return response.json();
            })
            .then(data => {
                setItems(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);


    async function changeStatus(reference) {

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                `https://lostandfound-production-33dc.up.railway.app/admin/{reference}/status`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to change status");
            }

            /*
             * Backend has successfully changed:
             *
             * WITH_ADMIN
             *        ↓
             * CURRENT_STORAGE
             */

            setItems(prevItems =>
                prevItems.map(item =>
                    item.reference === reference
                        ? {
                            ...item,
                            status: "WITH_ADMIN"
                        }
                        : item
                )
            );

        } catch (error) {

            console.error(error);
            alert("Failed to change item status");

        }
    }


    return (

        <div className="founditems-page">

            <div className="founditems-header">

                <div>

                    <h1>All Found Items</h1>

                    <p>
                        Manage and monitor all reported found items
                    </p>

                </div>

            </div>


            <div className="founditems-container">

                <div className="founditems-table">

                    <table>

                        <thead>

                            <tr>

                                <th>Image</th>

                                <th>Reference</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {items.map(item => (

                                <tr key={item.reference}>

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

                                        {item.status === "FOUND" ? (

                                            <button
                                                onClick={() =>
                                                    changeStatus(item.reference)
                                                }
                                            >
                                                Current Storage
                                            </button>

                                        ) : (

                                            <span>
                                                —
                                            </span>

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default AdminFoundItems;
