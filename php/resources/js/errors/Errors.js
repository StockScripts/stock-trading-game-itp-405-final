const laravel_errors = document.querySelector('#laravel-errors').value;

export function getErrorForProperty(property)
{
	if (laravel_errors.hasOwnProperty(property)) {
		return laravel_errors[property];
	}
	return null;
}

export function getOldForProperty(property)
{

}