import React, {useEffect, useState, Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function AboutModal(props) {
	const [show, setShow] = React.useState(false);

	const handleClose = () => {setShow(false)};
	const handleShow = () => {setShow(true)};

	const getModalBody = () => {
		if (!props.demonstrated_by) {
			return <div className="h4 text-center m-auto">Error loading...</div>
		}
		return props.demonstrated_by;
	};

	return (
		<Fragment>
			<button className={props.button_styling ? props.button_styling : "btn btn-outline-dark btn-block"} onClick={handleShow}>
				{props.requirement}
			</button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Body>{getModalBody()}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Hide
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

export default AboutModal;