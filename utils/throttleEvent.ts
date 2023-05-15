const throttleEvent = (callbackFn: Function, waitTime: number) => {
	let shouldWait = false;

	return (...args: unknown[]) => {
		if (shouldWait) return;

		callbackFn(...args);
		shouldWait = true;

		setTimeout(() => {
			shouldWait = false;
		}, waitTime);
	};
};

export default throttleEvent;
