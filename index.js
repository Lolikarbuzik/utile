Boolean = function (f) {
	if (((f = f.toString().toLowerCase()), f === "true" || f === "on"))
		return !0
	if (f === "false" || f === "off") return !1
	return
}
Number.isNaN = function (f) {
	if (typeof f === "number") return f + 0 != f
	return !1
}
getVec3i = function (f) {
	if (f instanceof Vec3i) return f
	return new Vec3i(f.getX(), f.getY(), f.getZ())
}
getBlocksInDistance = function (f, G) {
	if (!(G instanceof Vec3i)) return getBlocksInDistance(f, getVec3i(G))
	const P = []
	for (let B = -f + G.x; B <= f + G.x; B++)
		for (let L = -f + G.y; L <= f + G.y; L++)
			for (let q = -f + G.z; q <= f + G.z; q++) {
				let D = World.getBlockAt(B, L, q)
				if (D.type.getRegistryName() === "minecraft:air") continue
				P.push(D)
			}
	return P
}
registerCommand = function (f, G, P, B = []) {
	register("command", (...L) => {
		if (((L ||= []), L[0] == null)) L = []
		if (P.length != G.length) {
			ChatLib.simulateChat(
				`Command ${f} failed got ${P.length} checks but callback expects ${G.length} args`,
			)
			return
		}
		if (L.length != P.length) {
			ChatLib.simulateChat(
				`Command ${f} failed expected ${P.length} arguments got ${L.length}`,
			)
			return
		}
		const q = []
		for (let w = 0; w < L.length; w++) {
			let E = L[w],
				F = P[w](E)
			if (F === void 0) {
				ChatLib.simulateChat(`Expected argument ${P[w].name} "${E}"`)
				return
			}
			if (Number.isNaN(F)) {
				ChatLib.simulateChat(
					`Expected argument ${w} "${E}" to be a number`,
				)
				return
			}
			q.push(F)
		}
		const D = G(...q)
		if (D) ChatLib.simulateChat(`Command ${f} failed with ${D}`)
	})
		.setCommandName(f)
		.setAliases(...B)
}
addVec3i = function (f, G) {
	return (
		(f = getVec3i(f)),
		(G = getVec3i(G)),
		new Vec3i(f.x + G.x, f.y + G.y, f.z + G.z)
	)
}
subVec3i = function (f, G) {
	return (
		(f = getVec3i(f)),
		(G = getVec3i(G)),
		new Vec3i(f.x - G.x, f.y - G.y, f.z - G.z)
	)
}
divVec3i = function (f, G) {
	return (
		(f = getVec3i(f)),
		(G = getVec3i(G)),
		new Vec3i(f.x / G.x, f.y / G.y, f.z / G.z)
	)
}
mulVec3i = function (f, G) {
	return (
		(f = getVec3i(f)),
		(G = getVec3i(G)),
		new Vec3i(f.x * G.x, f.y * G.y, f.z * G.z)
	)
}
getXYZ = function (f) {
	if (!(f instanceof Vec3i)) f = getVec3i(f)
	return [f.x, f.y, f.z]
}
