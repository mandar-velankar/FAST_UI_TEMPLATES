import Object from "sap/ui/base/Object";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericTableComponent.model
 */
export default abstract class BaseObject<T> extends Object {
	private busy = false;
	constructor() {
		super();
		this.busy = false;
	}

	public setBusy(busy: boolean): void {
		this.busy = busy;
	}
	public abstract getJSON(): T;
}