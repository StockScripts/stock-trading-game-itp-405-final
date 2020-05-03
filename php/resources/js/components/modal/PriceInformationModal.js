import React, {useEffect, useState, Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function PriceInformationModal(props) {
	const [show, setShow] = React.useState(false);

	const handleClose = () => {setShow(false)};
	const handleShow = () => {setShow(true)};

	const getModalBody = () => {
		if (!props.data) {
			return (
				<div className="text-center text-secondary m-auto">
					waiting for valid input...
				</div>
			);
		}
		return (
			<div className="text-center m-auto">
				<p className="h3">
					Ticker: {props.ticker}
				</p>
				{Object.keys(props.data).map(key => (
					<div className="container text-center text-secondary m-auto">
						<p className="text-primary">Date: {key}</p>
						<div className="row m-auto text-center">
							<div className="col-sm m-auto">
								Open: {props.data[key]['1. open']}
							</div>
							<div className="col-sm m-auto">
								Volume: {props.data[key]['5. volume']}	
							</div>
						</div>
						<div className="row m-auto text-center">
							<div className="col-sm m-auto">
								Low: {props.data[key]['3. low']}
							</div>
							<div className="col-sm m-auto">
								High: {props.data[key]['2. high']}
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<Fragment>
			<a onClick={handleShow}>
				<u>{props.buttonText}</u>	
			</a>
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

export default PriceInformationModal;