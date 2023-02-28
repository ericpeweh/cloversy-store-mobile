// Dependencies
import { DateTime } from "luxon";

const dateDiffCurrentTime = (dateString: string | undefined) => {
	if (!dateString) return 0;

	const compareDate = DateTime.fromFormat(dateString, "yyyy-MM-dd HH:mm:ss");
	const diffInSeconds = compareDate.diffNow().as("seconds");

	return Math.floor(diffInSeconds);
};

export default dateDiffCurrentTime;
