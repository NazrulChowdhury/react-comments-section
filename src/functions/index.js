export const toShortFormat = (date) => {
    // const targetDate = new Date(date)
    // const monthNames = ["Jan", "Feb", "Mar", "Apr",
    //   "May", "Jun", "Jul", "Aug",
    //   "Sep", "Oct", "Nov", "Dec"
    // ];
 
    // const day = targetDate.getDate();
 
    // const monthIndex = targetDate.getMonth();
    // const monthName = monthNames[monthIndex];
 
    // const year = targetDate.getFullYear();
 
    // return `${day}-${monthName}-${year}`;
 

    const monthNames = ["Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"
    ];
 
    const day = date.getDate();
 
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];
 
    const year = date.getFullYear();
 
    return `${day}-${monthName}-${year}`;
}