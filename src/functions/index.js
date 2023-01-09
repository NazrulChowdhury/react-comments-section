export const toShortFormat = (date) => {
    const targetDate = new Date(date)
    const monthNames = ["Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"
    ];
 
    const day = targetDate.getDate();
 
    const monthIndex = targetDate.getMonth();
    const monthName = monthNames[monthIndex];
 
    const year = targetDate.getFullYear();
 
    return `${day}-${monthName}-${year}`;

}

export const getAvatarUrl = (
  appUserID, AppUserImg, commentUserId, commentUserAvatarNum, bucketUrl
  ) => {
  if(appUserID && appUserID === commentUserId){
    const url = AppUserImg ? AppUserImg : `${bucketUrl}/noImage.png`
    return url
  }
  const url = commentUserAvatarNum ? `${bucketUrl}/${commentUserId}.jpeg?${commentUserAvatarNum}`
  : `${bucketUrl}/noImage.png`
  return url
}

export const randomNum = (min, max)=> {
  return Math.floor(Math.random() * (max - min) + min)
}
