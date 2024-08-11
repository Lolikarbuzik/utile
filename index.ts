//@ts-nocheck
import "./index.d"

Boolean = function (value: any): boolean {
    value = value.toString().toLowerCase()
    if (value === "true" || value === "on") {
        return true
    }
    if (value === "false" || value === "off") {
        return false
    }
    return undefined
}

Number.isNaN = function (number): boolean {
    if (typeof number === "number") {
        return number + 0 != number
    }
    return false
}

getVec3i = function (obj: Vec3i | Get3DSpaceCordinatesImpl): Vec3i {
    if (obj instanceof Vec3i) {
        return obj
    }
    return new Vec3i(obj.getX(), obj.getY(), obj.getZ())
}

getBlocksInDistance = function (distance: number, point: Vec3i | Get3DSpaceCordinatesImpl): Block[] {
    point = getVec3i(point)
    const blocks: Block[] = [];
    for (let x = -distance + point.x; x <= distance + point.x; x++) {
        for (let y = -distance + point.y; y <= distance + point.y; y++) {
            for (let z = -distance + point.z; z <= distance + point.z; z++) {
                let block = World.getBlockAt(x, y, z)
                if (block.type.getRegistryName() === "minecraft:air") continue;
                blocks.push(block)
            }
        }
    }
    return blocks;
}

registerCommand = function <PC extends CommandParameters, A extends Array<any>>(name: string, callback: (...args: A) => Result, pChecks: PC, aliases: string[] = []): void {
    register("command", (...args) => {
        args ||= []
        if (args[0] == undefined) {
            args = []
        }
        if (pChecks.length != callback.length) {
            ChatLib.simulateChat(`Command ${name} failed got ${pChecks.length} checks but callback expects ${callback.length} args`)
            return
        }
        if (args.length != pChecks.length) {
            ChatLib.simulateChat(`Command ${name} failed expected ${pChecks.length} arguments got ${args.length}`)
            return
        }
        const mArgs: A = []
        for (let i = 0; i < args.length; i++) {
            let arg = args[i]
            let value = pChecks[i](arg)
            if (value === undefined) {
                ChatLib.simulateChat(`Expected argument ${pChecks[i].name} "${arg}"`)
                return
            }
            if (Number.isNaN(value)) {
                ChatLib.simulateChat(`Expected argument ${i} "${arg}" to be a number`)
                return
            }
            mArgs.push(value)
        }
        const result = callback(...mArgs)
        if (result) {
            ChatLib.simulateChat(`Command ${name} failed with ${result}`)
        }
    }).setCommandName(name).setAliases(...aliases)
}

addVec3i = function (a: Vec3i, b: Vec3i): Vec3i {
    a = getVec3i(a)
    b = getVec3i(b)
    return new Vec3i(a.x + b.x, a.y + b.y, a.z + b.z)
}

subVec3i = function (a: Vec3i, b: Vec3i): Vec3i {
    a = getVec3i(a)
    b = getVec3i(b)

    return new Vec3i(a.x - b.x, a.y - b.y, a.z - b.z)
}

divVec3i = function (a: Vec3i, b: Vec3i): Vec3i {
    a = getVec3i(a)
    b = getVec3i(b)

    return new Vec3i(a.x / b.x, a.y / b.y, a.z / b.z)
}

mulVec3i = function (a: Vec3i, b: Vec3i): Vec3i {
    a = getVec3i(a)
    b = getVec3i(b)

    return new Vec3i(a.x * b.x, a.y * b.y, a.z * b.z)
}

getXYZ = function (obj: Vec3i | Get3DSpaceCordinatesImpl): [x: number, y: number, z: number] {
    if (!(obj instanceof Vec3i)) {
        obj = getVec3i(obj)
    }
    return [obj.x, obj.y, obj.z]
}