export const dateCombiner = (date: null | string | undefined, time: null | string | undefined): Date | null  => {

    if (!date || !time) {
        return null;
      }

    const dateParts = date?.split("-") ?? "";
    const timeParts = time?.split(":") ?? "";
  
    const day = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[0], 10);
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    const combinedDate = new Date(year, month, day, hours, minutes);

    return combinedDate;
}


