exports.getFields = info => {
	return info.fieldNodes.map(node => node.selectionSet.selections.map(sel => sel.name.value))[0]
}
