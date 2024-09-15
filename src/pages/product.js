import React, { useState } from "react";
import initialProductData from "../data/products.json";
import Modal from "../components/modal";

function Products() {
    const [products, setProducts] = useState(initialProductData);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [formState, setFormState] = useState({
        purchaseNumber: "",
        purchaseDate: "",
        sku: "",
        supplier: "",
        status: "",
        notes: "",
        totalAmount: "",
        created: "",
        modified: ""
    });

    const handleShowModal = (product = null, type) => {
        setSelectedProduct(product);
        setModalType(type);
        setFormState(product || {
            purchaseNumber: "",
            purchaseDate: "",
            sku: "",
            supplier: "",
            status: "",
            notes: "",
            totalAmount: "",
            created: new Date().toISOString(),
            modified: new Date().toISOString()
        });
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setModalType(null);
        setFormState({
            purchaseNumber: "",
            purchaseDate: "",
            sku: "",
            supplier: "",
            status: "",
            notes: "",
            totalAmount: "",
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
            const newProduct = {
                id: products.length + 1,
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

            <Modal
                show={modalType !== null}
                handleClose={handleCloseModal}
                title={modalType === "add" ? "Add Product" : modalType === "view" ? "View Product" : modalType === "edit" ? "Edit Product" : "Delete Product"}
                onConfirm={modalType === "edit" || modalType === "add" ? handleSaveProduct : modalType === "delete" ? handleDeleteProduct : null}
                confirmText={modalType === "edit" || modalType === "add" ? (modalType === "edit" ? "Save changes" : "Add Product") : modalType === "delete" ? "Delete" : ""}
            >
                {modalType === "view" && selectedProduct && (
                    <div>
                        <p><strong>Name:</strong> {selectedProduct.purchaseNumber}</p>
                        <p><strong>Purchase Date:</strong> {selectedProduct.purchaseDate}</p>
                        <p><strong>SKU:</strong> {selectedProduct.sku}</p>
                        <p><strong>Supplier:</strong> {selectedProduct.supplier}</p>
                        <p><strong>Status:</strong> {selectedProduct.status}</p>
                        <p><strong>Notes:</strong> {selectedProduct.notes}</p>
                        <p><strong>Total Amount:</strong> {selectedProduct.totalAmount}</p>
                        <p><strong>Created:</strong> {selectedProduct.created}</p>
                        <p><strong>Modified:</strong> {selectedProduct.modified}</p>
                    </div>
                )}
                {(modalType === "edit" || modalType === "add") && (
                    <div>
                        <div className="mb-3">
                            <label htmlFor="purchaseNumber" className="form-label">Purchase Number</label>
                            <input type="text" className="form-control" id="purchaseNumber" name="purchaseNumber" value={formState.purchaseNumber} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
                            <input type="date" className="form-control" id="purchaseDate" name="purchaseDate" value={formState.purchaseDate} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sku" className="form-label">SKU</label>
                            <input type="text" className="form-control" id="sku" name="sku" value={formState.sku} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="supplier" className="form-label">Supplier</label>
                            <input type="text" className="form-control" id="supplier" name="supplier" value={formState.supplier} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <input type="text" className="form-control" id="status" name="status" value={formState.status} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="notes" className="form-label">Notes</label>
                            <textarea className="form-control" id="notes" name="notes" value={formState.notes} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="totalAmount" className="form-label">Total Amount</label>
                            <input type="text" className="form-control" id="totalAmount" name="totalAmount" value={formState.totalAmount} onChange={handleInputChange} />
                        </div>
                    </div>
                )}
                {modalType === "delete" && selectedProduct && (
                    <div>
                        <p>Are you sure you want to delete this product?</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Products;