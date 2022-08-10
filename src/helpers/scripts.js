export const filterIt = (array, value, key) => {
	return array.filter(key
		? a => a[key] === value
		: a => Object.keys(a).some(k => a[k] === value)
	);
}

export const filterItFull = (array, value, key) => {
	return array.filter(key
		? a => a[key].toLowerCase().indexOf(value.toLowerCase()) !== -1
		: a => Object.keys(a).some(k => a[k].toLowerCase().indexOf(value.toLowerCase()) !== -1)
	);
}