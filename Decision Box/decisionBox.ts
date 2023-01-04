const TSLEDStatus = {
	ON: true,
	OFF: false,
} as const;

type TSLEDStatus = typeof TSLEDStatus[keyof typeof TSLEDStatus];

const TSLedLit = (
	laserStrengths: number[],
	sensorBias: number
): TSLEDStatus => {
	let totalInput: number = 0;
	for (const laserStrength of laserStrengths) totalInput += laserStrength;
	if (totalInput >= sensorBias) return TSLEDStatus.ON;
	else return TSLEDStatus.OFF;
};

console.log(TSLedLit([7, 8, 2, 1], 18));
