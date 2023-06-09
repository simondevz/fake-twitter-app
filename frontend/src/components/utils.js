// Get how long it's been since it was date_posted
export function getTime(post) {
  const time_posted = new Date(`${post.date_posted} ${post.time_posted}`);
  let duration = Date.now() - time_posted;
  console.log(duration);

  const day = 86400000;
  const hour = 3600000;
  const min = 60000;
  const sec = 1000;

  if (duration > day * 10) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const num = time_posted.getMonth();
    console.log(num);
    console.log(time_posted.toString());

    return `${time_posted.getDate()} ${months[num]}`;
  }

  if (duration >= day) {
    return Math.round(duration / day) + "d";
  }

  if (duration >= hour) {
    return Math.round(duration / hour) + "h";
  }

  if (duration >= min) {
    return Math.round(duration / min) + "m";
  }

  if (duration >= sec) {
    return Math.round(duration / sec) + "s";
  }
  return "0s";
}
