const generateRandomNumber = (minRange: number, maxrange: number) => {
    let randomNumber = Math.floor(Math.random() * maxrange) + minRange;
    return randomNumber;
  };
  export default generateRandomNumber;