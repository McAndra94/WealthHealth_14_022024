const Modal = ({ isOpen, onClose }) => {
	// isOpen: controls visibity of the modal
	// onClose: function to close the modal
	if (!isOpen) return null;

	return (
		<div className="modal">
			<div className="modalContent">
				<h2>Employee Created !</h2>
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
};

export default Modal;
