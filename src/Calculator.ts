import { ChildrenCalculator } from "./Calculators/ChildrenCalculator";

/**
 * Gathers all relationship calculating.
 */
export class Calculator {
	public static all(data: any) {
		data = new ChildrenCalculator(data).all();
		return data;
	}
}
