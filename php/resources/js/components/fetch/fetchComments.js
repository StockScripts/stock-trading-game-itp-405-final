export default function fetchComments(discussion_id) {
	return fetch('/discussions/comments/' + discussion_id)
		.then(response => {
			console.log(response);
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
}