export function formatNumber(num: number|string) {
	// eslint-disable-next-line @typescript-eslint/type-annotation-spacing
	const newnum:number= Number(num);
	if (newnum == 0) {
		return newnum + '';
	} else
	if (newnum > 1 && newnum < 10000) {
		return newnum + '';
	} else {
		return (newnum / 10000) + '万';
	}
}
