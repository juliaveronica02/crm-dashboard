// import React, { useState } from "react";
// import ProductData from "../data/products.json";

// function Products() {
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [modalType, setModalType] = useState(null); // "view", "edit", "delete"

//     const handleShowModal = (product, type) => {
//         setSelectedProduct(product);
//         setModalType(type);
//     };

//     const handleCloseModal = () => {
//         setSelectedProduct(null);
//         setModalType(null);
//     };

//     return (
//         <div className="container mt-4" id="/products">
//             <h2 className="mb-4">Daftar Pembelian</h2>
//             <button className="btn btn-primary mb-3">Tambah daftar Pembelian</button>
//             <div className="table-responsive">
//                 <table className="table table-light table-striped text-center">
//                     <thead>
//                         <tr>
//                             <th>No</th>
//                             <th>Name</th>
//                             <th>Status</th>
//                             <th>Created</th>
//                             <th>Modified</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {ProductData.length > 0 ? (
//                             ProductData.map((product, index) => (
//                                 <tr key={product.id}>
//                                     <td>{index + 1}</td>
//                                     <td>{product.purchaseNumber}</td>
//                                     <td>{product.status}</td>
//                                     <td>{product.created}</td>
//                                     <td>{product.modified}</td>
//                                     <td>
//                                         <button className="btn btn-sm btn-primary m-2" onClick={() => handleShowModal(product, "view")}>View</button>
//                                         <button className="btn btn-sm btn-light m-2" onClick={() => handleShowModal(product, "edit")}>Edit</button>
//                                         <button className="btn btn-sm btn-danger m-2" onClick={() => handleShowModal(product, "delete")}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="11" className="text-center">No Data</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Modals */}
//             {modalType && selectedProduct && (
//                 <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} role="dialog">
//                     <div className="modal-dialog" role="document">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">{modalType.charAt(0).toUpperCase() + modalType.slice(1)} Product</h5>
//                                 <button type="button" className="btn-close" onClick={handleCloseModal}></button>
//                             </div>
//                             <div className="modal-body">
//                                 {modalType === "view" && (
//                                     <div>
//                                         <p><strong>Name:</strong> {selectedProduct.purchaseNumber}</p>
//                                         <p><strong>Status:</strong> {selectedProduct.status}</p>
//                                         <p><strong>Created:</strong> {selectedProduct.created}</p>
//                                         <p><strong>Modified:</strong> {selectedProduct.modified}</p>
//                                     </div>
//                                 )}
//                                 {modalType === "edit" && (
//                                     <div>
//                                         <p>Edit product form goes here...</p>
//                                     </div>
//                                 )}
//                                 {modalType === "delete" && (
//                                     <div>
//                                         <p>Are you sure you want to delete this product?</p>
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="modal-footer">
//                                 {modalType === "edit" && <button type="button" className="btn btn-primary">Save changes</button>}
//                                 {modalType === "delete" && <button type="button" className="btn btn-danger">Delete</button>}
//                                 <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Products;

import React, { useState } from "react";
import initialProductData from "../data/products.json";

function Products() {
    const [products, setProducts] = useState(initialProductData);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [formState, setFormState] = useState({
        purchaseNumber: "",
        status: "",
        created: "",
        modified: ""
    });

    const handleShowModal = (product = null, type) => {
        setSelectedProduct(product);
        setModalType(type);
        setFormState(product || {
            purchaseNumber: "",
            status: "",
            created: new Date().toISOString(),
            modified: new Date().toISOString()
        });
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setModalType(null);
        setFormState({
            purchaseNumber: "",
            status: "",
            created: "",
            modified: ""
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSaveProduct = () => {
        if (modalType === "edit" && selectedProduct) {
            // Edit existing product
            setProducts(products.map(product =>
                product.id === selectedProduct.id
                    ? { ...product, ...formState, modified: new Date().toISOString() }
                    : product
            ));
        } else if (modalType === "add") {
            // Add new product
            const newProduct = {
                id: products.length + 1, // This should be a unique ID, consider using a better ID generation method
                ...formState,
                created: new Date().toISOString(),
                modified: new Date().toISOString()
            };
            setProducts([...products, newProduct]);
        }
        handleCloseModal();
    };

    const handleDeleteProduct = () => {
        setProducts(products.filter(product => product.id !== selectedProduct.id));
        handleCloseModal();
    };

    return (
        <div className="container mt-4" id="/products">
            <h2 className="mb-4">Daftar Pembelian</h2>
            <button className="btn btn-primary mb-3" onClick={() => handleShowModal(null, "add")}>
                Tambah daftar Pembelian
            </button>
            <div className="table-responsive">
                <table className="table table-light table-striped text-center">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Modified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.purchaseNumber}</td>
                                    <td>{product.status}</td>
                                    <td>{product.created}</td>
                                    <td>{product.modified}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary m-2" onClick={() => handleShowModal(product, "view")}>View</button>
                                        <button className="btn btn-sm btn-light m-2" onClick={() => handleShowModal(product, "edit")}>Edit</button>
                                        <button className="btn btn-sm btn-danger m-2" onClick={() => handleShowModal(product, "delete")}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No Data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            {modalType && (
                <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalType === "add" ? "Add Product" : modalType.charAt(0).toUpperCase() + modalType.slice(1) + " Product"}
                                </h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                {modalType === "view" && selectedProduct && (
                                    <div>
                                        <p><strong>Name:</strong> {selectedProduct.purchaseNumber}</p>
                                        <p><strong>Status:</strong> {selectedProduct.status}</p>
                                        <p><strong>Created:</strong> {selectedProduct.created}</p>
                                        <p><strong>Modified:</strong> {selectedProduct.modified}</p>
                                    </div>
                                )}
                                {(modalType === "edit" || modalType === "add") && (
                                    <div>
                                        <div className="mb-3">
                                            <label htmlFor="purchaseNumber" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="purchaseNumber" name="purchaseNumber" value={formState.purchaseNumber} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="status" className="form-label">Status</label>
                                            <input type="text" className="form-control" id="status" name="status" value={formState.status} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                )}
                                {modalType === "delete" && selectedProduct && (
                                    <div>
                                        <p>Are you sure you want to delete this product?</p>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                {(modalType === "edit" || modalType === "add") && (
                                    <button type="button" className="btn btn-primary" onClick={handleSaveProduct}>
                                        {modalType === "edit" ? "Save changes" : "Add Product"}
                                    </button>
                                )}
                                {modalType === "delete" && (
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteProduct}>Delete</button>
                                )}
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products;