/**
 * Helper function to extract the fields requested in a query
 * @param {Object} info the `info` object that gets passed to the resolver
 */
exports.getFields = info => {
	return info.fieldNodes.map(node => node.selectionSet.selections.map(sel => sel.name.value))[0]
}
