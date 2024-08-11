declare type CommandParameters = (NumberConstructor | StringConstructor | BooleanConstructor)[]
declare type Result = string | undefined | null | void
declare type Get3DSpaceCordinatesImpl = { getX(): number, getY(): number, getZ(): number }

/**
 * Gets blocks in distance from point (Vec3i or object that has Get3DSpaceCordinatesImpl.
 * The output doesnt contain any air blocks
 * @example
 * const Blocks = getBlocksInDistance(10, Player) // or Vec3i
 */
declare function getBlocksInDistance(distance: number, point: Vec3i | Get3DSpaceCordinatesImpl): Block[]

/**
 * Returns a Vec3i from object that has getX(), getY(), getZ() functions
 * @example
 * const Block = World.getBlockAt(0, 0, 0)
 * const BlockPos = getVec3i(Block)
 * @example
 * const PlayerPos = getVec3i(Player) // or getVec3i(Player.asPlayerMP())
 */
declare function getVec3i(obj: Vec3i | Get3DSpaceCordinatesImpl): Vec3i

declare function addVec3i(a: Vec3i | Get3DSpaceCordinatesImpl, b: Vec3i | Get3DSpaceCordinatesImpl): Vec3i
declare function subVec3i(a: Vec3i | Get3DSpaceCordinatesImpl, b: Vec3i | Get3DSpaceCordinatesImpl): Vec3i
declare function mulVec3i(a: Vec3i | Get3DSpaceCordinatesImpl, b: Vec3i | Get3DSpaceCordinatesImpl): Vec3i
declare function divVec3i(a: Vec3i | Get3DSpaceCordinatesImpl, b: Vec3i | Get3DSpaceCordinatesImpl): Vec3i

/**
 * Returns a array of length 3 containing X, Y and Z of the object
 * @example
 * const Block = World.getBlockAt(...getXYZ(Player))
 */
declare function getXYZ(obj: Vec3i | Get3DSpaceCordinatesImpl): [x: number, y: number, z: number]

/**
 * Registers a function of name and alias/es.
 * If u want to have control over what arguments are passed dont use this function.
 * As it checks if the arguments are correct.
 * - Type checking
 * - Length checking
 * @example
 * registerCommand("print", (bool: boolean) => {
 *      ChatLib.simulateChat(`got ${bool}`)      
 * }, [Boolean], ["p"])
 * //             ^^^ you dont need to pass this parameter
 */
declare function registerCommand<PC extends CommandParameters, A extends Array<any>>(name: string, callback: (...args: A) => Result, pChecks: PC, aliases: string[] = []): void