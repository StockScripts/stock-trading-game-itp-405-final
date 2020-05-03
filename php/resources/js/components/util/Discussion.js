import React, {useEffect, useState, Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Discussion(props) {
	const [show, setShow] = React.useState(false);

	const handleClose = () => {setShow(false)};
	const handleShow = () => {setShow(true)};

	const getModalBody = () => {
		const new_comment_url = '/discussions/new_comment/' + props.id;
		return (
			<div className="text-center m-auto">
				<p className="h3 m-2">
					{props.title}
				</p>
				<p className="h5 text-left m-2">
					Author: {props.username}	
				</p>
				<a className="btn btn-outline-secondary float-right" href={new_comment_url}>Add Comment</a>
				<br/><br/>
				<p className="h5 m-2 text-left">
					Comments:
				</p>
				<table className="table">
					<thead>
						<tr>
							<th scope="col" className="w-25">
								User:
							</th>
							<th scope="col" className="w-75">
								Comment:
							</th>
						</tr>
					</thead>
					<tbody>
						{props.comments.length > 0 ? props.comments.map(comment => (
							<Fragment>
								<tr>
									<td scope="col" className="w-25">
										{comment.username}, {comment.created_at ? comment.created_at : 'before timestamps'}
									</td>
									<td scope="col" className="w-75">
										{comment.content}
									</td>
								</tr>
							</Fragment>
						)) : <Fragment>
							<tr>
								<p className="m-auto p-3 h5">None yet...</p>
							</tr>
						</Fragment>}
					</tbody>
				</table>
			</div>
		);
	};

	return (
		<Fragment>
			<tr>
				<td>
					<p>{props.username}</p>
					<p>{props.created_at}</p>
				</td>
				<td>
					<a className="btn btn-outline-dark btn-block" onClick={handleShow}>{props.title}</a>
				</td>
				<Modal show={show} onHide={handleClose}>
					<Modal.Body>{getModalBody()}</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Hide
						</Button>
					</Modal.Footer>
				</Modal>
			</tr>
		</Fragment>
	);
}

export default Discussion;