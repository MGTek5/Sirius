import Dexie from "dexie";

export class SiriusDexie extends Dexie {
	positions!: Dexie.Table<IPositions, number>;

	constructor() {
		super("");
		this.version(1).stores({
			positions: `++id, user, latitude, longitude`
		})
	}
}

interface IPositions {
	id?: number;
	user: string;
	latitude: number;
	longitude: number;
}